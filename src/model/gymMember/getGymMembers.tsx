import batchGetItemDynamoDB from '../../api/batchGetItemDynamoDB';

import {
    gymMembersTableName,
    projectionExpressionGymMember,
    blankPlaceHolder,
} from '../../api/apiConstants';

const getBatch = async (myIds: any[]) => {
    let myGymMembers = []
    const data = await batchGetItemDynamoDB(gymMembersTableName, myIds, projectionExpressionGymMember)
    if (data.err) {
        return [];
    }
    myGymMembers = data.payload.Responses.gymMembers;
    for (let i = 0; i < myGymMembers.length; i++) {
        myGymMembers[i].firstName = myGymMembers[i].firstName === blankPlaceHolder ? '' : myGymMembers[i].firstName
        myGymMembers[i].lastName = myGymMembers[i].lastName === blankPlaceHolder ? '' : myGymMembers[i].lastName
        myGymMembers[i].email = myGymMembers[i].email === blankPlaceHolder ? '' : myGymMembers[i].email
        myGymMembers[i].bio = myGymMembers[i].bio === blankPlaceHolder ? '' : myGymMembers[i].bio
        myGymMembers[i].exerciseIdsJSON = myGymMembers[i].exerciseIdsJSON === undefined ? JSON.parse('[]') : JSON.parse(myGymMembers[i].exerciseIdsJSON)
        myGymMembers[i].teamMateIdsJSON = myGymMembers[i].teamMateIdsJSON === undefined ? JSON.parse('[]') : JSON.parse(myGymMembers[i].teamMateIdsJSON)
        myGymMembers[i].gymDayIdsJSON = myGymMembers[i].gymDayIdsJSON === undefined ? JSON.parse('[]') : JSON.parse(myGymMembers[i].gymDayIdsJSON)
        myGymMembers[i].workoutIdsJSON = myGymMembers[i].workoutIdsJSON === undefined ? JSON.parse('[]') : JSON.parse(myGymMembers[i].workoutIdsJSON)
        myGymMembers[i].dataJSON = myGymMembers[i].dataJSON === undefined ? JSON.parse('[]') : JSON.parse(myGymMembers[i].dataJSON)
        myGymMembers[i].imageUrl = myGymMembers[i].imageUrl === blankPlaceHolder ? '' : myGymMembers[i].imageUrl
    }
    return myGymMembers;
}

// get gymMembers from the database if they have emails, otherwise get them from restaurant gymMemberJSON
// do this by creating an array of gymMemberIds for records that have email, these will be on server
// those that don't have email are local to the restaurant just use that record instead
const getGymMembers = async (gymMemberIds: string | any[]) => {
    if (gymMemberIds.length === 0) { return [] }
    let myGymMembers: any[] = [];
    // get records in batches of 100 using the array of gymMemberIds
    let myIds = [];
    let currentCount = 0;
    let lastValidNextIndex = 0;
    for (let i = 0; i < gymMemberIds.length; i++) {
        // console.log(gymMemberIds[i]);
        myIds.push(gymMemberIds[i]);
        currentCount++;
        if (currentCount > 99) {
            const myBatch = await getBatch(myIds);
            myIds = [];
            currentCount = 0
            myGymMembers = myGymMembers.concat(myBatch)
            lastValidNextIndex = i + 1;
        }
    }

    // get any leftover records
    myIds = [];
    for (let i = lastValidNextIndex; i < gymMemberIds.length; i++) {
        myIds.push(gymMemberIds[i]);
    }
    const myBatch = await getBatch(myIds);
    myGymMembers = myGymMembers.concat(myBatch)

    return myGymMembers;
}

export default getGymMembers