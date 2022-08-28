import getExerciseItems from './getExerciseItems';

const getMembersExerciseItems = async (gymMember: any) => {
    // create an array of all ids
    let ExerciseItemIds = [];

    for (let k = 0; k < gymMember.exerciseIdsJSON.length; k++) {
        ExerciseItemIds.push(gymMember.exerciseIdsJSON[k])
    }
    const myExerciseItems = await getExerciseItems(ExerciseItemIds)

    return myExerciseItems;
}

export default getMembersExerciseItems;