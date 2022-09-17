import React, { useContext } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import DataAndMethodsContext from '../../../context/dataAndMethods/dataAndMethodsContext';

const WorkoutExerciseCard = ({ Exercise }: any) => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const { workoutDialogData, setWorkoutDialogData
    } = dataAndMethodsContext;

    let ExerciseSelected = false;
    for (let j = 0; j < workoutDialogData.exerciseIdsJSON.length; j++) {
        if (Exercise.id === workoutDialogData.exerciseIdsJSON[j]) {
            ExerciseSelected = true;
            break;
        }
    }

    const changeExerciseSelected = () => {
        let myNewWorkoutDialogData = JSON.parse(JSON.stringify(workoutDialogData))
        let myIndex = myNewWorkoutDialogData.exerciseIdsJSON.indexOf(Exercise.id, 0)
        if (myIndex !== -1) {
            myNewWorkoutDialogData.exerciseIdsJSON.splice(myIndex, 1)
        } else {
            myNewWorkoutDialogData.exerciseIdsJSON.push(Exercise.id)
        }
        setWorkoutDialogData(myNewWorkoutDialogData)
    }

    const items = []
    for (let i = 0; i < Exercise.categoryJSON.length; i++) {
        switch (Exercise.categoryJSON[i]) {
            case 'meat':
                items.push(<i className='icon-tbone' key={Exercise.id + "_meat"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            default:
        }
    }

    return (
        <div className='card'>
            <h4>
                <Checkbox
                    checked={ExerciseSelected}
                    onChange={changeExerciseSelected}
                    name="checked"
                    color="primary"
                />
                {' - '}{items}{Exercise.title}
            </h4>
        </div>
    );
};

export default WorkoutExerciseCard;