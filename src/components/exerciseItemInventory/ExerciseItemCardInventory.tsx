import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import DeleteConfirmDialogContext from '../../context/deleteConfirmDialog/deleteConfirmDialogContext';
import sortExerciseItems from '../../model/exerciseItem/sortExerciseItems'
import updateGymDaysWithExerciseItemChanges from '../../model/gymDay/updateGymDaysWithExerciseItemChanges';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiButton-root': {
            margin: theme.spacing(1),
            marginLeft: 0,
        },
    },
}));

const ExerciseItemCardInventory = ({ ExerciseItem }: any) => {
    const classes = useStyles();

    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        exerciseItems,
        setExercisetemDialogData,
        setExerciseItemDialogOpen,
        idToken,
        customId,
        setExerciseItems,
        myStates,
        setRestaurantGymDays,
        restaurantGymDays,
    } = dataAndMethodsContext;

    const deleteConfirmDialogContext: any = useContext(DeleteConfirmDialogContext);
    const { setDeleteConfirmDialog } = deleteConfirmDialogContext;

    const handleClickExerciseItemEdit = (exerciseId: any) => {
        for (let i = 0; i < exerciseItems.length; i++) {
            if (exerciseId === exerciseItems[i].id) {
                let myEditItem = {
                    title: exerciseItems[i].title,
                    description: exerciseItems[i].description,
                    categoryJSON: exerciseItems[i].categoryJSON,
                    id: exerciseItems[i].id,
                    dialogType: 'Edit',
                }
                setExercisetemDialogData(myEditItem);
                setExerciseItemDialogOpen(true);
                break;
            }
        }
    };

    const handleClickExerciseItemCopy = (exerciseId: any) => {
        for (let i = 0; i < exerciseItems.length; i++) {
            if (exerciseId === exerciseItems[i].id) {
                let myEditItem = {
                    title: exerciseItems[i].title,
                    description: exerciseItems[i].description,
                    categoryJSON: exerciseItems[i].categoryJSON,
                    id: uuidv4(),
                    dialogType: "Add",
                }
                setExercisetemDialogData(myEditItem);
                setExerciseItemDialogOpen(true);
                break;
            }
        }
    };

    const loadDeleteExerciseItemDialog = (exerciseId: any) => {
        for (let i = 0; i < exerciseItems.length; i++) {
            if (exerciseId === exerciseItems[i].id) {
                setDeleteConfirmDialog(true,
                    exerciseItems[i].title,
                    'deleteExerciseItem',
                    exerciseId,
                    deleteExerciseItemById);
                break;
            }
        }
    };

    const deleteExerciseItemById = async (exerciseId: any) => {
        let myNewExerciseItems = {}
        myNewExerciseItems = await sortExerciseItems(myNewExerciseItems, myStates);
        let myNewGymDays = await updateGymDaysWithExerciseItemChanges(restaurantGymDays, myNewExerciseItems, idToken, customId)
        setExerciseItems(myNewExerciseItems)
        setRestaurantGymDays(myNewGymDays)
    }

    return (
        <div className='card'>
            <h4><i className="fas fa-book-open"></i>{' - '}{ExerciseItem.title}
            </h4>
            {myStates['showDescription'] && <p>{ExerciseItem.description}</p>}
            <div className={classes.root} >
                <Button variant="outlined" color="primary" onClick={() => handleClickExerciseItemEdit(ExerciseItem.id)}>
                    <i className="fas fa-edit"></i>
                </Button>
                <Button variant="outlined" color="primary" onClick={() => handleClickExerciseItemCopy(ExerciseItem.id)}>
                    <i className="fas fa-copy"></i>
                </Button>
                <Button variant="outlined" color="primary" onClick={() => loadDeleteExerciseItemDialog(ExerciseItem.id)}>
                    <i className="fas fa-trash"></i>
                </Button>
            </div>
        </div>
    );
};

export default ExerciseItemCardInventory;