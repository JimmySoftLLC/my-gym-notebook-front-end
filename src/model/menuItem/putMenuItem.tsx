import putItemDynamoDB from '../../api/putItemDynamoDB';
import {
    exerciseItemsTableName,
} from '../../api/apiConstants';

const putMenuItem = async (myMenuItem: any, myToken: any, myCustomId: any) => {
    //console.log(myMenuItem, myToken, myCustomId);
    const data = await putItemDynamoDB(exerciseItemsTableName, myMenuItem, myToken, myCustomId)
    if (data.err) {
        return null;
    }
    return data;
}

export default putMenuItem;