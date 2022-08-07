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

    myGymDays = data.payload.Responses.GymDays;
    for (let i = 0; i < myGymDays.length; i++) {
        myGymDays[i].title = myGymDays[i].title === blankPlaceHolder ? '' : myGymDays[i].title
        myGymDays[i].description = myGymDays[i].description === blankPlaceHolder ? '' : myGymDays[i].description
        myGymDays[i].ExerciseItemIdsJSON = JSON.parse(myGymDays[i].ExerciseItemIdsJSON)
        myGymDays[i].entertainmentItemIdsJSON = JSON.parse(myGymDays[i].entertainmentItemIdsJSON)
        myGymDays[i].associatesJSON = JSON.parse(myGymDays[i].associatesJSON)
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

    //console.log(myRestaurantGymDays);
    return myGymDays;
}

export default getGymDays