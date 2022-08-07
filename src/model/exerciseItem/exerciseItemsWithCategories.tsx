const itemInList = (myFoodCategories: any, myExerciseItemCategories: any) => {
    for (let i = 0; i < myExerciseItemCategories.length; i++) {
        if (myFoodCategories[myExerciseItemCategories[i]]) { return true }
    }
    return false
}

const ExerciseItemsWithCategories = (exerciseItems: any[], myStates: any) => {
    let myFoodCategories: any = {}
    if (myStates) {
        if (myStates.meat) { myFoodCategories['meat'] = true }
        if (myStates.pork) { myFoodCategories['pork'] = true }
        if (myStates.poultry) { myFoodCategories['poultry'] = true }
        if (myStates.fish) { myFoodCategories['fish'] = true }
        if (myStates.shellfish) { myFoodCategories['shellfish'] = true }
        if (myStates.vegetarian) { myFoodCategories['vegetarian'] = true }
        if (myStates.cheese) { myFoodCategories['cheese'] = true }
        if (myStates.carryout) { myFoodCategories['carryout'] = true }
    }

    let myCategories: any = {
        specials: [],
        soup: [],
        salad: [],
        appetizers: [],
        sandwich: [],
        pizza: [],
        pasta: [],
        entree: [],
        dessert: [],
        drinks: [],
        wine: [],
        beer: [],
        coffee: [],
        kids: [],
        notCatgorized: [],
    }
    let foundItem = false
    for (let i = 0; i < exerciseItems.length; i++) {
        foundItem = false;
        if (exerciseItems[i].categoryJSON.indexOf('specials') !== -1) {
            if (myStates) {
                if (itemInList(myFoodCategories, exerciseItems[i].categoryJSON)) {
                    myCategories.specials.push(exerciseItems[i])
                    foundItem = true;
                }
            } else {
                myCategories.specials.push(exerciseItems[i])
                foundItem = true;
            }
        }
        if (exerciseItems[i].categoryJSON.indexOf('soup') !== -1) {
            if (myStates) {
                if (itemInList(myFoodCategories, exerciseItems[i].categoryJSON)) {
                    myCategories.soup.push(exerciseItems[i])
                    foundItem = true;
                }
            } else {
                myCategories.soup.push(exerciseItems[i])
                foundItem = true;
            }
        }
        if (exerciseItems[i].categoryJSON.indexOf('salad') !== -1) {
            if (myStates) {
                if (itemInList(myFoodCategories, exerciseItems[i].categoryJSON)) {
                    myCategories.salad.push(exerciseItems[i])
                    foundItem = true;
                }
            } else {
                myCategories.salad.push(exerciseItems[i])
                foundItem = true;
            }
        }
        if (exerciseItems[i].categoryJSON.indexOf('appetizers') !== -1) {
            if (myStates) {
                if (itemInList(myFoodCategories, exerciseItems[i].categoryJSON)) {
                    myCategories.appetizers.push(exerciseItems[i])
                    foundItem = true;
                }
            } else {
                myCategories.appetizers.push(exerciseItems[i])
                foundItem = true;
            }

        }
        if (exerciseItems[i].categoryJSON.indexOf('sandwich') !== -1) {
            if (myStates) {
                if (itemInList(myFoodCategories, exerciseItems[i].categoryJSON)) {
                    myCategories.sandwich.push(exerciseItems[i])
                    foundItem = true;
                }
            } else {
                myCategories.sandwich.push(exerciseItems[i])
                foundItem = true;
            }
        }
        if (exerciseItems[i].categoryJSON.indexOf('pizza') !== -1) {
            if (myStates) {
                if (itemInList(myFoodCategories, exerciseItems[i].categoryJSON)) {
                    myCategories.pizza.push(exerciseItems[i])
                    foundItem = true;
                }
            } else {
                myCategories.pizza.push(exerciseItems[i])
                foundItem = true;
            }
        }
        if (exerciseItems[i].categoryJSON.indexOf('pasta') !== -1) {
            if (myStates) {
                if (itemInList(myFoodCategories, exerciseItems[i].categoryJSON)) {
                    myCategories.pasta.push(exerciseItems[i])
                    foundItem = true;
                }
            } else {
                myCategories.pasta.push(exerciseItems[i])
                foundItem = true;
            }
        }
        if (exerciseItems[i].categoryJSON.indexOf('entree') !== -1) {
            if (myStates) {
                if (itemInList(myFoodCategories, exerciseItems[i].categoryJSON)) {
                    myCategories.entree.push(exerciseItems[i])
                    foundItem = true;
                }
            } else {
                myCategories.entree.push(exerciseItems[i])
                foundItem = true;
            }
        }
        if (exerciseItems[i].categoryJSON.indexOf('dessert') !== -1) {
            myCategories.dessert.push(exerciseItems[i])
            foundItem = true;
        }
        if (exerciseItems[i].categoryJSON.indexOf('drinks') !== -1) {
            myCategories.drinks.push(exerciseItems[i])
            foundItem = true;
        }
        if (exerciseItems[i].categoryJSON.indexOf('wine') !== -1) {
            myCategories.wine.push(exerciseItems[i])
            foundItem = true;
        }
        if (exerciseItems[i].categoryJSON.indexOf('beer') !== -1) {
            myCategories.beer.push(exerciseItems[i])
            foundItem = true;
        }
        if (exerciseItems[i].categoryJSON.indexOf('coffee') !== -1) {
            myCategories.coffee.push(exerciseItems[i])
            foundItem = true;
        }
        if (exerciseItems[i].categoryJSON.indexOf('kids') !== -1) {
            if (myStates) {
                if (itemInList(myFoodCategories, exerciseItems[i].categoryJSON)) {
                    myCategories.kids.push(exerciseItems[i])
                    foundItem = true;
                }
            } else {
                myCategories.kids.push(exerciseItems[i])
                foundItem = true;
            }
        }
        if (!foundItem) {
            myCategories.notCatgorized.push(exerciseItems[i])
        }
    }
    return myCategories
}

export default ExerciseItemsWithCategories;