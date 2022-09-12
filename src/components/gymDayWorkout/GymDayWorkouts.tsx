import React, { useContext } from 'react';
import WorkoutCardGymDay from './GymDayWorkoutCard';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const GymDayWorkouts = (GymDayId: any) => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        exerciseItems,
        myStates,
    } = dataAndMethodsContext;

    return exerciseItems.map((ExerciseItem: { id: any; }) => <WorkoutCardGymDay ExerciseItem={ExerciseItem}
        myStates={myStates}
        isInList={true}
        GymDayId={GymDayId}
        ExerciseItemId={ExerciseItem.id}
        key={ExerciseItem.id} />);
};

export default GymDayWorkouts;