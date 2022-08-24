import React, { useContext } from 'react';
import ExerciseItemCardGymDay from '../exerciseItemGymDay/ExerciseItemCardGymDay';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const MemberDataInventory = (GymDayId: any) => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        exerciseItems,
        myStates,
    } = dataAndMethodsContext;

    return exerciseItems.map((ExerciseItem: { id: any; }) => <ExerciseItemCardGymDay ExerciseItem={ExerciseItem}
        myStates={myStates}
        isInList={true}
        GymDayId={GymDayId}
        ExerciseItemId={ExerciseItem.id}
        key={ExerciseItem.id} />);
};

export default MemberDataInventory;