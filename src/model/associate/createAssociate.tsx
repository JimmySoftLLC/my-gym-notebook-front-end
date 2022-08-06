
import putItemDynamoDB from '../../api/putItemDynamoDB';
import {
    membersTableName,
} from '../../api/apiConstants';

const createAssociate = async (myEmailId: any, myToken: any, myCustomId: any) => {
    let myAssociate = {
        id: myEmailId,
        firstName: '',
        lastName: '',
        bio: '',
        jobTitle: '',
        email: myEmailId,
        restaurantIdsJSON: [],
        imageUrl: '',
    }
    //console.log(myAssociate)
    const data = await putItemDynamoDB(membersTableName, myAssociate, myToken, myCustomId)
    if (data.err) {
        return null;
    }
    return myAssociate;
}

export default createAssociate;

