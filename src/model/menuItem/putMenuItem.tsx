import putItemDynamoDB from '../../api/putItemDynamoDB';
import {
    menuItemsTableName,
} from '../../api/apiConstants';

const putMenuItem = async (myMenuItem: any, myToken: any, myCustomId: any) => {
    //console.log(myMenuItem, myToken, myCustomId);
    const data = await putItemDynamoDB(menuItemsTableName, myMenuItem, myToken, myCustomId)
    if (data.err) {
        return null;
    }
    return data;
}

export default putMenuItem;