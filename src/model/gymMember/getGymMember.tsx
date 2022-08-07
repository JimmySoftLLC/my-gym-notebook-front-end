import getItemDynamoDB from '../../api/getItemDynamoDB';
import {
    gymMembersTableName,
    blankPlaceHolder,
} from '../../api/apiConstants';

const getGymMember = async (myEmailId: any, myToken: any, myCustomId: any) => {
    //console.log(myEmailId, myToken, myCustomId);
    const data = await getItemDynamoDB(gymMembersTableName, myEmailId, myToken, myCustomId)
    if (data.err) {
        return null;
    }
    let myGymMember = data.payload.Item
    if (myGymMember === undefined) {
        return null;
    }
    myGymMember.firstName = myGymMember.firstName === blankPlaceHolder ? '' : myGymMember.firstName
    myGymMember.lastName = myGymMember.lastName === blankPlaceHolder ? '' : myGymMember.lastName
    myGymMember.email = myGymMember.email === blankPlaceHolder ? '' : myGymMember.email
    myGymMember.bio = myGymMember.bio === blankPlaceHolder ? '' : myGymMember.bio
    myGymMember.exerciseIdsJSON = JSON.parse(myGymMember.exerciseIdsJSON)
    myGymMember.teamMateIdsJSON = JSON.parse(myGymMember.teamMateIdsJSON)
    myGymMember.gymDayIdsJSON = JSON.parse(myGymMember.gymDayIdsJSON)
    myGymMember.imageUrl = myGymMember.imageUrl === blankPlaceHolder ? '' : myGymMember.imageUrl
    return myGymMember;
}

export default getGymMember