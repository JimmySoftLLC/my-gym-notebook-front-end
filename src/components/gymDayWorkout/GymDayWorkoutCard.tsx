import React, { useContext } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const GymDayWorkoutCard = ({ Workout }: any) => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const { gymDayDialogData, setGymDayDialogData
    } = dataAndMethodsContext;

    let WorkoutSelected = false;
    for (let j = 0; j < gymDayDialogData.exerciseItemIdsJSON.length; j++) {
        if (Workout.id === gymDayDialogData.exerciseItemIdsJSON[j]) {
            WorkoutSelected = true;
            break;
        }
    }

    const changeWorkoutSelected = () => {
        let myNewGymDayDialogData = JSON.parse(JSON.stringify(gymDayDialogData))
        let myIndex = myNewGymDayDialogData.exerciseItemIdsJSON.indexOf(Workout.id, 0)
        if (myIndex !== -1) {
            myNewGymDayDialogData.exerciseItemIdsJSON.splice(myIndex, 1)
        } else {
            myNewGymDayDialogData.exerciseItemIdsJSON.push(Workout.id)
        }
        setGymDayDialogData(myNewGymDayDialogData)
    }

    const items = []
    for (let i = 0; i < Workout.categoryJSON.length; i++) {
        switch (Workout.categoryJSON[i]) {
            case 'meat':
                items.push(<i className='icon-tbone' key={Workout.id + "_meat"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            default:
        }
    }

    return (
        <div className='card'>
            <h4>
                <Checkbox
                    checked={WorkoutSelected}
                    onChange={changeWorkoutSelected}
                    name="checked"
                    color="primary"
                />
                {' - '}{items}{Workout.title}
            </h4>
        </div>
    );
};

export default GymDayWorkoutCard;