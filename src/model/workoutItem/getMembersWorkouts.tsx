import getWorkoutsFromIds from './getWorkouts';

const getMembersWorkouts = async (gymMember: any) => {
    let WorkoutItemIds = [];

    for (let k = 0; k < gymMember.WorkoutIdsJSON.length; k++) {
        WorkoutItemIds.push(gymMember.WorkoutIdsJSON[k])
    }
    const WorkoutItems = await getWorkoutsFromIds(WorkoutItemIds)

    return WorkoutItems;
}

export default getMembersWorkouts;