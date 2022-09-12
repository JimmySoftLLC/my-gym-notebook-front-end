import React, { useContext } from 'react';
import WorkoutCard from './WorkoutCard';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import CircularIndeterminate from '../circularIndeterminate/CircularIndeterminate';

const Workouts = () => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        workouts,
        myStates,
        loading,
    } = dataAndMethodsContext;

    if (loading) {
        return <CircularIndeterminate />;
    } else {
        return workouts.map((Workout: { id: React.Key | null | undefined; }) => <WorkoutCard Workout={Workout}
            myStates={myStates}
            key={Workout.id} />);
    }
};

export default Workouts;