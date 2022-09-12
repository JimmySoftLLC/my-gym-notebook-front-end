import putItemDynamoDB from '../../api/putItemDynamoDB';
import {
    exerciseItemsTableName,
} from '../../api/apiConstants';

const putExercise = async (exerciseItem: any, myToken: any, myCustomId: any) => {
    const data = await putItemDynamoDB(exerciseItemsTableName, exerciseItem, myToken, myCustomId)
    if (data.err) {
        return null;
    }
    return data;
}

export default putExercise;