import React, { useContext } from 'react';
import ExerciseItemCardWorkout from './ExerciseItemCardWorkout';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const ExerciseItemsWorkout = (WorkoutId: any) => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        exerciseItems,
        myStates,
    } = dataAndMethodsContext;

    return exerciseItems.map((ExerciseItem: { id: any; }) => <ExerciseItemCardWorkout ExerciseItem={ExerciseItem}
        myStates={myStates}
        isInList={true}
        WorkoutId={WorkoutId}
        ExerciseItemId={ExerciseItem.id}
        key={ExerciseItem.id} />);
};

export default ExerciseItemsWorkout;