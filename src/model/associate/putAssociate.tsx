import putItemDynamoDB from '../../api/putItemDynamoDB';
import {
    gymMembersTableName,
} from '../../api/apiConstants';

const putAssociate = async (myAssociate: any, myToken: any, myCustomId: any) => {
    //console.log(myAssociate,myToken, myCustomId);
    const myNewAssociate = JSON.parse(JSON.stringify(myAssociate))
    const data = await putItemDynamoDB(gymMembersTableName, myNewAssociate, myToken, myCustomId)
    if (data.err) {
        return null;
    }
    return data;
}

export default putAssociate;