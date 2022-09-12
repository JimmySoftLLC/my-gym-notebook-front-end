import React, { useContext } from 'react';
import ExerciseCard from './ExerciseCard';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import CircularIndeterminate from '../circularIndeterminate/CircularIndeterminate';
import getExercisesCategories from '../../model/exercise/getExercisesCategories';

const Exercises = () => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        exerciseItems,
        myStates,
        loading,
    } = dataAndMethodsContext;

    let myCategories: any = getExercisesCategories(exerciseItems, null)

    if (loading) {
        return <CircularIndeterminate />;
    } else {
        return (
            <div>
                {myCategories.strength.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-dumbbell"></i>{' - '}Strength</h3>}
                {(myCategories.strength.map((Exercise: { id: any; }) => <ExerciseCard Exercise={Exercise}
                    myStates={myStates}
                    key={Exercise.id}
                />))}
                {myCategories.aerobic.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-running"></i>{' - '}Aerobics</h3>}
                {(myCategories.aerobic.map((Exercise: { id: any; }) => <ExerciseCard Exercise={Exercise}
                    myStates={myStates}
                    key={Exercise.id}
                />))}
                {myCategories.balance.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-balance-scale"></i>{' - '}Balance</h3>}
                {(myCategories.balance.map((Exercise: { id: any; }) => <ExerciseCard Exercise={Exercise}
                    myStates={myStates}
                    key={Exercise.id}
                />))}
                {myCategories.agility.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="icon-dancing"></i>{' - '}Agility</h3>}
                {(myCategories.agility.map((Exercise: { id: any; }) => <ExerciseCard Exercise={Exercise}
                    myStates={myStates}
                    key={Exercise.id}
                />))}
                {myCategories.flexibilityMobility.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-child"></i>{' - '}Flexiblity and Mobility</h3>}
                {(myCategories.flexibilityMobility.map((Exercise: { id: any; }) => <ExerciseCard Exercise={Exercise}
                    myStates={myStates}
                    key={Exercise.id}
                />))}
                {myCategories.notCatgorized.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>Not categorized</h3>}
                {(myCategories.notCatgorized.map((Exercise: { id: any; }) => <ExerciseCard Exercise={Exercise}
                    myStates={myStates}
                    key={Exercise.id}
                />))}
            </div>
        );
    }
};

export default Exercises;

