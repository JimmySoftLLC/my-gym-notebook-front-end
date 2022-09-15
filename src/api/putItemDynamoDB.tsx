import { API } from 'aws-amplify';
import {
    exercisesTableName,
    workoutsTableName,
    gymDaysTableName,
    gymMembersTableName,
    apiName,
    apiPath,
    blankPlaceHolder,
} from './apiConstants';
import dateString from '../utilities/dateString';

const putItemDynamoDB = async (myTableName: any, myItem: any, myIdToken: any, myCustomId: any): Promise<any> => {
    // console.log(myTableName, myIdToken, myItem, myCustomId);
    let myNewItem = {}
    switch (myTableName) {
        case exercisesTableName:
            myNewItem = {
                id: myItem.id,
                title: myItem.title = myItem.title !== '' ? myItem.title : blankPlaceHolder,
                dataJSON: JSON.stringify(myItem.dataJSON),
                categoryJSON: JSON.stringify(myItem.categoryJSON),
            }
            break;
        case workoutsTableName:
            myNewItem = {
                id: myItem.id,
                title: myItem.title = myItem.title !== '' ? myItem.title : blankPlaceHolder,
                exerciseIdsJSON: JSON.stringify(myItem.exerciseIdsJSON),
            }
            break;
        case gymDaysTableName:
            myNewItem = {
                id: myItem.id,
                title: myItem.title = myItem.title !== '' ? myItem.title : blankPlaceHolder,
                dateFrom: dateString(myItem.dateFrom, new Date(), 'saveToDatabaseFromDate'),
                dateTo: dateString(myItem.dateTo, new Date(), 'saveToDatabaseToDate'),
                workoutIdsJSON: JSON.stringify(myItem.workoutIdsJSON),
                dayJSON: JSON.stringify(myItem.dayJSON),
            }
            break;
        case gymMembersTableName:
            myNewItem = {
                id: myItem.id,
                firstName: myItem.firstName !== '' ? myItem.firstName : blankPlaceHolder,
                lastName: myItem.lastName !== '' ? myItem.lastName : blankPlaceHolder,
                email: myItem.email !== '' ? myItem.email : blankPlaceHolder,
                bio: myItem.bio !== '' ? myItem.bio : blankPlaceHolder,
                exerciseIdsJSON: JSON.stringify(myItem.exerciseIdsJSON),
                teamMateIdsJSON: JSON.stringify(myItem.teamMateIdsJSON),
                gymDayIdsJSON: JSON.stringify(myItem.gymDayIdsJSON),
                workoutIdsJSON: JSON.stringify(myItem.workoutIdsJSON),
                dataJSON: JSON.stringify(myItem.dataJSON),
                imageUrl: myItem.imageUrl !== '' ? myItem.imageUrl : blankPlaceHolder,
            }
            break;
        default:
    }
    let myReturnObject = { err: false, payload: null };
    try {
        const apiRequest = {
            body: {
                myMethod: 'put',
                myBody: {
                    TableName: myTableName,
                    Item: myNewItem,
                    ReturnConsumedCapacity: 'TOTAL',
                },
                myId: myCustomId,
            },
            headers: {
                'Authorization': myIdToken,
                'Content-Type': 'application/json',
                'Accept': '*/*',
            }
        };
        // console.log('API Request:', apiRequest, myIdToken);
        const data = await API.post(apiName, apiPath, apiRequest);
        myReturnObject.payload = data;
        // console.log(myReturnObject);
        return myReturnObject;
    } catch (err: any) {
        myReturnObject.err = true;
        myReturnObject.payload = err.message;
        //console.log(myReturnObject);
        return myReturnObject;
    }
};

export default putItemDynamoDB