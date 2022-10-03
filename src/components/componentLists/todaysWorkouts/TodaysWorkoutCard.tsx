import React, { useContext } from 'react';
import DataAndMethodsContext from '../../../context/dataAndMethods/dataAndMethodsContext';
import { makeStyles } from '@material-ui/core/styles';
import TodaysExercises from '../todaysExercises/todaysExercises';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiButton-root': {
      margin: theme.spacing(1),
      marginLeft: 0,
    },
  },
}));

const TodaysWorkoutCard: any = ({ Workout }: any) => {
  const classes = useStyles();

  const dataAndMethodsContext: any = useContext(DataAndMethodsContext);

  const { exercises } = dataAndMethodsContext;

  const exercisesFromWorkout = () => {
    const exercisesToReturn = [];
    for (let i = 0; i < Workout.exerciseIdsJSON.length; i++) {
      for (let j = 0; j < exercises.length; j++) {
        if (Workout.exerciseIdsJSON[i] === exercises[j].id) {
          exercisesToReturn.push(exercises[j]);
        }
      }
    }
    return exercisesToReturn;
  };

  const workoutsExercises = exercisesFromWorkout();

  return (
    <div className='card'>
      <h4>{Workout.title}</h4>
      <div className={classes.root}>
        <TodaysExercises workoutsExercises={workoutsExercises} />
      </div>
    </div>
  );
};

export default TodaysWorkoutCard;
