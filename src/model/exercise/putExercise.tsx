import putItemDynamoDB from '../../api/putItemDynamoDB';
import {
    exercisesTableName,
} from '../../api/apiConstants';

const putExercise = async (exerciseItem: any, myToken: any, myCustomId: any) => {
    const data = await putItemDynamoDB(exercisesTableName, exerciseItem, myToken, myCustomId)
    if (data.err) {
        return null;
    }
    return data;
}

export default putExercise;