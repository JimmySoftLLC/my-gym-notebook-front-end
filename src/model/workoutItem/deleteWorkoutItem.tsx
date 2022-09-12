import deleteItemDynamoDB from '../../api/deleteItemDynamoDB';
import {
    workoutsTableName,
} from '../../api/apiConstants';

const deleteWorkout = async (myWorkoutId: any, myToken: any, myCustomId: any) => {
    const data = await deleteItemDynamoDB(workoutsTableName, myWorkoutId, myToken, myCustomId)
    if (data.err) {
        return null;
    }
    return data;
}

export default deleteWorkout;