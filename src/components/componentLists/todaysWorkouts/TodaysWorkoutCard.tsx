import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TodaysExercises from '../todaysExercises/todaysExercises';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiButton-root': {
            margin: theme.spacing(1),
            marginLeft: 0,
        },
    },
}));

const TodaysWorkoutCard: any = ({ Workout }: any) => {
    const classes = useStyles();

    return (
        <div className='card'>
            <h4>{Workout.title}
            </h4>
            <div className={classes.root} >
                <TodaysExercises />
            </div>
        </div>
    );
};

export default TodaysWorkoutCard;
