import React, { useContext } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const GymDayWorkoutCard = ({ Exercise }: any) => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const { gymDayDialogData, setGymDayDialogData
    } = dataAndMethodsContext;

    let ExerciseSelected = false;
    for (let j = 0; j < gymDayDialogData.exerciseItemIdsJSON.length; j++) {
        if (Exercise.id === gymDayDialogData.exerciseItemIdsJSON[j]) {
            ExerciseSelected = true;
            break;
        }
    }

    const changeExerciseSelected = () => {
        let myNewGymDayDialogData = JSON.parse(JSON.stringify(gymDayDialogData))
        let myIndex = myNewGymDayDialogData.exerciseItemIdsJSON.indexOf(Exercise.id, 0)
        if (myIndex !== -1) {
            myNewGymDayDialogData.exerciseItemIdsJSON.splice(myIndex, 1)
        } else {
            myNewGymDayDialogData.exerciseItemIdsJSON.push(Exercise.id)
        }
        setGymDayDialogData(myNewGymDayDialogData)
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

export default GymDayWorkoutCard;