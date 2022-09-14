import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import putWorkout from '../../model/workout/putWorkout';
import getWorkouts from '../../model/workout/getWorkoutsFromIds';
import Grid from '@material-ui/core/Grid';
import sortWorkouts from '../../model/workout/sortWorkouts';
import 'date-fns';
import ExercisesWorkout from '../workoutExercise/WorkoutExercises';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import putGymMember from '../../model/gymMember/putGymMember';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            marginLeft: 0,
        },
    },
}));

const WorkoutDialog: any = () => {
    const classes = useStyles();
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        id,
        title,
        exerciseIdsJSON,
        dialogType,
    } = dataAndMethodsContext.workoutDialogData;

    const { workoutDialogData } = dataAndMethodsContext;

    const {
        workoutDialogOpen,
        setWorkoutDialogOpen,
        setWorkoutDialogDataItem,
        idToken,
        customId,
        setWorkouts,
        setWorkoutDialogData,
        setGymMember,
        gymMember
    } = dataAndMethodsContext;

    const handleClose = () => {
        setWorkoutDialogOpen(false);
    };

    const handleSave = () => {
        switch (dialogType) {
            case "Edit":
                saveWorkout()
                break;
            case "Add":
                saveWorkoutAdd()
                break;
            default:
        }
        setWorkoutDialogOpen(false);
    };

    const saveWorkout = async () => {
        let newWorkout: any = {}
        newWorkout.id = id;
        newWorkout.title = title
        newWorkout.exerciseIdsJSON = exerciseIdsJSON
        await putWorkout(newWorkout, idToken, customId);
        let myWorkouts = await getWorkouts(gymMember.workoutIdsJSON);
        myWorkouts = await sortWorkouts(myWorkouts, 'sortDate');
        setWorkouts(myWorkouts)
    };

    const saveWorkoutAdd = async () => {
        let newWorkout: any = {}
        newWorkout.id = id;
        newWorkout.title = title
        newWorkout.exerciseIdsJSON = exerciseIdsJSON;
        await putWorkout(newWorkout, idToken, customId);
        let myNewGymMember = JSON.parse(JSON.stringify(gymMember))
        myNewGymMember.workoutIdsJSON.push(id);
        await putGymMember(myNewGymMember, idToken, customId)
        setGymMember(myNewGymMember);
        let myWorkouts = await getWorkouts(myNewGymMember.workoutIdsJSON);
        myWorkouts = await sortWorkouts(myWorkouts, 'sortDate');
        setWorkouts(myWorkouts)
    };

    const selectAllExercises = () => {
        let newWorkoutDialogData = JSON.parse(JSON.stringify(workoutDialogData))
        newWorkoutDialogData.exerciseIdsJSON = JSON.parse(JSON.stringify({}))
        setWorkoutDialogData(newWorkoutDialogData)
    }

    const unSelectAllExercises = () => {
        let newWorkoutDialogData = JSON.parse(JSON.stringify(workoutDialogData))
        newWorkoutDialogData.exerciseIdsJSON = []
        setWorkoutDialogData(newWorkoutDialogData)
    }

    const changeTitle = (e: any) => {
        setWorkoutDialogDataItem('title', e.target.value)
    };

    return (
        <div>
            <Grid container justifyContent="space-around">
                <Dialog className={classes.root} open={workoutDialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">
                        {dialogType + " workout"}</DialogTitle>
                    <DialogContent>
                        <TextField
                            id="title"
                            label="Title"
                            type="text"
                            fullWidth
                            variant="filled"
                            size="small"
                            value={title}
                            onChange={changeTitle}
                        />
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Exercises</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid item xs={12}>
                                    <ExercisesWorkout />
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                        <DialogActions>
                            <Button onClick={() => selectAllExercises()} color="default">Select All</Button>
                            <Button onClick={() => unSelectAllExercises()} color="default">Unselect All</Button>
                        </DialogActions>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="default">Cancel</Button>
                        <Button onClick={() => handleSave()} color="primary">Save</Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        </div>
    );
}

export default WorkoutDialog;

