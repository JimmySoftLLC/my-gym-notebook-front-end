import deleteItemDynamoDB from '../../api/deleteItemDynamoDB';
import {
    exerciseItemsTableName,
} from '../../api/apiConstants';

const deleteExerciseItem = async (myExerciseItemId: any, myToken: any, myCustomId: any) => {
    // console.log(myExerciseItemId, myToken, myCustomId);
    // return null;
    const data = await deleteItemDynamoDB(exerciseItemsTableName, myExerciseItemId, myToken, myCustomId)
    if (data.err) {
        return null;
    }
    return data;
}

export default deleteExerciseItem;