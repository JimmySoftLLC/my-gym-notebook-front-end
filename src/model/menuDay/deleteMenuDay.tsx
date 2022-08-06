import deleteItemDynamoDB from '../../api/deleteItemDynamoDB';
import {
    gymDaysTableName,
} from '../../api/apiConstants';

const deleteMenuDay = async (myMenuDayId: any, myToken: any, myCustomId: any) => {
    // console.log(myMenuDayId, myToken, myCustomId);
    // return null;
    const data = await deleteItemDynamoDB(gymDaysTableName, myMenuDayId, myToken, myCustomId)
    if (data.err) {
        return null;
    }
    return data;
}

export default deleteMenuDay;