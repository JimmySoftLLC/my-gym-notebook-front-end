import batchGetItemDynamoDB from '../../api/batchGetItemDynamoDB';

import {
    exercisesTableName,
    projectionExpressionExercise,
    blankPlaceHolder,
} from '../../api/apiConstants';

const getBatch = async (ids: any) => {
    let exercises = []
    const data = await batchGetItemDynamoDB(exercisesTableName, ids, projectionExpressionExercise)
    if (data.err) {
        return [];
    }
    exercises = data.payload.Responses.exercises;
    for (let i = 0; i < exercises.length; i++) {
        exercises[i].title = exercises[i].title === blankPlaceHolder ? '' : exercises[i].title
        exercises[i].description = exercises[i].description === blankPlaceHolder ? '' : exercises[i].description
        exercises[i].categoryJSON = exercises[i].categoryJSON === undefined ? JSON.parse('[]') : JSON.parse(exercises[i].categoryJSON)
    }
    return exercises;
}

const getExercises = async (exerciseItemIds: any) => {
    if (exerciseItemIds.length === 0) { return [] }

    // get records in batches of 100
    let myIds = [];
    let currentIndex = 0;
    let nextIndex = 0;
    let myExercises: any = []
    for (let i = 0; i < exerciseItemIds.length; i++) {
        myIds.push(exerciseItemIds[i]);
        currentIndex++;
        if (currentIndex > 99) {
            const myBatch = await getBatch(myIds);
            myIds = [];
            currentIndex = 0
            myExercises = myExercises.concat(myBatch)
            nextIndex = i + 1;
        }
    }

    // get any leftover records
    myIds = [];
    for (let i = nextIndex; i < exerciseItemIds.length; i++) {
        myIds.push(exerciseItemIds[i]);
    }
    const myBatch = await getBatch(myIds);
    myExercises = myExercises.concat(myBatch)

    return myExercises;
}

export default getExercises