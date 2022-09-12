import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import DeleteConfirmDialogContext from '../../context/deleteConfirmDialog/deleteConfirmDialogContext';
import dateString from '../../model/dateString';
import getGymDaysFromIds from '../../model/gymDay/getGymDays';
import deleteGymDay from '../../model/gymDay/deleteGymDay';
import putGymMember from '../../model/gymMember/putGymMember';
import sortGymDays from '../../model/gymDay/sortGymDays';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiButton-root': {
            margin: theme.spacing(1),
            marginLeft: 0,
        },
    },
}));

const GymDayCard: any = ({ GymDay }: any) => {
    const classes = useStyles();

    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        gymMember,
        gymDays,
        setGymDayDialogData,
        setGymDayDialogOpen,
        idToken,
        customId,
        setGymMember,
        myStates,
        setGymDays,
    } = dataAndMethodsContext;

    const deleteConfirmDialogContext: any = useContext(DeleteConfirmDialogContext);
    const { setDeleteConfirmDialog } = deleteConfirmDialogContext;

    const GymDayEditClick = (gymDayId: any) => {
        for (let i = 0; i < gymDays.length; i++) {
            if (gymDayId === gymDays[i].id) {
                let myEditItem = {
                    id: gymDays[i].id,
                    title: gymDays[i].title,
                    dateFrom: gymDays[i].dateFrom,
                    dateTo: gymDays[i].dateTo,
                    description: gymDays[i].description,
                    workoutIdsJSON: gymDays[i].workoutIdsJSON,
                    dialogType: 'Edit',
                }
                setGymDayDialogData(myEditItem);
                setGymDayDialogOpen(true);
                break;
            }
        }
    };

    const GymDayCopyClick = (gymDayId: any) => {
        for (let i = 0; i < gymDays.length; i++) {
            if (gymDayId === gymDays[i].id) {
                let myEditItem = {
                    id: uuidv4(),
                    title: gymDays[i].title,
                    dateFrom: gymDays[i].dateFrom,
                    dateTo: gymDays[i].dateTo,
                    description: gymDays[i].description,
                    workoutIdsJSON: gymDays[i].workoutIdsJSON,
                    dialogType: "Add",
                }
                setGymDayDialogData(myEditItem);
                setGymDayDialogOpen(true);
                break;
            }
        }
    };

    const deleteMenuClick = (gymDayId: any) => {
        for (let i = 0; i < gymDays.length; i++) {
            if (gymDayId === gymDays[i].id) {
                setDeleteConfirmDialog(true,
                    gymDays[i].title,
                    'deleteGymDay',
                    gymDayId,
                    deleteGymDayById);
                break;
            }
        }
    };

    const deleteGymDayById = async (gymDayId: any) => {
        let myNewGymMember = JSON.parse(JSON.stringify(gymMember))
        myNewGymMember.gymDayIdsJSON = myNewGymMember.gymDayIdsJSON.filter((e: any) => e !== gymDayId)
        await deleteGymDay(gymDayId, idToken, customId);
        await putGymMember(myNewGymMember, idToken, customId)
        setGymMember(myNewGymMember);
        let myGymDays = await getGymDaysFromIds(myNewGymMember.gymDayIdsJSON);
        myGymDays = await sortGymDays(myGymDays, myStates);
        setGymDays(myGymDays)
    }

    // format dates for display
    let myDate = dateString(GymDay.dateFrom, GymDay.dateTo, 'displayFromTo')

    return (
        <div className='card'>
            <h4><i className="fas fa-calendar-day"></i>{' - '}{GymDay.title}{' - '}{myDate}
            </h4>
            <div className={classes.root} >
                <Button variant="outlined" color="primary" onClick={() => GymDayEditClick(GymDay.id)}>
                    <i className="fas fa-edit"></i>
                </Button>
                <Button variant="outlined" color="primary" onClick={() => GymDayCopyClick(GymDay.id)}>
                    <i className="fas fa-copy"></i>
                </Button>
                <Button variant="outlined" color="primary" onClick={() => deleteMenuClick(GymDay.id)}>
                    <i className="fas fa-trash"></i>
                </Button>
            </div>
        </div>
    );
};

export default GymDayCard;
