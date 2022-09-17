import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
import DataAndMethodsContext from '../../../context/dataAndMethods/dataAndMethodsContext';
import DeleteConfirmDialogContext from '../../../context/deleteConfirmDialog/deleteConfirmDialogContext';
import sortExercises from '../../../model/exercise/sortExercise'
import deleteExercise from '../../../model/exercise/deleteExercise';
import putGymMember from '../../../model/gymMember/putGymMember';
import getExercises from '../../../model/exercise/getExercises';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiButton-root': {
            margin: theme.spacing(1),
            marginLeft: 0,
        },
    },
}));

const ExerciseCard = ({ Exercise }: any) => {
    const classes = useStyles();

    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        exercises,
        setExerciseDialogData,
        setExerciseDialogOpen,
        idToken,
        customId,
        setExercises,
        myStates,
        setGymMember,
        gymMember,
    } = dataAndMethodsContext;

    const deleteConfirmDialogContext: any = useContext(DeleteConfirmDialogContext);
    const { setDeleteConfirmDialog } = deleteConfirmDialogContext;

    const handleClickExerciseEdit = (exerciseId: any) => {
        for (let i = 0; i < exercises.length; i++) {
            if (exerciseId === exercises[i].id) {
                let myEditItem = {
                    title: exercises[i].title,
                    dataJSON: exercises[i].dataJSON,
                    categoryJSON: exercises[i].categoryJSON,
                    id: exercises[i].id,
                    dialogType: 'Edit',
                }
                setExerciseDialogData(myEditItem);
                setExerciseDialogOpen(true);
                break;
            }
        }
    };

    const handleClickExerciseCopy = (exerciseId: any) => {
        for (let i = 0; i < exercises.length; i++) {
            if (exerciseId === exercises[i].id) {
                let myEditItem = {
                    title: exercises[i].title,
                    dataJSON: exercises[i].dataJSON,
                    categoryJSON: exercises[i].categoryJSON,
                    id: uuidv4(),
                    dialogType: "Add",
                }
                setExerciseDialogData(myEditItem);
                setExerciseDialogOpen(true);
                break;
            }
        }
    };

    const loadDeleteExerciseDialog = (exerciseId: any) => {
        for (let i = 0; i < exercises.length; i++) {
            if (exerciseId === exercises[i].id) {
                setDeleteConfirmDialog(true,
                    exercises[i].title,
                    'deleteExercise',
                    exerciseId,
                    deleteExerciseById);
                break;
            }
        }
    };

    const deleteExerciseById = async (exerciseId: any) => {
        let myNewGymMember = JSON.parse(JSON.stringify(gymMember))
        myNewGymMember.exerciseIdsJSON = myNewGymMember.exerciseIdsJSON.filter((e: any) => e !== exerciseId)
        await deleteExercise(exerciseId, idToken, customId);
        await putGymMember(myNewGymMember, idToken, customId)
        setGymMember(myNewGymMember);
        let myExercises = await getExercises(myNewGymMember.exerciseIdsJSON);
        myExercises = await sortExercises(myExercises, myStates);
        setExercises(myExercises)
    }

    return (
        <div className='card'>
            <h4><i className="fas fa-book-open"></i>{' - '}{Exercise.title}
            </h4>
            {myStates['showDescription'] && <p>{Exercise.description}</p>}
            <div className={classes.root} >
                <Button variant="outlined" color="primary" onClick={() => handleClickExerciseEdit(Exercise.id)}>
                    <i className="fas fa-edit"></i>
                </Button>
                <Button variant="outlined" color="primary" onClick={() => handleClickExerciseCopy(Exercise.id)}>
                    <i className="fas fa-copy"></i>
                </Button>
                <Button variant="outlined" color="primary" onClick={() => loadDeleteExerciseDialog(Exercise.id)}>
                    <i className="fas fa-trash"></i>
                </Button>
            </div>
        </div>
    );
};

export default ExerciseCard;