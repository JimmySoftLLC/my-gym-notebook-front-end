import deleteItemDynamoDB from '../../api/deleteItemDynamoDB';
import {
    exercisesTableName,
} from '../../api/apiConstants';

const deleteExercise = async (exerciseItemId: any, myToken: any, myCustomId: any) => {
    const data = await deleteItemDynamoDB(exercisesTableName, exerciseItemId, myToken, myCustomId)
    if (data.err) {
        return null;
    }
    return data;
}

export default deleteExercise;