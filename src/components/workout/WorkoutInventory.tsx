import React, { useContext } from 'react';
import WorkoutCard from './WorkoutCard';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import CircularIndeterminate from '../circularIndeterminate/CircularIndeterminate';

const WorkoutsInventory = () => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        workouts,
        myStates,
        loading,
    } = dataAndMethodsContext;

    if (loading) {
        return <CircularIndeterminate />;
    } else {
        return workouts.map((GymDay: { id: React.Key | null | undefined; }) => <WorkoutCard GymDay={GymDay}
            myStates={myStates}
            key={GymDay.id} />);
    }
};

export default WorkoutsInventory;