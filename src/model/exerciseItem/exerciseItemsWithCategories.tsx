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
        strength: [],
        aerobic: [],
        balance: [],
        agility: [],
        flexibilityMobility: [],
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
        if (exerciseItems[i].categoryJSON.indexOf('strength') !== -1) {
            if (myStates) {
                if (itemInList(myFoodCategories, exerciseItems[i].categoryJSON)) {
                    myCategories.strength.push(exerciseItems[i])
                    foundItem = true;
                }
            } else {
                myCategories.strength.push(exerciseItems[i])
                foundItem = true;
            }
        }
        if (exerciseItems[i].categoryJSON.indexOf('aerobic') !== -1) {
            if (myStates) {
                if (itemInList(myFoodCategories, exerciseItems[i].categoryJSON)) {
                    myCategories.aerobic.push(exerciseItems[i])
                    foundItem = true;
                }
            } else {
                myCategories.aerobic.push(exerciseItems[i])
                foundItem = true;
            }
        }
        if (exerciseItems[i].categoryJSON.indexOf('balance') !== -1) {
            if (myStates) {
                if (itemInList(myFoodCategories, exerciseItems[i].categoryJSON)) {
                    myCategories.balance.push(exerciseItems[i])
                    foundItem = true;
                }
            } else {
                myCategories.balance.push(exerciseItems[i])
                foundItem = true;
            }
        }
        if (exerciseItems[i].categoryJSON.indexOf('agility') !== -1) {
            if (myStates) {
                if (itemInList(myFoodCategories, exerciseItems[i].categoryJSON)) {
                    myCategories.agility.push(exerciseItems[i])
                    foundItem = true;
                }
            } else {
                myCategories.agility.push(exerciseItems[i])
                foundItem = true;
            }

        }
        if (exerciseItems[i].categoryJSON.indexOf('flexibilityMobility') !== -1) {
            if (myStates) {
                if (itemInList(myFoodCategories, exerciseItems[i].categoryJSON)) {
                    myCategories.flexibilityMobility.push(exerciseItems[i])
                    foundItem = true;
                }
            } else {
                myCategories.flexibilityMobility.push(exerciseItems[i])
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