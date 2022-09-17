import React, { Fragment, useContext, useEffect } from 'react';
import TopNavBar from '../components/TopNavBar';
import DataAndMethodsContext from '../context/dataAndMethods/dataAndMethodsContext';
import ExercisesInventory from '../components/componentLists/exercise/Exercises';
import GymDaysInventory from '../components/componentLists/gymDay/GymDays';
import BotNavBar from '../components/BotNavBar';
import ExerciseDialog from '../components/dialogs/ExerciseDialog';
import GymMemberDialog from '../components/dialogs/GymMemberDialog';
import GymDayDialog from '../components/dialogs/GymDayDialog';
import AlertDialog from '../components/dialogs/AlertDialog';
import HelpDialog from '../components/dialogs/HelpDialog';
import DeleteConfirmDialog from '../components/dialogs/DeleteConfirmDialog';
import SignInRegDialog from '../components/dialogs/SignInRegDialog';
import WorkoutDialog from '../components/dialogs/WorkoutDialog';
import WorkoutInventory from '../components/componentLists/workout/Workouts';
import TodaysWorkouts from '../components/componentLists/todaysWorkouts/TodaysWorkouts'

const Home = () => {
    useEffect(() => {
        async function fetchData() {
            let todaysDate = new Date()
            setTodaysDate(todaysDate);
            setSelectedDate(todaysDate);
        }
        fetchData();
        // eslint-disable-next-line
    }, []);

    const dataAndMethodsContext = useContext(DataAndMethodsContext);
    const { myStates, logInType, setSelectedDate, setTodaysDate }: any = dataAndMethodsContext

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
                {myStates.showWorkoutByDate && <TodaysWorkouts />}
                {myStates.exerciseSettings && <ExercisesInventory />}
                {myStates.workoutSettings && <WorkoutInventory />}
                {myStates.gymDaySettings && <GymDaysInventory />}
                <ExerciseDialog />
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