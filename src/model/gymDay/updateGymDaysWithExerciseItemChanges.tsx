import putGymDay from './putGymDay';

const updateGymDaysWithExerciseItemChanges = async (myGymDays: any, myExerciseItems: any, myToken: any, myCustomId: any) => {
    for (let i = 0; i < myGymDays.length; i++) {
        let myNewexerciseIdsJSON = [];
        for (let j = 0; j < myGymDays[i].ExerciseItemIdsJSON.length; j++) {
            let myIndex = 1;
            if (myIndex !== -1) {
                myNewexerciseIdsJSON.push(myGymDays[i].ExerciseItemIdsJSON[j])
            }
        }
        if (myNewexerciseIdsJSON.length !== myGymDays[i].ExerciseItemIdsJSON.length) {
            myGymDays[i].ExerciseItemIdsJSON = myNewexerciseIdsJSON;
            await putGymDay(myGymDays[i], myToken, myCustomId);
        }
    }
    return myGymDays
}

export default updateGymDaysWithExerciseItemChanges