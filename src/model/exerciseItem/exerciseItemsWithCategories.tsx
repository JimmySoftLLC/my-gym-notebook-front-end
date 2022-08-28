const itemInList = (myFoodCategories: any, myExerciseItemCategories: any) => {
    for (let i = 0; i < myExerciseItemCategories.length; i++) {
        if (myFoodCategories[myExerciseItemCategories[i]]) { return true }
    }
    return false
}

const ExerciseItemsWithCategories = (exerciseItems: any[], myStates: any) => {
    let myFoodCategories: any = {}
    if (myStates) {
        if (myStates.strength) { myFoodCategories['strength'] = true }
        if (myStates.aerobic) { myFoodCategories['aerobic'] = true }
        if (myStates.balance) { myFoodCategories['balance'] = true }
        if (myStates.agility) { myFoodCategories['agility'] = true }
        if (myStates.flexibilityMobility) { myFoodCategories['flexibilityMobility'] = true }
    }

    let myCategories: any = {
        strength: [],
        aerobic: [],
        balance: [],
        agility: [],
        flexibilityMobility: [],
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
        if (!foundItem) {
            myCategories.notCatgorized.push(exerciseItems[i])
        }
    }
    return myCategories
}

export default ExerciseItemsWithCategories;