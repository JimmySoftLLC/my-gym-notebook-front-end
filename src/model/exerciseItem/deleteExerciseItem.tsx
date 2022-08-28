import deleteItemDynamoDB from '../../api/deleteItemDynamoDB';
import {
    exerciseItemsTableName,
} from '../../api/apiConstants';

const deleteExerciseItem = async (exerciseItemId: any, myToken: any, myCustomId: any) => {
    const data = await deleteItemDynamoDB(exerciseItemsTableName, exerciseItemId, myToken, myCustomId)
    if (data.err) {
        return null;
    }
    return data;
}

export default deleteExerciseItem;