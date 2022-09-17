import React, { useContext } from 'react';
import GymDayCard from './GymDayCard';
import DataAndMethodsContext from '../../../context/dataAndMethods/dataAndMethodsContext';
import CircularIndeterminate from '../../circularIndeterminate/CircularIndeterminate';

const GymDays = () => {
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

export default GymDays;