import batchGetItemDynamoDB from '../../api/batchGetItemDynamoDB';

import {
    gymDaysTableName,
    projectionExpressionGymDay,
    blankPlaceHolder,
} from '../../api/apiConstants';

const getBatch = async (myIds: any) => {
    let myGymDays = []
    const data = await batchGetItemDynamoDB(gymDaysTableName, myIds, projectionExpressionGymDay)
    if (data.err) {
        return [];
    }

    myGymDays = data.payload.Responses.gymDays;
    for (let i = 0; i < myGymDays.length; i++) {
        myGymDays[i].title = myGymDays[i].title === blankPlaceHolder ? '' : myGymDays[i].title
        myGymDays[i].workoutIdsJSON = JSON.parse(myGymDays[i].workoutIdsJSON)
        myGymDays[i].dayJSON = JSON.parse(myGymDays[i].dayJSON)
        myGymDays[i].dateFrom = new Date(myGymDays[i].dateFrom)
        myGymDays[i].dateTo = new Date(myGymDays[i].dateTo)
    }

    return myGymDays;
}

const getGymDays = async (GymDaysIds: any) => {
    if (GymDaysIds.length === 0) { return [] }
    // console.log(restaurant);
    let myGymDays: any = [];

    // get records in batches of 100
    let myIds = [];
    let currentIndex = 0;
    let nextIndex = 0;
    for (let i = 0; i < GymDaysIds.length; i++) {
        myIds.push(GymDaysIds[i]);
        currentIndex++;
        if (currentIndex > 99) {
            const myBatch = await getBatch(myIds);
            myIds = [];
            currentIndex = 0
            myGymDays = myGymDays.concat(myBatch)
            nextIndex = i + 1;
        }
    }

    // get any leftover records
    myIds = [];
    for (let i = nextIndex; i < GymDaysIds.length; i++) {
        myIds.push(GymDaysIds[i]);
    }
    const myBatch = await getBatch(myIds);
    myGymDays = myGymDays.concat(myBatch)

    return myGymDays;
}

export default getGymDays