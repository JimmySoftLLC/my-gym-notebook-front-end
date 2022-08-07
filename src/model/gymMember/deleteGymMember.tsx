import deleteItemDynamoDB from '../../api/deleteItemDynamoDB';
import {
    gymMembersTableName,
} from '../../api/apiConstants';

const deleteGymMember = async (myGymMemberId: any, myToken: any, myCustomId: any) => {
    // console.log(myGymMemberId, myToken, myCustomId);
    // return null;
    const data = await deleteItemDynamoDB(gymMembersTableName, myGymMemberId, myToken, myCustomId)
    if (data.err) {
        return null;
    }
    return data;
}

export default deleteGymMember;