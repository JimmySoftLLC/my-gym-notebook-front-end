import axios from 'axios';
import {
    lambdaFunctionURL,
    exercisesTableName,
    gymMembersTableName,
} from './apiConstants';

let scanDynamoDB = async (myTableName: any): Promise<any> => {
    let myReturnObject = { err: false, payload: "" };
    try {
        const res = await axios.post(
            lambdaFunctionURL,
            {
                myMethod: 'scan',
                myBody: {
                    TableName: myTableName,
                },
            },
            {
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json',
                },
            }
        );
        let myResData = res.data;

        switch (myTableName) {
            case exercisesTableName:
                for (let i = 0; i < myResData.Items.length; i++) {
                    myResData.Items[i].categoryJSON = JSON.parse(myResData.Items[i].categoryJSON)
                }
                myResData.Items.sort(function (a: any, b: any) {
                    return a.price - b.price;
                });
                myReturnObject.payload = myResData.Items
                return myReturnObject;
            // console.log(myReturnObject)

            case gymMembersTableName:
                return null;
            default:
        }
    } catch (err) {
        myReturnObject.err = true;
        myReturnObject.payload = (err as Error).message;
        return myReturnObject;
    }
};

export default scanDynamoDB