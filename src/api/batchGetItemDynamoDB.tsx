import axios from 'axios';
import { lambdaFunctionURL } from './apiConstants';

const batchGetItemDynamoDB = async (
  myTableName: string,
  myIds: any,
  projectionExpression: any
): Promise<any> => {
  let myKeys = [];
  for (let i = 0; i < myIds.length; i++) {
    myKeys.push({ id: myIds[i] });
  }
  let myReturnObject = { err: false, payload: '' };
  try {
    const res = await axios.post(
      lambdaFunctionURL,
      {
        myMethod: 'batchGet',
        myBody: {
          RequestItems: {
            [myTableName]: {
              Keys: myKeys,
              ProjectionExpression: projectionExpression,
            },
          },
        },
      },
      {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      }
    );
    myReturnObject.payload = res.data;
    return myReturnObject;
  } catch (err) {
    myReturnObject.err = true;
    myReturnObject.payload = (err as Error).message;
    return myReturnObject;
  }
};

export default batchGetItemDynamoDB;
