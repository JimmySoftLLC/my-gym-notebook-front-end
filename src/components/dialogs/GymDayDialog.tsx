import React, { Key, useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import putGymDay from '../../model/gymDay/putGymDay';
import getGymDays from '../../model/gymDay/getGymDays';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import sortGymDays from '../../model/gymDay/sortGymDays';
import 'date-fns';
import WorkoutsGymDay from '../gymDayWorkout/GymDayWorkouts';
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
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import activateDays from '../../utilities/activateDays'
import getDays from '../../utilities/getDays';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            marginLeft: 0,
        },
    },
}));

const GymDayDialog: any = () => {
    const classes = useStyles();
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        id,
        title,
        dateFrom,
        dateTo,
        workoutIdsJSON,
        dayJSON,
        days,
        dialogType,
    } = dataAndMethodsContext.gymDayDialogData;

    const { gymDayDialogData } = dataAndMethodsContext;

    const {
        gymDayDialogOpen,
        setGymDayDialogOpen,
        setGymDayDialogDataItem,
        idToken,
        customId,
        setGymDays,
        setGymDayDialogData,
        setGymMember,
        gymMember
    } = dataAndMethodsContext;

    const handleClose = () => {
        setGymDayDialogOpen(false);
    };

    const handleSave = () => {
        switch (dialogType) {
            case "Edit":
                saveGymDay()
                break;
            case "Add":
                saveGymDayAdd()
                break;
            default:
        }
        setGymDayDialogOpen(false);
    };

    const saveGymDay = async () => {
        let newGymDay: any = {}
        newGymDay.id = id;
        newGymDay.title = title
        newGymDay.dateFrom = dateFrom;
        newGymDay.dateTo = dateTo;
        newGymDay.workoutIdsJSON = workoutIdsJSON;
        newGymDay.dayJSON = dayJSON;
        await putGymDay(newGymDay, idToken, customId);
        let myGymDays = await getGymDays(gymMember.gymDayIdsJSON);
        myGymDays = await sortGymDays(myGymDays, 'sortDate');
        setGymDays(myGymDays)
    };

    const saveGymDayAdd = async () => {
        let newGymDay: any = {}
        newGymDay.id = id;
        newGymDay.title = title
        newGymDay.dateFrom = dateFrom;
        newGymDay.dateTo = dateTo;
        newGymDay.workoutIdsJSON = workoutIdsJSON;
        newGymDay.dayJSON = dayJSON;
        await putGymDay(newGymDay, idToken, customId);
        let myNewGymMember = JSON.parse(JSON.stringify(gymMember))
        myNewGymMember.gymDayIdsJSON.push(id);
        await putGymMember(myNewGymMember, idToken, customId)
        setGymMember(myNewGymMember);
        let myGymDays = await getGymDays(myNewGymMember.gymDayIdsJSON);
        myGymDays = await sortGymDays(myGymDays, 'sortDate');
        setGymDays(myGymDays)
    };

    const selectAllExercises = () => {
        let newGymDayDialogData = JSON.parse(JSON.stringify(gymDayDialogData))
        newGymDayDialogData.workoutIdsJSON = JSON.parse(JSON.stringify({}))
        setGymDayDialogData(newGymDayDialogData)
    }

    const unSelectAllExercises = () => {
        let newGymDayDialogData = JSON.parse(JSON.stringify(gymDayDialogData))
        newGymDayDialogData.workoutIdsJSON = []
        setGymDayDialogData(newGymDayDialogData)
    }

    const changeTitle = (e: any) => {
        setGymDayDialogDataItem('title', e.target.value)
    };

    const changeDateFrom = async (dateValue: any) => {
        const newDateFrom = new Date(dateValue)
        const newDateTo = new Date(dateTo)
        let newGymDayDialogData = JSON.parse(JSON.stringify(gymDayDialogData))
        if (newDateFrom.getTime() > newDateTo.getTime()) {
            newGymDayDialogData['dateFrom'] = newDateFrom;
            newGymDayDialogData['dateTo'] = newDateFrom;
            const newDays = getDays(newDateFrom, newDateFrom);
            newGymDayDialogData['dayJSON'] = newDays;
            const activeDays = activateDays(newDays);
            newGymDayDialogData['days'] = activeDays;
        } else {
            newGymDayDialogData['dateFrom'] = newDateFrom;
            const newDays = getDays(newDateFrom, newDateTo);
            newGymDayDialogData['dayJSON'] = newDays;
            const activeDays = activateDays(newDays);
            newGymDayDialogData['days'] = activeDays;
        }
        setGymDayDialogData(newGymDayDialogData);
    };

    const changeDateTo = async (dateValue: any) => {
        const newDateFrom = new Date(dateFrom)
        const newDateTo = new Date(dateValue)
        let newGymDayDialogData = JSON.parse(JSON.stringify(gymDayDialogData))
        if (newDateTo.getTime() < newDateFrom.getTime()) {
            newGymDayDialogData['dateFrom'] = newDateTo;
            newGymDayDialogData['dateTo'] = newDateTo;
            const newDays = getDays(newDateTo, newDateTo);
            newGymDayDialogData['dayJSON'] = newDays;
            const activeDays = activateDays(newDays);
            newGymDayDialogData['days'] = activeDays;
        } else {
            newGymDayDialogData['dateTo'] = newDateTo;
            const newDays = getDays(newDateFrom, newDateTo);
            newGymDayDialogData['dayJSON'] = newDays;
            const activeDays = activateDays(newDays);
            newGymDayDialogData['days'] = activeDays;
        }
        setGymDayDialogData(newGymDayDialogData);
    };

    const handleDaysChange = (days: any) => {
        let newGymDayDialogData = JSON.parse(JSON.stringify(gymDayDialogData))
        newGymDayDialogData['dayJSON'] = days;
        setGymDayDialogData(newGymDayDialogData);
    }

    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justifyContent="space-around">
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
                            <ToggleButtonGroup
                                className="my-1"
                                size="small"
                                arial-label="Days of the week"
                                value={dayJSON}
                                onChange={(event: any, value: React.SetStateAction<never[]>) => handleDaysChange(value)}
                            >
                                {days.map((day: {
                                    ariaLabel: string;
                                    key: Key | null | undefined;
                                    disabled: boolean,
                                }, index: number) => (
                                    <ToggleButton key={day.key} value={index} aria-label={day.ariaLabel} color="secondary" disabled={day.disabled}>
                                        {day.ariaLabel}
                                    </ToggleButton>
                                ))}
                            </ToggleButtonGroup>
                            <Accordion className="my-1">
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>Workouts</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid item xs={12}>
                                        <WorkoutsGymDay />
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
            </MuiPickersUtilsProvider>
        </div>
    );
}

export default GymDayDialog;


