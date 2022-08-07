import batchGetItemDynamoDB from '../../api/batchGetItemDynamoDB';

import {
    exerciseItemsTableName,
    projectionExpressionExerciseItem,
    blankPlaceHolder,
} from '../../api/apiConstants';

const getBatch = async (myIds: any) => {
    let myExerciseItems = []
    const data = await batchGetItemDynamoDB(exerciseItemsTableName, myIds, projectionExpressionExerciseItem)
    if (data.err) {
        return [];
    }
    myExerciseItems = data.payload.Responses.ExerciseItems;
    for (let i = 0; i < myExerciseItems.length; i++) {
        myExerciseItems[i].title = myExerciseItems[i].title === blankPlaceHolder ? '' : myExerciseItems[i].title
        myExerciseItems[i].description = myExerciseItems[i].description === blankPlaceHolder ? '' : myExerciseItems[i].description
        myExerciseItems[i].restaurant = myExerciseItems[i].restaurant === blankPlaceHolder ? '' : myExerciseItems[i].restaurant
        myExerciseItems[i].categoryJSON = JSON.parse(myExerciseItems[i].categoryJSON)
    }
    return myExerciseItems;
}

const getExerciseItems = async (ExerciseItemIds: any) => {
    if (ExerciseItemIds.length === 0) { return [] }
    // get records in batches of 100
    let myIds = [];
    let currentIndex = 0;
    let nextIndex = 0;
    let myExerciseItems: any = []
    for (let i = 0; i < ExerciseItemIds.length; i++) {
        myIds.push(ExerciseItemIds[i]);
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
    for (let i = nextIndex; i < ExerciseItemIds.length; i++) {
        myIds.push(ExerciseItemIds[i]);
    }
    const myBatch = await getBatch(myIds);
    myExerciseItems = myExerciseItems.concat(myBatch)

    // console.log(myExerciseItems);

    return myExerciseItems;
}

export default getExerciseItems