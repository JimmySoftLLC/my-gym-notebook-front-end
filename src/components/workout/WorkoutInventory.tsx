import React, { useContext } from 'react';
import GymDayCard from './WorkoutCard';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import CircularIndeterminate from '../circularIndeterminate/CircularIndeterminate';

const GymDaysInventory = () => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        gymDays,
        myStates,
        loading,
    } = dataAndMethodsContext;

    if (loading) {
        return <CircularIndeterminate />;
    } else {
        return gymDays.map((GymDay: { id: React.Key | null | undefined; }) => <GymDayCard GymDay={GymDay}
            myStates={myStates}
            key={GymDay.id} />);
    }
};

export default GymDaysInventory;