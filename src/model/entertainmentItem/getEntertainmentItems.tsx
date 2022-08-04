import batchGetItemDynamoDB from '../../api/batchGetItemDynamoDB';

import {
    entertainmentItemsTableName,
    projectionExpressionEntertainmentItem,
    blankPlaceHolder,
} from '../../api/apiConstants';

const getBatch = async (myIds: any[]) => {
    let myEntertainmentItems = []
    const data = await batchGetItemDynamoDB(entertainmentItemsTableName, myIds, projectionExpressionEntertainmentItem)
    if (data.err) {
        return [];
    }
    myEntertainmentItems = data.payload.Responses.entertainmentItems;
    for (let i = 0; i < myEntertainmentItems.length; i++) {
        myEntertainmentItems[i].title = myEntertainmentItems[i].title === blankPlaceHolder ? '' : myEntertainmentItems[i].title
        myEntertainmentItems[i].timeFrom = new Date(myEntertainmentItems[i].timeFrom)
        myEntertainmentItems[i].timeTo = new Date(myEntertainmentItems[i].timeTo)
        myEntertainmentItems[i].description = myEntertainmentItems[i].description === blankPlaceHolder ? '' : myEntertainmentItems[i].description
        myEntertainmentItems[i].imageUrl = myEntertainmentItems[i].imageUrl === blankPlaceHolder ? '' : myEntertainmentItems[i].imageUrl
        myEntertainmentItems[i].categoryJSON = JSON.parse(myEntertainmentItems[i].categoryJSON)
    }
    return myEntertainmentItems;
}

const getEntertainmentItems = async (entertainmentItemIds: string | any[]) => {
    if (entertainmentItemIds.length === 0) { return [] }
    // get records in batches of 100
    let myIds = [];
    let currentIndex = 0;
    let nextIndex = 0;
    let myEntertainmentItems: any[] = []
    for (let i = 0; i < entertainmentItemIds.length; i++) {
        myIds.push(entertainmentItemIds[i]);
        currentIndex++;
        if (currentIndex > 99) {
            const myBatch = await getBatch(myIds);
            myIds = [];
            currentIndex = 0
            myEntertainmentItems = myEntertainmentItems.concat(myBatch)
            nextIndex = i + 1;
        }
    }

    // get any leftover records
    myIds = [];
    for (let i = nextIndex; i < entertainmentItemIds.length; i++) {
        myIds.push(entertainmentItemIds[i]);
    }
    const myBatch = await getBatch(myIds);
    myEntertainmentItems = myEntertainmentItems.concat(myBatch)

    // console.log(myEntertainmentItems);

    return myEntertainmentItems;
}

export default getEntertainmentItems