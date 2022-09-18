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

  return (
    <div className='card'>
      <h4>{Workout.title}</h4>
      <div className={classes.root}>
        <TodaysExercises exercises={exercises} />
      </div>
    </div>
  );
};

export default TodaysWorkoutCard;
