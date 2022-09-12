import React, { useContext } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const ExerciseItemCardWorkout = ({ ExerciseItem }: any) => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const { workoutDialogData, setWorkoutDialogData
    } = dataAndMethodsContext;

    let ExerciseItemSelected = false;
    for (let j = 0; j < workoutDialogData.exerciseItemIdsJSON.length; j++) {
        if (ExerciseItem.id === workoutDialogData.exerciseItemIdsJSON[j]) {
            ExerciseItemSelected = true;
            break;
        }
    }

    const changeExerciseItemSelected = () => {
        let myNewWorkoutDialogData = JSON.parse(JSON.stringify(workoutDialogData))
        let myIndex = myNewWorkoutDialogData.exerciseItemIdsJSON.indexOf(ExerciseItem.id, 0)
        if (myIndex !== -1) {
            myNewWorkoutDialogData.exerciseItemIdsJSON.splice(myIndex, 1)
        } else {
            myNewWorkoutDialogData.exerciseItemIdsJSON.push(ExerciseItem.id)
        }
        setWorkoutDialogData(myNewWorkoutDialogData)
    }

    const items = []
    for (let i = 0; i < ExerciseItem.categoryJSON.length; i++) {
        switch (ExerciseItem.categoryJSON[i]) {
            case 'meat':
                items.push(<i className='icon-tbone' key={ExerciseItem.id + "_meat"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            default:
        }
    }

    return (
        <div className='card'>
            <h4>
                <Checkbox
                    checked={ExerciseItemSelected}
                    onChange={changeExerciseItemSelected}
                    name="checked"
                    color="primary"
                />
                {' - '}{items}{ExerciseItem.title}
            </h4>
        </div>
    );
};

export default ExerciseItemCardWorkout;