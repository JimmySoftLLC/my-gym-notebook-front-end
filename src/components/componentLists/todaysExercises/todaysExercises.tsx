import React, { useContext } from 'react';
import DataAndMethodsContext from '../../../context/dataAndMethods/dataAndMethodsContext';
import ExerciseCardWorkout from './todaysExerciseCard';

const TodaysExercises = () => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);

    const {
        exercises
    } = dataAndMethodsContext;

    return exercises.map((Exercise: { id: React.Key | null | undefined; key: React.Key | null | undefined; }) => <ExerciseCardWorkout Exercise={Exercise}
        isInList={true}
        ExerciseId={Exercise.id}
        key={Exercise.id} />);
};

export default TodaysExercises;