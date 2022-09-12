import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import DeleteConfirmDialogContext from '../../context/deleteConfirmDialog/deleteConfirmDialogContext';
import dateString from '../../model/dateString';
import getWorkoutsFromIds from '../../model/workout/getWorkoutsFromIds';
import deleteWorkout from '../../model/workout/deleteWorkout';
import putGymMember from '../../model/gymMember/putGymMember';
import sortWorkouts from '../../model/workout/sortWorkouts';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiButton-root': {
            margin: theme.spacing(1),
            marginLeft: 0,
        },
    },
}));

const WorkoutCard: any = ({ Workout }: any) => {
    const classes = useStyles();

    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        gymMember,
        workouts,
        setWorkoutDialogData,
        setWorkoutDialogOpen,
        idToken,
        customId,
        setGymMember,
        myStates,
        setWorkouts,
    } = dataAndMethodsContext;

    const deleteConfirmDialogContext: any = useContext(DeleteConfirmDialogContext);
    const { setDeleteConfirmDialog } = deleteConfirmDialogContext;

    const WorkoutEditClick = (workoutId: any) => {
        for (let i = 0; i < workouts.length; i++) {
            if (workoutId === workouts[i].id) {
                let myEditItem = {
                    id: workouts[i].id,
                    title: workouts[i].title,
                    dateFrom: workouts[i].dateFrom,
                    dateTo: workouts[i].dateTo,
                    description: workouts[i].description,
                    exerciseItemIdsJSON: workouts[i].exerciseItemIdsJSON,
                    dialogType: 'Edit',
                }
                setWorkoutDialogData(myEditItem);
                setWorkoutDialogOpen(true);
                break;
            }
        }
    };

    const WorkoutCopyClick = (workoutId: any) => {
        for (let i = 0; i < workouts.length; i++) {
            if (workoutId === workouts[i].id) {
                let myEditItem = {
                    id: uuidv4(),
                    title: workouts[i].title,
                    dateFrom: workouts[i].dateFrom,
                    dateTo: workouts[i].dateTo,
                    description: workouts[i].description,
                    exerciseItemIdsJSON: workouts[i].exerciseItemIdsJSON,
                    dialogType: "Add",
                }
                setWorkoutDialogData(myEditItem);
                setWorkoutDialogOpen(true);
                break;
            }
        }
    };

    const deleteMenuClick = (workoutId: any) => {
        for (let i = 0; i < workouts.length; i++) {
            if (workoutId === workouts[i].id) {
                setDeleteConfirmDialog(true,
                    workouts[i].title,
                    'deleteWorkout',
                    workoutId,
                    deleteWorkoutById);
                break;
            }
        }
    };

    const deleteWorkoutById = async (workoutId: any) => {
        let myNewGymMember = JSON.parse(JSON.stringify(gymMember))
        myNewGymMember.workoutIdsJSON = myNewGymMember.workoutIdsJSON.filter((e: any) => e !== workoutId)
        await deleteWorkout(workoutId, idToken, customId);
        await putGymMember(myNewGymMember, idToken, customId)
        setGymMember(myNewGymMember);
        let myWorkouts = await getWorkoutsFromIds(myNewGymMember.workoutIdsJSON);
        myWorkouts = await sortWorkouts(myWorkouts, myStates);
        setWorkouts(myWorkouts)
    }

    // format dates for display
    let myDate = dateString(Workout.dateFrom, Workout.dateTo, 'displayFromTo')

    return (
        <div className='card'>
            <h4><i className="fas fa-calendar-day"></i>{' - '}{Workout.title}{' - '}{myDate}
            </h4>
            <div className={classes.root} >
                <Button variant="outlined" color="primary" onClick={() => WorkoutEditClick(Workout.id)}>
                    <i className="fas fa-edit"></i>
                </Button>
                <Button variant="outlined" color="primary" onClick={() => WorkoutCopyClick(Workout.id)}>
                    <i className="fas fa-copy"></i>
                </Button>
                <Button variant="outlined" color="primary" onClick={() => deleteMenuClick(Workout.id)}>
                    <i className="fas fa-trash"></i>
                </Button>
            </div>
        </div>
    );
};

export default WorkoutCard;
