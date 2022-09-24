import { API } from 'aws-amplify';
import { apiName, apiPath } from './apiConstants';

let s3DeleteObject = async (
  key: any,
  myIdToken: any,
  myCustomId: any
): Promise<any> => {
  let myReturnObject = { err: false, payload: '' };
  try {
    const apiRequest = {
      body: {
        myMethod: 's3DeleteObject',
        myBody: {
          Bucket: 'iwanttodine',
          Key: 'public/' + key,
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

export default s3DeleteObject;
