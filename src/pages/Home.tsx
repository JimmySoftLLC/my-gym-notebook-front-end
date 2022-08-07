import React, { Fragment, useContext, useEffect } from 'react';
import TopNavBar from '../components/TopNavBar';
import DataAndMethodsContext from '../context/dataAndMethods/dataAndMethodsContext';
import About from '../pages/about';
import ExerciseItemsInventory from '../components/exerciseItemInventory/ExerciseItemsInventory';
import GymDays from '../components/gymDay/GymDays';
import BotNavBar from '../components/BotNavBar';
import ExerciseItemDialog from '../components/dialogs/ExerciseItemDialog';
import GymMemberDialog from '../components/dialogs/GymMemberDialog';
import GymDayDialog from '../components/dialogs/GymDayDialog';
import AlertDialog from '../components/dialogs/AlertDialog';
import HelpDialog from '../components/dialogs/HelpDialog';
import DeleteConfirmDialog from '../components/dialogs/DeleteConfirmDialog';
import SignInRegDialog from '../components/dialogs/SignInRegDialog';

const Home = () => {
    useEffect(() => {
        async function fetchData() {
            let todaysDate = new Date()
            setTodaysDate(todaysDate);
            setSelectedDate(todaysDate);
            getDataByDate(todaysDate)
        }
        fetchData();
        // eslint-disable-next-line
    }, []);

    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const { getDataByDate, myStates, logInType, setSelectedDate, selectedDate, setTodaysDate }: any = dataAndMethodsContext

    let myDate = ""
    if (selectedDate) {
        myDate = selectedDate.toString().substring(0, 10)
    }

    return (
        <Fragment>
            <AlertDialog />
            <DeleteConfirmDialog />
            <SignInRegDialog />
            <TopNavBar />
            {logInType === 'default' && <div className='container '>
                {myStates.ExerciseItems && <p className='p home-page-top-margin'></p>}
                {myStates.entertainmentItems && <p className='p home-page-top-margin-normal'></p>}
                {myStates.restaurants && <p className='p home-page-top-margin-normal'></p>}
                {myStates.restaurantDetail && <p className='p home-page-top-margin-normal'></p>}
                {myStates.gymMembers && <p className='p home-page-top-margin-normal'></p>}
                {myStates.info && <p className='p home-page-top-margin-normal'></p>}
                {myStates.photoGallery && <p className='p home-page-top-margin-normal'></p>}
                {myStates.info && <About />}
                {myStates.ExerciseItems && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>{myDate}{" - Menu Items"}</h3>}
                {myStates.entertainmentItems && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>{myDate}{" - Entertainment"}</h3>}
                <HelpDialog />
                <p className='p home-page-bottom-margin'></p>
            </div>}
            {logInType === 'signedIn' && <div className='container gym-member-page-top-margin'>
                {myStates.exerciseSettings && <ExerciseItemsInventory />}
                {myStates.gymDaySettings && <GymDays />}
                <ExerciseItemDialog />
                <GymMemberDialog />
                <GymDayDialog />
                <p className='p gym-member-page-bottom-margin'></p>
            </div>}
            <BotNavBar />
        </Fragment>
    );
};

export default Home;
