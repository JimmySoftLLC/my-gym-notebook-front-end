
import putItemDynamoDB from '../../api/putItemDynamoDB';
import {
    gymMembersTableName,
} from '../../api/apiConstants';

const createAssociate = async (myEmailId: any, myToken: any, myCustomId: any) => {
    let myAssociate = {
        id: myEmailId,
        firstName: '',
        lastName: '',
        bio: '',
        email: myEmailId,
        imageUrl: '',
        exerciseIdsJSON: [],
        gymDayIdsJSON: [],
        teamMateIdsJSON: [],
    }
    //console.log(myAssociate)
    const data = await putItemDynamoDB(gymMembersTableName, myAssociate, myToken, myCustomId)
    if (data.err) {
        return null;
    }
    return myAssociate;
}

export default createAssociate;

