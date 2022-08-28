import putItemDynamoDB from '../../api/putItemDynamoDB';
import {
    exerciseItemsTableName,
} from '../../api/apiConstants';

const putExerciseItem = async (exerciseItem: any, myToken: any, myCustomId: any) => {
    const data = await putItemDynamoDB(exerciseItemsTableName, exerciseItem, myToken, myCustomId)
    if (data.err) {
        return null;
    }
    return data;
}

export default putExerciseItem;