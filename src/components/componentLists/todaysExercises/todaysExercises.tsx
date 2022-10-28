import React, { useContext } from 'react';
import TodaysExercisesCard from './todaysExerciseCard';
import DataAndMethodsContext from '../../../context/dataAndMethods/dataAndMethodsContext';
import deleteExerciseDay from '../../../model/exerciseDay/deleteExerciseDay';
import DeleteConfirmDialogContext from '../../../context/deleteConfirmDialog/deleteConfirmDialogContext';
import dateString from '../../../utilities/dateString';
import { Button } from '@material-ui/core';
import putGymMember from '../../../model/gymMember/putGymMember';
import getExerciseDays from '../../../model/exerciseDay/getExerciseDays';
import getExerciseDaysFromIds from '../../../model/exerciseDay/getExerciseDaysFromIds';

const TodaysExercises = ({ workoutsExercises }: any) => {
  const dataAndMethodsContext = useContext(DataAndMethodsContext);
  const {
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

  const selectedDateDisplayed = dateString(
    selectedDate,
    selectedDate,
    'dateAsId'
  );

  const exerciseDayId = gymMember.id + selectedDateDisplayed;

  const deleteConfirmDialogContext: any = useContext(
    DeleteConfirmDialogContext
  );
  const { setDeleteConfirmDialog } = deleteConfirmDialogContext;

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
      {workoutsExercises.map(
        (Exercise: {
          id: React.Key | null | undefined;
          key: React.Key | null | undefined;
        }) => (
          <TodaysExercisesCard
            workoutsExercises={workoutsExercises}
            Exercise={Exercise}
            isInList={true}
            ExerciseId={Exercise.id}
            key={Exercise.id}
          />
        )
      )}
      <Button
        variant='outlined'
        color='primary'
        onClick={() => loadExerciseDayDeleteDialog()}
      >
        <i className='fas fa-trash'></i>
      </Button>
    </>
  );
};

export default TodaysExercises;
