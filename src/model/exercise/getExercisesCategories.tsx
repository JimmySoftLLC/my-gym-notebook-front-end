const itemInList = (exerciseCategories: any, exerciseItemCategories: any) => {
    for (let i = 0; i < exerciseItemCategories.length; i++) {
        if (exerciseCategories[exerciseItemCategories[i]]) { return true }
    }
    return false
}

const getExercisesCategories = (exercises: any[], myStates: any) => {
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
    for (let i = 0; i < exercises.length; i++) {
        foundItem = false;
        if (exercises[i].categoryJSON.indexOf('strength') !== -1) {
            if (myStates) {
                if (itemInList(exerciseCategories, exercises[i].categoryJSON)) {
                    categories.strength.push(exercises[i])
                    foundItem = true;
                }
            } else {
                categories.strength.push(exercises[i])
                foundItem = true;
            }
        }
        if (exercises[i].categoryJSON.indexOf('aerobic') !== -1) {
            if (myStates) {
                if (itemInList(exerciseCategories, exercises[i].categoryJSON)) {
                    categories.aerobic.push(exercises[i])
                    foundItem = true;
                }
            } else {
                categories.aerobic.push(exercises[i])
                foundItem = true;
            }
        }
        if (exercises[i].categoryJSON.indexOf('balance') !== -1) {
            if (myStates) {
                if (itemInList(exerciseCategories, exercises[i].categoryJSON)) {
                    categories.balance.push(exercises[i])
                    foundItem = true;
                }
            } else {
                categories.balance.push(exercises[i])
                foundItem = true;
            }
        }
        if (exercises[i].categoryJSON.indexOf('agility') !== -1) {
            if (myStates) {
                if (itemInList(exerciseCategories, exercises[i].categoryJSON)) {
                    categories.agility.push(exercises[i])
                    foundItem = true;
                }
            } else {
                categories.agility.push(exercises[i])
                foundItem = true;
            }

        }
        if (exercises[i].categoryJSON.indexOf('flexibilityMobility') !== -1) {
            if (myStates) {
                if (itemInList(exerciseCategories, exercises[i].categoryJSON)) {
                    categories.flexibilityMobility.push(exercises[i])
                    foundItem = true;
                }
            } else {
                categories.flexibilityMobility.push(exercises[i])
                foundItem = true;
            }
        }
        if (!foundItem) {
            categories.notCatgorized.push(exercises[i])
        }
    }
    return categories
}

export default getExercisesCategories;