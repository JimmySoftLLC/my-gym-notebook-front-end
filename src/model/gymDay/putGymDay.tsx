import putItemDynamoDB from '../../api/putItemDynamoDB';
import {
    gymDaysTableName,
} from '../../api/apiConstants';

const putGymDay = async (myGymDay: any, myToken: any, myCustomId: any) => {
    const data = await putItemDynamoDB(gymDaysTableName, myGymDay, myToken, myCustomId)
    if (data.err) {
        return null;
    }
    return data;
}

export default putGymDay;