import React, { useContext } from 'react';
import GymDayWorkoutCard from './GymDayWorkoutCard';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const GymDayWorkouts = () => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        workouts,
        myStates,
    } = dataAndMethodsContext;

    return workouts.map((Workout: { id: any; }) => <GymDayWorkoutCard Workout={Workout}
        myStates={myStates}
        isInList={true}
        WorkoutId={Workout.id}
        key={Workout.id} />);
};

export default GymDayWorkouts;