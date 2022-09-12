import putItemDynamoDB from '../../api/putItemDynamoDB';
import {
    workoutsTableName,
} from '../../api/apiConstants';

const putWorkout = async (myWorkout: any, myToken: any, myCustomId: any) => {
    const data = await putItemDynamoDB(workoutsTableName, myWorkout, myToken, myCustomId)
    if (data.err) {
        return null;
    }
    return data;
}

export default putWorkout;