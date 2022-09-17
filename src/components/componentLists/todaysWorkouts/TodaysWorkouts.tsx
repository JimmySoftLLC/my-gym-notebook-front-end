import React, { useContext } from 'react';
import TodaysWorkoutCard from './TodaysWorkoutCard';
import DataAndMethodsContext from '../../../context/dataAndMethods/dataAndMethodsContext';
import CircularIndeterminate from '../../circularIndeterminate/CircularIndeterminate';

const TodaysWorkouts = () => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        todaysWorkouts,
        myStates,
        loading,
    } = dataAndMethodsContext;

    if (loading) {
        return <CircularIndeterminate />;
    } else {
        return todaysWorkouts.map((Workout: { id: React.Key | null | undefined; key: React.Key | null | undefined; }) => <TodaysWorkoutCard Workout={Workout}
            myStates={myStates}
            key={Workout.key} />);
    }
};

export default TodaysWorkouts;