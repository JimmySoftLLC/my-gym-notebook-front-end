import batchGetItemDynamoDB from '../../api/batchGetItemDynamoDB';

import {
    exerciseItemsTableName,
    projectionExpressionExerciseItem,
    blankPlaceHolder,
} from '../../api/apiConstants';

const getBatch = async (ids: any) => {
    let exerciseItems = []
    const data = await batchGetItemDynamoDB(exerciseItemsTableName, ids, projectionExpressionExerciseItem)
    if (data.err) {
        return [];
    }
    exerciseItems = data.payload.Responses.exerciseItems;
    for (let i = 0; i < exerciseItems.length; i++) {
        exerciseItems[i].title = exerciseItems[i].title === blankPlaceHolder ? '' : exerciseItems[i].title
        exerciseItems[i].description = exerciseItems[i].description === blankPlaceHolder ? '' : exerciseItems[i].description
        exerciseItems[i].categoryJSON = exerciseItems[i].categoryJSON === undefined ? JSON.parse('[]') : JSON.parse(exerciseItems[i].categoryJSON)
    }
    return exerciseItems;
}

const getExerciseItems = async (exerciseItemIds: any) => {
    if (exerciseItemIds.length === 0) { return [] }

    // get records in batches of 100
    let myIds = [];
    let currentIndex = 0;
    let nextIndex = 0;
    let myExerciseItems: any = []
    for (let i = 0; i < exerciseItemIds.length; i++) {
        myIds.push(exerciseItemIds[i]);
        currentIndex++;
        if (currentIndex > 99) {
            const myBatch = await getBatch(myIds);
            myIds = [];
            currentIndex = 0
            myExerciseItems = myExerciseItems.concat(myBatch)
            nextIndex = i + 1;
        }
    }

    // get any leftover records
    myIds = [];
    for (let i = nextIndex; i < exerciseItemIds.length; i++) {
        myIds.push(exerciseItemIds[i]);
    }
    const myBatch = await getBatch(myIds);
    myExerciseItems = myExerciseItems.concat(myBatch)

    return myExerciseItems;
}

export default getExerciseItems