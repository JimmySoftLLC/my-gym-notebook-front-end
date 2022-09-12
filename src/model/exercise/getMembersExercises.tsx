import getExerciseItems from './getExercises';

const getMembersExerciseItems = async (gymMember: any) => {
    let exerciseItemIds = [];

    for (let k = 0; k < gymMember.exerciseIdsJSON.length; k++) {
        exerciseItemIds.push(gymMember.exerciseIdsJSON[k])
    }
    const myExerciseItems = await getExerciseItems(exerciseItemIds)

    return myExerciseItems;
}

export default getMembersExerciseItems;