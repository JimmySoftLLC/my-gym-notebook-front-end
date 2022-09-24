import putItemDynamoDB from '../../api/putItemDynamoDB';
import { gymMembersTableName } from '../../api/apiConstants';

const putGymMember = async (
  myGymMember: any,
  myToken: any,
  myCustomId: any
) => {
  const myNewGymMember = JSON.parse(JSON.stringify(myGymMember));
  const data = await putItemDynamoDB(
    gymMembersTableName,
    myNewGymMember,
    myToken,
    myCustomId
  );
  if (data.err) {
    return null;
  }
  return data;
};

export default putGymMember;
