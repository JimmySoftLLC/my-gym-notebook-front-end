// const turnOffAllMyStates = (myStates, key) => {
//     for (key in myStates) {
//         if (key !== 'dollar_1' && key !== 'dollar_2' && key !== 'dollar_3') {
//             myStates[key] = false;
//         }
//     }
//     return myStates;
// }

const setMyStatesLogic = (myStates: any, key: any) => {

    if (myStates.helpDialogActive) {
        switch (myStates.helpDialogStage) {
            case 1:
                if (key === "exercises") {
                    myStates.helpDialogOpen = true;
                    myStates.helpDialogStage = 2;
                }
                if (key === "gymMembers") {
                    myStates.helpDialogOpen = true;
                    myStates.helpDialogStage = 6;
                }
                if (key === "photoGallery") {
                    myStates.helpDialogOpen = true;
                    myStates.helpDialogStage = 8;
                }
                if (key === "info") {
                    myStates.helpDialogOpen = true;
                    myStates.helpDialogStage = 9;
                }
                break;
            case 2:
                if (key === "strength" ||
                    key === "aerobic" ||
                    key === "balance" ||
                    key === "agility" ||
                    key === "flexibilityMobility"
                ) {
                    myStates.helpDialogOpen = true;
                    myStates.helpDialogStage = 3;
                }
                break;
            case 3:
                if (key === "meat" ||
                    key === "pork" ||
                    key === "poultry" ||
                    key === "fish" ||
                    key === "shellfish" ||
                    key === "vegetarian" ||
                    key === "cheese" ||
                    key === "carryout"
                ) {
                    myStates.helpDialogOpen = true;
                    myStates.helpDialogStage = 4;
                }
                break;
            case 4:
                if (key === "dollar_1" ||
                    key === "dollar_2" ||
                    key === "dollar_3"
                ) {
                    myStates.helpDialogOpen = true;
                    myStates.helpDialogStage = 5;
                }
                break;
            case 5:
                if (key === "date_0" ||
                    key === "date_1" ||
                    key === "date_2" ||
                    key === "date_3" ||
                    key === "date_4" ||
                    key === "date_5" ||
                    key === "date_6"
                ) {
                    myStates.helpDialogOpen = true;
                    myStates.helpDialogStage = 6;
                }
                break;
            default:
                break;
        }
    }

    // if myKey = any of the login items, set login items to false and set key
    if (key === 'exerciseSettings' || key === 'workoutSettings' || key === 'gymDaySettings' || key === 'exercise') {
        myStates['exerciseSettings'] = false;
        myStates['workoutSettings'] = false;
        myStates['gymDaySettings'] = false;
        myStates['exercise'] = false;
        myStates[key] = true;
        return myStates;
    }

    // if myKey = any of the login items, set login items to false and set key
    if (key === 'exercises' || key === 'gymMembers' || key === 'info' || key === 'gymDaysDetail' || key === 'photoGallery') {
        myStates['exercises'] = false;
        myStates['gymMembers'] = false;
        myStates['info'] = false;
        myStates['gymDaysDetail'] = false;
        myStates['photoGallery'] = false;
        if (key !== 'gymDaysDetail') {
            myStates['lastState'] = key;
        }
        myStates[key] = true;
        return myStates;
    }

    // if myKey = any of the sort items, set sort items to false and set key
    if (key === 'sortTitle' || key === 'sortPrice') {
        myStates['sortTitle'] = false;
        myStates['sortPrice'] = false;
        myStates[key] = true;
        return myStates;
    }

    // if myKey = any of the date items, set date items to false and set key
    if (key === 'date_0' || key === 'date_1' || key === 'date_2' || key === 'date_3' || key === 'date_4' || key === 'date_5' || key === 'date_6') {
        myStates['date_0'] = false;
        myStates['date_1'] = false;
        myStates['date_2'] = false;
        myStates['date_3'] = false;
        myStates['date_4'] = false;
        myStates['date_5'] = false;
        myStates['date_6'] = false;
        myStates[key] = true;
        return myStates;
    }

    myStates[key] ? myStates[key] = false : myStates[key] = true;

    return myStates;
}

export default setMyStatesLogic

