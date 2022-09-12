import getGymDaysFromIds from './getGymDays';

const getMembersGymDays = async (gymMember: any) => {
    let gymDayItemIds = [];

    for (let k = 0; k < gymMember.gymDayIdsJSON.length; k++) {
        gymDayItemIds.push(gymMember.gymDayIdsJSON[k])
    }
    const gymDayItems = await getGymDaysFromIds(gymDayItemIds)

    return gymDayItems;
}

export default getMembersGymDays;