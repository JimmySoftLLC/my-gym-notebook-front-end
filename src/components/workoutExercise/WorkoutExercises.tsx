import React, { useContext } from 'react';
import ExerciseCardWorkout from './WorkoutExerciseCard';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const ExercisesWorkout = (WorkoutId: any) => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        exercises,
        myStates,
    } = dataAndMethodsContext;

    return exercises.map((Exercise: { id: any; }) => <ExerciseCardWorkout Exercise={Exercise}
        myStates={myStates}
        isInList={true}
        WorkoutId={WorkoutId}
        ExerciseId={Exercise.id}
        key={Exercise.id} />);
};

export default ExercisesWorkout;