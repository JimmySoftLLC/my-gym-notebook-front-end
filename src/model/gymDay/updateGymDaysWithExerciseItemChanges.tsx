import putGymDay from './putGymDay';

const updateGymDaysWithExerciseItemChanges = async (myGymDays: any, myExerciseItems: any, myToken: any, myCustomId: any) => {
    for (let i = 0; i < myGymDays.length; i++) {
        let myNewexerciseIdsJSON = [];
        for (let j = 0; j < myGymDays[i].exerciseItemIdsJSON.length; j++) {
            let myIndex = 1;
            if (myIndex !== -1) {
                myNewexerciseIdsJSON.push(myGymDays[i].exerciseItemIdsJSON[j])
            }
        }
        if (myNewexerciseIdsJSON.length !== myGymDays[i].exerciseItemIdsJSON.length) {
            myGymDays[i].exerciseItemIdsJSON = myNewexerciseIdsJSON;
            await putGymDay(myGymDays[i], myToken, myCustomId);
        }
    }
    return myGymDays
}

export default updateGymDaysWithExerciseItemChanges