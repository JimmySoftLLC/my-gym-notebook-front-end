import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import putGymDay from '../../model/gymDay/putGymDay';
import getGymDays from '../../model/gymDay/getGymDaysFromIds';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import sortGymDays from '../../model/gymDay/sortGymDays';
import 'date-fns';
import ExerciseItemsGymDay from '../exerciseItemGymDay/ExerciseItemsGymDay';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
        description,
        ExerciseItemIdsJSON,
        entertainmentItemIdsJSON,
        gymMembersJSON,
        dialogType,
    } = dataAndMethodsContext.gymDayDialogData;

    const { gymDayDialogData } = dataAndMethodsContext;

    const {
        gymDayDialogOpen,
        setGymDayDialogOpen,
        setGymDayDialogDataItem,
        idToken,
        customId,
        setRestaurantGymDays,
        restaurantId,
        setGymDayDialogData,
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
        let myNewGymDay: any = {}
        myNewGymDay.id = id;
        myNewGymDay.title = title
        myNewGymDay.dateFrom = dateFrom;
        myNewGymDay.dateTo = dateTo;
        myNewGymDay.description = description
        myNewGymDay.ExerciseItemIdsJSON = ExerciseItemIdsJSON
        myNewGymDay.entertainmentItemIdsJSON = entertainmentItemIdsJSON
        myNewGymDay.gymMembersJSON = gymMembersJSON;
        myNewGymDay.restaurantId = restaurantId;
        //console.log(gymDaysTableName, idToken, myNewGymDay, customId);
        await putGymDay(myNewGymDay, idToken, customId);
        let myGymDays = await getGymDays({});
        myGymDays = await sortGymDays(myGymDays, 'sortDate');
        setRestaurantGymDays(myGymDays)
    };

    const saveGymDayAdd = async () => {
        let myNewGymDay: any = {}
        myNewGymDay.id = id;
        myNewGymDay.title = title
        myNewGymDay.dateFrom = dateFrom;
        myNewGymDay.dateTo = dateTo;
        myNewGymDay.description = description
        myNewGymDay.ExerciseItemIdsJSON = ExerciseItemIdsJSON;
        myNewGymDay.entertainmentItemIdsJSON = entertainmentItemIdsJSON;
        myNewGymDay.gymMembersJSON = gymMembersJSON;
        myNewGymDay.restaurantId = restaurantId;
        // console.log(myNewGymDay, idToken, customId);
        await putGymDay(myNewGymDay, idToken, customId);
        let myGymDays = await getGymDays({});
        myGymDays = await sortGymDays(myGymDays, 'sortDate');
        setRestaurantGymDays(myGymDays)
    };

    const selectAllExerciseItems = () => {
        let myNewGymDayDialogData = JSON.parse(JSON.stringify(gymDayDialogData))
        myNewGymDayDialogData.ExerciseItemIdsJSON = JSON.parse(JSON.stringify({}))
        setGymDayDialogData(myNewGymDayDialogData)
    }

    const unSelectAllExerciseItems = () => {
        let myNewGymDayDialogData = JSON.parse(JSON.stringify(gymDayDialogData))
        myNewGymDayDialogData.ExerciseItemIdsJSON = []
        setGymDayDialogData(myNewGymDayDialogData)
    }

    const changeTitle = (e: any) => {
        setGymDayDialogDataItem('title', e.target.value)
    };

    const changeDateFrom = (myDate: any) => {
        // const myDateTo = new Date(dateTo)
        let myGymDayDialogData = JSON.parse(JSON.stringify(gymDayDialogData))
        // if (myDate.getTime() > myDateTo.getTime()) {
        //     myGymDayDialogData['dateFrom'] = myDate;
        //     myGymDayDialogData['dateTo'] = myDate;
        // } else {
        myGymDayDialogData['dateFrom'] = myDate;
        // }
        setGymDayDialogData(myGymDayDialogData);
    };

    const changeDateTo = (myDate: any) => {
        // const myDateFrom = new Date(dateFrom)
        let myGymDayDialogData = JSON.parse(JSON.stringify(gymDayDialogData))
        // if (myDate.getDate() < myDateFrom.getTime()) {
        //     myGymDayDialogData['dateTo'] = myDateFrom;
        // } else {
        myGymDayDialogData['dateTo'] = myDate;
        // }
        setGymDayDialogData(myGymDayDialogData);
    };

    const changeDescription = (e: any) => {
        setGymDayDialogDataItem('description', e.target.value)
    };

    return (
        <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <Dialog className={classes.root} open={gymDayDialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">
                            {dialogType + " menu day"}</DialogTitle>
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
                                        <ExerciseItemsGymDay />
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

export default GymDayDialog;

