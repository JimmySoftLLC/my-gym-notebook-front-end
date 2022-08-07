import putItemDynamoDB from '../../api/putItemDynamoDB';
import {
    exerciseItemsTableName,
} from '../../api/apiConstants';

const putExerciseItem = async (myExerciseItem: any, myToken: any, myCustomId: any) => {
    //console.log(myExerciseItem, myToken, myCustomId);
    const data = await putItemDynamoDB(exerciseItemsTableName, myExerciseItem, myToken, myCustomId)
    if (data.err) {
        return null;
    }
    return data;
}

export default putExerciseItem;