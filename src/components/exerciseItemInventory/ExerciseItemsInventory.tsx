import React, { useContext } from 'react';
import ExerciseItemCardInventory from '../exerciseItemInventory/ExerciseItemCardInventory';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import CircularIndeterminate from '../circularIndeterminate/CircularIndeterminate';
import exerciseItemsWithCategories from '../../model/exerciseItem/exerciseItemsWithCategories';

const ExerciseItemsInventory = () => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        exerciseItems,
        myStates,
        restaurants,
        loading,
    } = dataAndMethodsContext;

    let myCategories: any = exerciseItemsWithCategories(exerciseItems, null)

    if (loading) {
        return <CircularIndeterminate />;
    } else {
        return (
            <div>
                {myCategories.strength.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-dumbbell"></i>{' - '}Strength</h3>}
                {(myCategories.strength.map((ExerciseItem: { id: any; }) => <ExerciseItemCardInventory ExerciseItem={ExerciseItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={ExerciseItem.id}
                />))}
                {myCategories.aerobic.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-running"></i>{' - '}Aerobics</h3>}
                {(myCategories.aerobic.map((ExerciseItem: { id: any; }) => <ExerciseItemCardInventory ExerciseItem={ExerciseItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={ExerciseItem.id}
                />))}
                {myCategories.balance.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-balance-scale"></i>{' - '}Balance</h3>}
                {(myCategories.balance.map((ExerciseItem: { id: any; }) => <ExerciseItemCardInventory ExerciseItem={ExerciseItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={ExerciseItem.id}
                />))}
                {myCategories.agility.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="icon-dancing"></i>{' - '}Agility</h3>}
                {(myCategories.agility.map((ExerciseItem: { id: any; }) => <ExerciseItemCardInventory ExerciseItem={ExerciseItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={ExerciseItem.id}
                />))}
                {myCategories.flexibilityMobility.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-child"></i>{' - '}Flexiblity and Mobility</h3>}
                {(myCategories.flexibilityMobility.map((ExerciseItem: { id: any; }) => <ExerciseItemCardInventory ExerciseItem={ExerciseItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={ExerciseItem.id}
                />))}
                {myCategories.notCatgorized.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>Not categorized</h3>}
                {(myCategories.notCatgorized.map((ExerciseItem: { id: any; }) => <ExerciseItemCardInventory ExerciseItem={ExerciseItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={ExerciseItem.id}
                />))}
            </div>
        );
    }
};

export default ExerciseItemsInventory;

