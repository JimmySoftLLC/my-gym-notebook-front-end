import batchGetItemDynamoDB from '../../api/batchGetItemDynamoDB';

import {
    workoutsTableName,
    projectionExpressionWorkout,
    blankPlaceHolder,
} from '../../api/apiConstants';

const getBatch = async (myIds: any) => {
    let myWorkouts = []
    const data = await batchGetItemDynamoDB(workoutsTableName, myIds, projectionExpressionWorkout)
    if (data.err) {
        return [];
    }

    myWorkouts = data.payload.Responses.workouts;
    for (let i = 0; i < myWorkouts.length; i++) {
        myWorkouts[i].title = myWorkouts[i].title === blankPlaceHolder ? '' : myWorkouts[i].title
        myWorkouts[i].description = myWorkouts[i].description === blankPlaceHolder ? '' : myWorkouts[i].description
        myWorkouts[i].exerciseIdsJSON = JSON.parse(myWorkouts[i].exerciseIdsJSON)
        myWorkouts[i].dateFrom = new Date(myWorkouts[i].dateFrom)
        myWorkouts[i].dateTo = new Date(myWorkouts[i].dateTo)
    }

    return myWorkouts;
}

const getWorkoutsFromIds = async (WorkoutsIds: any) => {
    if (WorkoutsIds.length === 0) { return [] }
    // console.log(restaurant);
    let myWorkouts: any = [];

    // get records in batches of 100
    let myIds = [];
    let currentIndex = 0;
    let nextIndex = 0;
    for (let i = 0; i < WorkoutsIds.length; i++) {
        myIds.push(WorkoutsIds[i]);
        currentIndex++;
        if (currentIndex > 99) {
            const myBatch = await getBatch(myIds);
            myIds = [];
            currentIndex = 0
            myWorkouts = myWorkouts.concat(myBatch)
            nextIndex = i + 1;
        }
    }

    // get any leftover records
    myIds = [];
    for (let i = nextIndex; i < WorkoutsIds.length; i++) {
        myIds.push(WorkoutsIds[i]);
    }
    const myBatch = await getBatch(myIds);
    myWorkouts = myWorkouts.concat(myBatch)

    return myWorkouts;
}

export default getWorkoutsFromIds