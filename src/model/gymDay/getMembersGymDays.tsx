import getGymDaysFromIds from './getGymDaysFromIds';

const getMembersGymDays = async (gymMember: any) => {
    let exerciseItemIds = [];

    for (let k = 0; k < gymMember.exerciseIdsJSON.length; k++) {
        exerciseItemIds.push(gymMember.exerciseIdsJSON[k])
    }
    const gymDayItems = await getGymDaysFromIds(exerciseItemIds)

    return gymDayItems;
}

export default getMembersGymDays;