import getWorkoutsFromIds from './getWorkoutsFromIds';

const getMembersWorkouts = async (gymMember: any) => {
    let workoutItemIds = [];

    for (let k = 0; k < gymMember.workoutIdsJSON.length; k++) {
        workoutItemIds.push(gymMember.workoutIdsJSON[k])
    }
    const Workouts = await getWorkoutsFromIds(workoutItemIds)

    return Workouts;
}

export default getMembersWorkouts;