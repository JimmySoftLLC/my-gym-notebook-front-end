import React, { useContext } from 'react';
import ExerciseCardGymDay from '../gymDayWorkout/GymDayWorkoutCard';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const MemberDataInventory = (GymDayId: any) => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        exercises,
        myStates,
    } = dataAndMethodsContext;

    return exercises.map((Exercise: { id: any; }) => <ExerciseCardGymDay Exercise={Exercise}
        myStates={myStates}
        isInList={true}
        GymDayId={GymDayId}
        ExerciseId={Exercise.id}
        key={Exercise.id} />);
};

export default MemberDataInventory;