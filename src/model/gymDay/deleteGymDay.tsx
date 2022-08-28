import deleteItemDynamoDB from '../../api/deleteItemDynamoDB';
import {
    gymDaysTableName,
} from '../../api/apiConstants';

const deleteGymDay = async (myGymDayId: any, myToken: any, myCustomId: any) => {
    const data = await deleteItemDynamoDB(gymDaysTableName, myGymDayId, myToken, myCustomId)
    if (data.err) {
        return null;
    }
    return data;
}

export default deleteGymDay;