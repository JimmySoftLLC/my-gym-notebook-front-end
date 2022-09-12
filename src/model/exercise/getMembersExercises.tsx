import getExercises from './getExercises';

const getMembersExercises = async (gymMember: any) => {
    let exerciseItemIds = [];

    for (let k = 0; k < gymMember.exerciseIdsJSON.length; k++) {
        exerciseItemIds.push(gymMember.exerciseIdsJSON[k])
    }
    const myExercises = await getExercises(exerciseItemIds)

    return myExercises;
}

export default getMembersExercises;