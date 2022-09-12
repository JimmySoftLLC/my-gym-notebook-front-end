import React, { useContext } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const GymDayWorkoutCard = ({ ExerciseItem }: any) => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const { gymDayDialogData, setGymDayDialogData
    } = dataAndMethodsContext;

    let ExerciseItemSelected = false;
    for (let j = 0; j < gymDayDialogData.exerciseItemIdsJSON.length; j++) {
        if (ExerciseItem.id === gymDayDialogData.exerciseItemIdsJSON[j]) {
            ExerciseItemSelected = true;
            break;
        }
    }

    const changeExerciseItemSelected = () => {
        let myNewGymDayDialogData = JSON.parse(JSON.stringify(gymDayDialogData))
        let myIndex = myNewGymDayDialogData.exerciseItemIdsJSON.indexOf(ExerciseItem.id, 0)
        if (myIndex !== -1) {
            myNewGymDayDialogData.exerciseItemIdsJSON.splice(myIndex, 1)
        } else {
            myNewGymDayDialogData.exerciseItemIdsJSON.push(ExerciseItem.id)
        }
        setGymDayDialogData(myNewGymDayDialogData)
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

export default GymDayWorkoutCard;