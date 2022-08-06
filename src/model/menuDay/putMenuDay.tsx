import putItemDynamoDB from '../../api/putItemDynamoDB';
import {
    gymDaysTableName,
} from '../../api/apiConstants';

const putMenuDay = async (myMenuDay: any, myToken: any, myCustomId: any) => {
    const data = await putItemDynamoDB(gymDaysTableName, myMenuDay, myToken, myCustomId)
    if (data.err) {
        return null;
    }
    return data;
}

export default putMenuDay;