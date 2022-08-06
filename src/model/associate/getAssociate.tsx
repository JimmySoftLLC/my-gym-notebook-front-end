import getItemDynamoDB from '../../api/getItemDynamoDB';
import {
    gymMembersTableName,
    blankPlaceHolder,
} from '../../api/apiConstants';

const getAssociate = async (myEmailId: any, myToken: any, myCustomId: any) => {
    //console.log(myEmailId, myToken, myCustomId);
    const data = await getItemDynamoDB(gymMembersTableName, myEmailId, myToken, myCustomId)
    if (data.err) {
        return null;
    }
    let myAssociate = data.payload.Item
    if (myAssociate === undefined) {
        return null;
    }
    myAssociate.firstName = myAssociate.firstName === blankPlaceHolder ? '' : myAssociate.firstName
    myAssociate.lastName = myAssociate.lastName === blankPlaceHolder ? '' : myAssociate.lastName
    myAssociate.email = myAssociate.email === blankPlaceHolder ? '' : myAssociate.email
    myAssociate.bio = myAssociate.bio === blankPlaceHolder ? '' : myAssociate.bio
    myAssociate.exerciseIdsJSON = JSON.parse(myAssociate.exerciseIdsJSON)
    myAssociate.teamMateIdsJSON = JSON.parse(myAssociate.teamMateIdsJSON)
    myAssociate.gymDayIdsJSON = JSON.parse(myAssociate.gymDayIdsJSON)
    myAssociate.imageUrl = myAssociate.imageUrl === blankPlaceHolder ? '' : myAssociate.imageUrl
    return myAssociate;
}

export default getAssociate