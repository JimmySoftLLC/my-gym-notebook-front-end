import getWorkoutsFromIds from './getWorkoutsFromIds';

const getMembersWorkouts = async (gymMember: any) => {
    let workoutItemIds = [];

    for (let k = 0; k < gymMember.workoutIdsJSON.length; k++) {
        workoutItemIds.push(gymMember.workoutIdsJSON[k])
    }
    const WorkoutItems = await getWorkoutsFromIds(workoutItemIds)

    return WorkoutItems;
}

export default getMembersWorkouts;