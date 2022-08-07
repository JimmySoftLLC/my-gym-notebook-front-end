import getExerciseItems from './getExerciseItems';
import validDate from '../validDate';

const getTodaysExerciseItems = async (myGymDays: any, selectedDate: any) => {
    // create an array of all ids
    let ExerciseItemIds = [];
    let myExerciseItems = [];

    for (let j = 0; j < myGymDays.length; j++) {
        if (validDate(myGymDays[j].dateFrom, myGymDays[j].dateTo, selectedDate)) {
            for (let k = 0; k < myGymDays[j].ExerciseItemIdsJSON.length; k++) {
                ExerciseItemIds.push(myGymDays[j].ExerciseItemIdsJSON[k])
            }
        }
    }
    myExerciseItems = await getExerciseItems(ExerciseItemIds)

    return myExerciseItems;
}

export default getTodaysExerciseItems;