const itemInList = (exerciseCategories: any, exerciseItemCategories: any) => {
    for (let i = 0; i < exerciseItemCategories.length; i++) {
        if (exerciseCategories[exerciseItemCategories[i]]) { return true }
    }
    return false
}

const getExercisesCategories = (exerciseItems: any[], myStates: any) => {
    let exerciseCategories: any = {}
    if (myStates) {
        if (myStates.strength) { exerciseCategories['strength'] = true }
        if (myStates.aerobic) { exerciseCategories['aerobic'] = true }
        if (myStates.balance) { exerciseCategories['balance'] = true }
        if (myStates.agility) { exerciseCategories['agility'] = true }
        if (myStates.flexibilityMobility) { exerciseCategories['flexibilityMobility'] = true }
    }
    let categories: any = {
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
                if (itemInList(exerciseCategories, exerciseItems[i].categoryJSON)) {
                    categories.strength.push(exerciseItems[i])
                    foundItem = true;
                }
            } else {
                categories.strength.push(exerciseItems[i])
                foundItem = true;
            }
        }
        if (exerciseItems[i].categoryJSON.indexOf('aerobic') !== -1) {
            if (myStates) {
                if (itemInList(exerciseCategories, exerciseItems[i].categoryJSON)) {
                    categories.aerobic.push(exerciseItems[i])
                    foundItem = true;
                }
            } else {
                categories.aerobic.push(exerciseItems[i])
                foundItem = true;
            }
        }
        if (exerciseItems[i].categoryJSON.indexOf('balance') !== -1) {
            if (myStates) {
                if (itemInList(exerciseCategories, exerciseItems[i].categoryJSON)) {
                    categories.balance.push(exerciseItems[i])
                    foundItem = true;
                }
            } else {
                categories.balance.push(exerciseItems[i])
                foundItem = true;
            }
        }
        if (exerciseItems[i].categoryJSON.indexOf('agility') !== -1) {
            if (myStates) {
                if (itemInList(exerciseCategories, exerciseItems[i].categoryJSON)) {
                    categories.agility.push(exerciseItems[i])
                    foundItem = true;
                }
            } else {
                categories.agility.push(exerciseItems[i])
                foundItem = true;
            }

        }
        if (exerciseItems[i].categoryJSON.indexOf('flexibilityMobility') !== -1) {
            if (myStates) {
                if (itemInList(exerciseCategories, exerciseItems[i].categoryJSON)) {
                    categories.flexibilityMobility.push(exerciseItems[i])
                    foundItem = true;
                }
            } else {
                categories.flexibilityMobility.push(exerciseItems[i])
                foundItem = true;
            }
        }
        if (!foundItem) {
            categories.notCatgorized.push(exerciseItems[i])
        }
    }
    return categories
}

export default getExercisesCategories;