import React, { useContext } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import DataAndMethodsContext from '../../../context/dataAndMethods/dataAndMethodsContext';

const GymDayWorkoutCard = ({ Workout }: any) => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const { gymDayDialogData, setGymDayDialogData
    } = dataAndMethodsContext;

    let WorkoutSelected = false;
    for (let j = 0; j < gymDayDialogData.workoutIdsJSON.length; j++) {
        if (Workout.id === gymDayDialogData.workoutIdsJSON[j]) {
            WorkoutSelected = true;
            break;
        }
    }

    const changeWorkoutSelected = () => {
        let myNewGymDayDialogData = JSON.parse(JSON.stringify(gymDayDialogData))
        let myIndex = myNewGymDayDialogData.workoutIdsJSON.indexOf(Workout.id, 0)
        if (myIndex !== -1) {
            myNewGymDayDialogData.workoutIdsJSON.splice(myIndex, 1)
        } else {
            myNewGymDayDialogData.workoutIdsJSON.push(Workout.id)
        }
        setGymDayDialogData(myNewGymDayDialogData)
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
                {' - '}{Workout.title}
            </h4>
        </div>
    );
};

export default GymDayWorkoutCard;