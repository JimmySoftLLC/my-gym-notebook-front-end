import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import DeleteConfirmDialogContext from '../../context/deleteConfirmDialog/deleteConfirmDialogContext';
import dateString from '../../model/dateString';

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
        gymMembersGymDays,
        setGymDayDialogData,
        setGymDayDialogOpen,
    } = dataAndMethodsContext;

    const deleteConfirmDialogContext: any = useContext(DeleteConfirmDialogContext);
    const { setDeleteConfirmDialog } = deleteConfirmDialogContext;

    const GymDayEditClick = (GymDayId: any) => {
        for (let i = 0; i < gymMembersGymDays.length; i++) {
            if (GymDayId === gymMembersGymDays[i].id) {
                let myEditItem = {
                    id: gymMembersGymDays[i].id,
                    title: gymMembersGymDays[i].title,
                    dateFrom: gymMembersGymDays[i].dateFrom,
                    dateTo: gymMembersGymDays[i].dateTo,
                    description: gymMembersGymDays[i].description,
                    exerciseItemIdsJSON: gymMembersGymDays[i].exerciseItemIdsJSON,
                    entertainmentItemIdsJSON: gymMembersGymDays[i].entertainmentItemIdsJSON,
                    gymMembersJSON: gymMembersGymDays[i].gymMembersJSON,
                    dialogType: 'Edit',
                }
                setGymDayDialogData(myEditItem);
                setGymDayDialogOpen(true);
                break;
            }
        }
    };

    const GymDayCopyClick = (GymDayId: any) => {
        for (let i = 0; i < gymMembersGymDays.length; i++) {
            if (GymDayId === gymMembersGymDays[i].id) {
                let myEditItem = {
                    id: uuidv4(),
                    title: gymMembersGymDays[i].title,
                    dateFrom: gymMembersGymDays[i].dateFrom,
                    dateTo: gymMembersGymDays[i].dateTo,
                    description: gymMembersGymDays[i].description,
                    exerciseItemIdsJSON: gymMembersGymDays[i].exerciseItemIdsJSON,
                    entertainmentItemIdsJSON: gymMembersGymDays[i].entertainmentItemIdsJSON,
                    gymMembersJSON: gymMembersGymDays[i].gymMembersJSON,
                    dialogType: "Add",
                }
                setGymDayDialogData(myEditItem);
                setGymDayDialogOpen(true);
                break;
            }
        }
    };

    const deleteMenuClick = (GymDayId: any) => {
        for (let i = 0; i < gymMembersGymDays.length; i++) {
            if (GymDayId === gymMembersGymDays[i].id) {
                setDeleteConfirmDialog(true,
                    gymMembersGymDays[i].title,
                    'deleteGymDay',
                    GymDayId,
                    deleteGymDayById);
                break;
            }
        }
    };

    const deleteGymDayById = async (GymDayId: any) => {

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
