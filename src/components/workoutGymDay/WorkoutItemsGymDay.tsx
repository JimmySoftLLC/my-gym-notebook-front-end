import React, { useContext } from 'react';
import ExerciseItemCardGymDay from './WorkoutCardGymDay';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const ExerciseItemsGymDay = (GymDayId: any) => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        exerciseItems,
        myStates,
    } = dataAndMethodsContext;

    return exerciseItems.map((ExerciseItem: { id: any; }) => <ExerciseItemCardGymDay ExerciseItem={ExerciseItem}
        myStates={myStates}
        isInList={true}
        GymDayId={GymDayId}
        ExerciseItemId={ExerciseItem.id}
        key={ExerciseItem.id} />);
};

export default ExerciseItemsGymDay;