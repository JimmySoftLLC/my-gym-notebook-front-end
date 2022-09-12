import React, { useContext } from 'react';
import WorkoutCardGymDay from './GymDayWorkoutCard';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const GymDayWorkouts = (GymDayId: any) => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        workouts,
        myStates,
    } = dataAndMethodsContext;

    return workouts.map((Workout: { id: any; }) => <WorkoutCardGymDay Workout={Workout}
        myStates={myStates}
        isInList={true}
        WorkoutId={Workout.id}
        key={Workout.id} />);
};

export default GymDayWorkouts;