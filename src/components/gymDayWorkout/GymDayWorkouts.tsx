import React, { useContext } from 'react';
import WorkoutCardGymDay from './GymDayWorkoutCard';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const GymDayWorkouts = (GymDayId: any) => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        exercises,
        myStates,
    } = dataAndMethodsContext;

    return exercises.map((Exercise: { id: any; }) => <WorkoutCardGymDay Exercise={Exercise}
        myStates={myStates}
        isInList={true}
        GymDayId={GymDayId}
        ExerciseId={Exercise.id}
        key={Exercise.id} />);
};

export default GymDayWorkouts;