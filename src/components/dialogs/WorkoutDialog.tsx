import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import putWorkout from '../../model/workoutItem/putWorkout';
import getWorkouts from '../../model/workoutItem/getWorkouts';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import sortWorkouts from '../../model/workoutItem/sortWorkouts';
import 'date-fns';
import ExerciseItemsWorkout from '../exerciseItemWorkout/ExerciseItemsWorkout';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
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
        dateFrom,
        dateTo,
        description,
        exerciseItemIdsJSON,
        dialogType,
    } = dataAndMethodsContext.gymDayDialogData;

    const { gymDayDialogData } = dataAndMethodsContext;

    const {
        gymDayDialogOpen,
        setWorkoutDialogOpen,
        setWorkoutDialogDataItem,
        idToken,
        customId,
        setWorkoutItems,
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
        newWorkout.dateFrom = dateFrom;
        newWorkout.dateTo = dateTo;
        newWorkout.description = description
        newWorkout.exerciseItemIdsJSON = exerciseItemIdsJSON
        await putWorkout(newWorkout, idToken, customId);
        let myWorkouts = await getWorkouts(gymMember.gymDayIdsJSON);
        myWorkouts = await sortWorkouts(myWorkouts, 'sortDate');
        setWorkoutItems(myWorkouts)
    };

    const saveWorkoutAdd = async () => {
        let newWorkout: any = {}
        newWorkout.id = id;
        newWorkout.title = title
        newWorkout.dateFrom = dateFrom;
        newWorkout.dateTo = dateTo;
        newWorkout.description = description
        newWorkout.exerciseItemIdsJSON = exerciseItemIdsJSON;
        await putWorkout(newWorkout, idToken, customId);
        let myNewGymMember = JSON.parse(JSON.stringify(gymMember))
        myNewGymMember.gymDayIdsJSON.push(id);
        await putGymMember(myNewGymMember, idToken, customId)
        setGymMember(myNewGymMember);
        let myWorkouts = await getWorkouts(myNewGymMember.gymDayIdsJSON);
        myWorkouts = await sortWorkouts(myWorkouts, 'sortDate');
        setWorkoutItems(myWorkouts)
    };

    const selectAllExerciseItems = () => {
        let newWorkoutDialogData = JSON.parse(JSON.stringify(gymDayDialogData))
        newWorkoutDialogData.exerciseItemIdsJSON = JSON.parse(JSON.stringify({}))
        setWorkoutDialogData(newWorkoutDialogData)
    }

    const unSelectAllExerciseItems = () => {
        let newWorkoutDialogData = JSON.parse(JSON.stringify(gymDayDialogData))
        newWorkoutDialogData.exerciseItemIdsJSON = []
        setWorkoutDialogData(newWorkoutDialogData)
    }

    const changeTitle = (e: any) => {
        setWorkoutDialogDataItem('title', e.target.value)
    };

    const changeDateFrom = (dateValue: any) => {
        const newDateTo = new Date(dateTo)
        let newWorkoutDialogData = JSON.parse(JSON.stringify(gymDayDialogData))
        if (dateValue.getTime() > newDateTo.getTime()) {
            newWorkoutDialogData['dateFrom'] = dateValue;
            newWorkoutDialogData['dateTo'] = dateValue;
        } else {
            newWorkoutDialogData['dateFrom'] = dateValue;
        }
        setWorkoutDialogData(newWorkoutDialogData);
    };

    const changeDateTo = (dateValue: any) => {
        const newDateFrom = new Date(dateFrom)
        let newWorkoutDialogData = JSON.parse(JSON.stringify(gymDayDialogData))
        if (dateValue.getDate() < newDateFrom.getTime()) {
            newWorkoutDialogData['dateTo'] = newDateFrom;
        } else {
            newWorkoutDialogData['dateTo'] = dateValue;
        }
        setWorkoutDialogData(newWorkoutDialogData);
    };

    const changeDescription = (e: any) => {
        setWorkoutDialogDataItem('description', e.target.value)
    };

    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <Dialog className={classes.root} open={gymDayDialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">
                            {dialogType + " gym day"}</DialogTitle>
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
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-from"
                                label="From"
                                format="MM/dd/yyyy"
                                value={dateFrom}
                                // variant="filled"
                                onChange={changeDateFrom}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-to"
                                label="To"
                                format="MM/dd/yyyy"
                                value={dateTo}
                                // variant="filled"
                                onChange={changeDateTo}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <TextField
                                id="description"
                                label="Description"
                                type="text"
                                fullWidth
                                variant="filled"
                                size="small"
                                value={description}
                                onChange={changeDescription}
                            />
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Menu Items</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid item xs={12}>
                                        <ExerciseItemsWorkout />
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                            <DialogActions>
                                <Button onClick={() => selectAllExerciseItems()} color="default">Select All</Button>
                                <Button onClick={() => unSelectAllExerciseItems()} color="default">Unselect All</Button>
                            </DialogActions>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="default">Cancel</Button>
                            <Button onClick={() => handleSave()} color="primary">Save</Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </MuiPickersUtilsProvider>
        </div>
    );
}

export default WorkoutDialog;

