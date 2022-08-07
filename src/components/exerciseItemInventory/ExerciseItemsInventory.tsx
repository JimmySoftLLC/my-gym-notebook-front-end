import React, { useContext } from 'react';
import ExerciseItemCardInventory from '../exerciseItemInventory/ExerciseItemCardInventory';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import CircularIndeterminate from '../circularIndeterminate/CircularIndeterminate';
import ExerciseItemsWithCategories from '../../model/exerciseItem/exerciseItemsWithCategories';

const ExerciseItemsInventory = () => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        exerciseItems,
        myStates,
        restaurants,
        loading,
    } = dataAndMethodsContext;

    let myCategories: any = ExerciseItemsWithCategories(exerciseItems, null)

    if (loading) {
        return <CircularIndeterminate />;
    } else {
        return (
            <div>
                {myCategories.specials.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-tag"></i>{' - '}Specials</h3>}
                {(myCategories.specials.map((ExerciseItem: { id: any; }) => <ExerciseItemCardInventory ExerciseItem={ExerciseItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={ExerciseItem.id}
                />))}
                {myCategories.soup.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="icon-soup"></i>{' - '}Soup</h3>}
                {(myCategories.soup.map((ExerciseItem: { id: any; }) => <ExerciseItemCardInventory ExerciseItem={ExerciseItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={ExerciseItem.id}
                />))}
                {myCategories.salad.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="icon-salad"></i>{' - '}Salad</h3>}
                {(myCategories.salad.map((ExerciseItem: { id: any; }) => <ExerciseItemCardInventory ExerciseItem={ExerciseItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={ExerciseItem.id}
                />))}
                {myCategories.appetizers.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="icon-appetizer"></i>{' - '}Appetizers</h3>}
                {(myCategories.appetizers.map((ExerciseItem: { id: any; }) => <ExerciseItemCardInventory ExerciseItem={ExerciseItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={ExerciseItem.id}
                />))}
                {myCategories.sandwich.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-hamburger"></i>{' - '}Sandwich</h3>}
                {(myCategories.sandwich.map((ExerciseItem: { id: any; }) => <ExerciseItemCardInventory ExerciseItem={ExerciseItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={ExerciseItem.id}
                />))}
                {myCategories.pizza.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-pizza-slice"></i>{' - '}Pizza</h3>}
                {(myCategories.pizza.map((ExerciseItem: { id: any; }) => <ExerciseItemCardInventory ExerciseItem={ExerciseItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={ExerciseItem.id}
                />))}
                {myCategories.pasta.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="icon-spaghetti"></i>{' - '}Pasta</h3>}
                {(myCategories.pasta.map((ExerciseItem: { id: any; }) => <ExerciseItemCardInventory ExerciseItem={ExerciseItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={ExerciseItem.id}
                />))}
                {myCategories.entree.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-concierge-bell"></i>{' - '}Entree</h3>}
                {(myCategories.entree.map((ExerciseItem: { id: any; }) => <ExerciseItemCardInventory ExerciseItem={ExerciseItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={ExerciseItem.id}
                />))}
                {myCategories.dessert.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-birthday-cake"></i>{' - '}Dessert</h3>}
                {(myCategories.dessert.map((ExerciseItem: { id: any; }) => <ExerciseItemCardInventory ExerciseItem={ExerciseItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={ExerciseItem.id}
                />))}
                {myCategories.drinks.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-cocktail"></i>{' - '}Drinks</h3>}
                {(myCategories.drinks.map((ExerciseItem: { id: any; }) => <ExerciseItemCardInventory ExerciseItem={ExerciseItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={ExerciseItem.id}
                />))}
                {myCategories.wine.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-wine-glass"></i>{' - '}Wine</h3>}
                {(myCategories.wine.map((ExerciseItem: { id: any; }) => <ExerciseItemCardInventory ExerciseItem={ExerciseItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={ExerciseItem.id}
                />))}
                {myCategories.beer.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-beer"></i>{' - '}Beer</h3>}
                {(myCategories.beer.map((ExerciseItem: { id: any; }) => <ExerciseItemCardInventory ExerciseItem={ExerciseItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={ExerciseItem.id}
                />))}
                {myCategories.coffee.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-coffee"></i>{' - '}Coffee</h3>}
                {(myCategories.coffee.map((ExerciseItem: { id: any; }) => <ExerciseItemCardInventory ExerciseItem={ExerciseItem}
                    myStates={myStates}
                    restaurants={restaurants}
                    key={ExerciseItem.id}
                />))}
                {myCategories.kids.length > 0 && <h3 style={{ marginTop: "1rem", textAlign: "center" }}>
                    <i className="fas fa-child"></i>{' - '}Kids menu</h3>}
                {(myCategories.kids.map((ExerciseItem: { id: any; }) => <ExerciseItemCardInventory ExerciseItem={ExerciseItem}
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

