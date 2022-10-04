import React, { useContext, useEffect } from 'react';
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
import TodaysWorkouts from '../components/componentLists/todaysWorkouts/TodaysWorkouts';
import Button from '@material-ui/core/Button';
import putGymMember from '../model/gymMember/putGymMember';
import dateString from '../utilities/dateString';
import deleteExerciseDay from '../model/exerciseDay/deleteExerciseDay';
import DeleteConfirmDialogContext from '../context/deleteConfirmDialog/deleteConfirmDialogContext';
import getExerciseDaysFromIds from '../model/exerciseDay/getExerciseDaysFromIds';
import getExerciseDays from '../model/exerciseDay/getExerciseDays';

const Home = () => {
  useEffect(() => {
    async function fetchData() {
      let todaysDate = new Date();
      setTodaysDate(todaysDate);
      setSelectedDate(todaysDate);
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  const dataAndMethodsContext = useContext(DataAndMethodsContext);
  const {
    myStates,
    logInType,
    setSelectedDate,
    setTodaysDate,
    gymMember,
    setGymMember,
    idToken,
    customId,
    selectedDate,
    gymDays,
    workouts,
    setExerciseDay,
    getTodaysWorkouts,
    exercises,
    setExercisesPrevious,
  }: any = dataAndMethodsContext;

  const deleteConfirmDialogContext: any = useContext(
    DeleteConfirmDialogContext
  );
  const { setDeleteConfirmDialog } = deleteConfirmDialogContext;

  const selectedDateDisplayed = dateString(
    selectedDate,
    selectedDate,
    'dateAsId'
  );

  const exerciseDayId = gymMember.id + selectedDateDisplayed;

  const loadExerciseDayDeleteDialog = () => {
    setDeleteConfirmDialog(
      true,
      'exercise day ' + selectedDateDisplayed,
      'deleteExerciseDay',
      exerciseDayId,
      deleteExerciseDayById
    );
  };

  const deleteExerciseDayById = async (exerciseDayId: any) => {
    let myNewGymMember = JSON.parse(JSON.stringify(gymMember));
    delete myNewGymMember.exerciseDaysJSON[selectedDateDisplayed];
    await deleteExerciseDay(exerciseDayId, idToken, customId);
    await putGymMember(myNewGymMember, idToken, customId);
    setGymMember(myNewGymMember);
    getTodaysWorkouts(gymDays, selectedDate, workouts);
    await getExerciseDays(
      myNewGymMember,
      getExerciseDaysFromIds,
      setExerciseDay,
      selectedDate,
      exercises,
      setExercisesPrevious,
      gymDays,
      workouts
    );
  };

  return (
    <>
      <AlertDialog />
      <DeleteConfirmDialog />
      <SignInRegDialog />
      <TopNavBar />
      {logInType === 'default' && (
        <div className='container '>
          {myStates.info && <p className='p home-page-top-margin-normal'></p>}
          <HelpDialog />
          <p className='p home-page-bottom-margin'></p>
        </div>
      )}
      {logInType === 'signedIn' && (
        <div className='container gym-member-page-top-margin'>
          {myStates.showWorkoutByDate && (
            <>
              <TodaysWorkouts />
              <Button
                variant='outlined'
                color='primary'
                onClick={() => loadExerciseDayDeleteDialog()}
              >
                <i className='fas fa-trash'></i>
              </Button>
            </>
          )}
          {myStates.exerciseSettings && <ExercisesInventory />}
          {myStates.workoutSettings && <WorkoutInventory />}
          {myStates.gymDaySettings && <GymDaysInventory />}
          <ExerciseDialog />
          <GymMemberDialog />
          <GymDayDialog />
          <WorkoutDialog />
          <p className='p gym-member-page-bottom-margin'></p>
        </div>
      )}
      <BotNavBar />
    </>
  );
};

export default Home;
