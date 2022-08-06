import deleteItemDynamoDB from '../../api/deleteItemDynamoDB';
import {
    membersTableName,
} from '../../api/apiConstants';

const deleteAssociate = async (myAssociateId: any, myToken: any, myCustomId: any) => {
    // console.log(myAssociateId, myToken, myCustomId);
    // return null;
    const data = await deleteItemDynamoDB(membersTableName, myAssociateId, myToken, myCustomId)
    if (data.err) {
        return null;
    }
    return data;
}

export default deleteAssociate;