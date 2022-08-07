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
        restaurantGymDays,
        setGymDayDialogData,
        setGymDayDialogOpen,
    } = dataAndMethodsContext;

    const deleteConfirmDialogContext: any = useContext(DeleteConfirmDialogContext);
    const { setDeleteConfirmDialog } = deleteConfirmDialogContext;

    const GymDayEditClick = (GymDayId: any) => {
        for (let i = 0; i < restaurantGymDays.length; i++) {
            if (GymDayId === restaurantGymDays[i].id) {
                let myEditItem = {
                    id: restaurantGymDays[i].id,
                    title: restaurantGymDays[i].title,
                    dateFrom: restaurantGymDays[i].dateFrom,
                    dateTo: restaurantGymDays[i].dateTo,
                    description: restaurantGymDays[i].description,
                    ExerciseItemIdsJSON: restaurantGymDays[i].ExerciseItemIdsJSON,
                    entertainmentItemIdsJSON: restaurantGymDays[i].entertainmentItemIdsJSON,
                    associatesJSON: restaurantGymDays[i].associatesJSON,
                    dialogType: 'Edit',
                }
                setGymDayDialogData(myEditItem);
                setGymDayDialogOpen(true);
                break;
            }
        }
    };

    const GymDayCopyClick = (GymDayId: any) => {
        for (let i = 0; i < restaurantGymDays.length; i++) {
            if (GymDayId === restaurantGymDays[i].id) {
                let myEditItem = {
                    id: uuidv4(),
                    title: restaurantGymDays[i].title,
                    dateFrom: restaurantGymDays[i].dateFrom,
                    dateTo: restaurantGymDays[i].dateTo,
                    description: restaurantGymDays[i].description,
                    ExerciseItemIdsJSON: restaurantGymDays[i].ExerciseItemIdsJSON,
                    entertainmentItemIdsJSON: restaurantGymDays[i].entertainmentItemIdsJSON,
                    associatesJSON: restaurantGymDays[i].associatesJSON,
                    dialogType: "Add",
                }
                setGymDayDialogData(myEditItem);
                setGymDayDialogOpen(true);
                break;
            }
        }
    };

    const deleteMenuClick = (GymDayId: any) => {
        for (let i = 0; i < restaurantGymDays.length; i++) {
            if (GymDayId === restaurantGymDays[i].id) {
                setDeleteConfirmDialog(true,
                    restaurantGymDays[i].title,
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
