import { API } from 'aws-amplify';
import {
  exercisesTableName,
  workoutsTableName,
  gymDaysTableName,
  gymMembersTableName,
  exerciseDaysTableName,
  apiName,
  apiPath,
  blankPlaceHolder,
} from './apiConstants';
import dateString from '../utilities/dateString';

const putItemDynamoDB = async (
  myTableName: any,
  myItem: any,
  myIdToken: any,
  myCustomId: any
): Promise<any> => {
  let myNewItem = {};
  switch (myTableName) {
    case exercisesTableName:
      myNewItem = {
        id: myItem.id,
        title: (myItem.title =
          myItem.title !== '' ? myItem.title : blankPlaceHolder),
        dataJSON: JSON.stringify(myItem.dataJSON),
        categoryJSON: JSON.stringify(myItem.categoryJSON),
        videoUrl: (myItem.videoUrl =
          myItem.videoUrl !== '' ? myItem.videoUrl : blankPlaceHolder),
      };
      break;
    case exerciseDaysTableName:
      myNewItem = {
        id: myItem.id,
        dataJSON: JSON.stringify(myItem.dataJSON),
      };
      break;
    case workoutsTableName:
      myNewItem = {
        id: myItem.id,
        title: (myItem.title =
          myItem.title !== '' ? myItem.title : blankPlaceHolder),
        exerciseIdsJSON: JSON.stringify(myItem.exerciseIdsJSON),
      };
      break;
    case gymDaysTableName:
      myNewItem = {
        id: myItem.id,
        title: (myItem.title =
          myItem.title !== '' ? myItem.title : blankPlaceHolder),
        dateFrom: dateString(
          myItem.dateFrom,
          new Date(),
          'saveToDatabaseFromDate'
        ),
        dateTo: dateString(myItem.dateTo, new Date(), 'saveToDatabaseToDate'),
        workoutIdsJSON: JSON.stringify(myItem.workoutIdsJSON),
        dayJSON: JSON.stringify(myItem.dayJSON),
      };
      break;
    case gymMembersTableName:
      myNewItem = {
        id: myItem.id,
        firstName:
          myItem.firstName !== '' ? myItem.firstName : blankPlaceHolder,
        lastName: myItem.lastName !== '' ? myItem.lastName : blankPlaceHolder,
        email: myItem.email !== '' ? myItem.email : blankPlaceHolder,
        bio: myItem.bio !== '' ? myItem.bio : blankPlaceHolder,
        exerciseIdsJSON: JSON.stringify(myItem.exerciseIdsJSON),
        teamMateIdsJSON: JSON.stringify(myItem.teamMateIdsJSON),
        gymDayIdsJSON: JSON.stringify(myItem.gymDayIdsJSON),
        workoutIdsJSON: JSON.stringify(myItem.workoutIdsJSON),
        dataJSON: JSON.stringify(myItem.dataJSON),
        exerciseDaysJSON: JSON.stringify(myItem.exerciseDaysJSON),
        imageUrl: myItem.imageUrl !== '' ? myItem.imageUrl : blankPlaceHolder,
      };
      break;
    default:
  }
  let myReturnObject = { err: false, payload: '' };
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
        Authorization: myIdToken,
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
    };
    const data = await API.post(apiName, apiPath, apiRequest);
    myReturnObject.payload = data;
    return myReturnObject;
  } catch (err) {
    myReturnObject.err = true;
    myReturnObject.payload = (err as Error).message;
    return myReturnObject;
  }
};

export default putItemDynamoDB;
