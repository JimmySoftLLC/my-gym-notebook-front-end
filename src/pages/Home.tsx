import React, { Fragment, useContext, useEffect } from 'react';
import TopNavBar from '../components/TopNavBar';
import DataAndMethodsContext from '../context/dataAndMethods/dataAndMethodsContext';
import ExerciseItemsInventory from '../components/exerciseItem/ExerciseItemsInventory';
import GymDaysInventory from '../components/gymDay/GymDaysInventory';
import BotNavBar from '../components/BotNavBar';
import ExerciseItemDialog from '../components/dialogs/ExerciseItemDialog';
import GymMemberDialog from '../components/dialogs/GymMemberDialog';
import GymDayDialog from '../components/dialogs/GymDayDialog';
import AlertDialog from '../components/dialogs/AlertDialog';
import HelpDialog from '../components/dialogs/HelpDialog';
import DeleteConfirmDialog from '../components/dialogs/DeleteConfirmDialog';
import SignInRegDialog from '../components/dialogs/SignInRegDialog';
import WorkoutDialog from '../components/dialogs/WorkoutDialog';
import WorkoutInventory from '../components/workout/WorkoutInventory';

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
    const { getDataByDate, myStates, logInType, setSelectedDate, setTodaysDate }: any = dataAndMethodsContext

    return (
        <Fragment>
            <AlertDialog />
            <DeleteConfirmDialog />
            <SignInRegDialog />
            <TopNavBar />
            {logInType === 'default' && <div className='container '>
                {myStates.info && <p className='p home-page-top-margin-normal'></p>}
                <HelpDialog />
                <p className='p home-page-bottom-margin'></p>
            </div>}
            {logInType === 'signedIn' && <div className='container gym-member-page-top-margin'>
                {myStates.exerciseSettings && <ExerciseItemsInventory />}
                {myStates.workoutSettings && <WorkoutInventory />}
                {myStates.gymDaySettings && <GymDaysInventory />}
                <ExerciseItemDialog />
                <GymMemberDialog />
                <GymDayDialog />
                <WorkoutDialog />
                <p className='p gym-member-page-bottom-margin'></p>
            </div>}
            <BotNavBar />
        </Fragment>
    );
};

export default Home;