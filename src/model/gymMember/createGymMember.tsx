import putItemDynamoDB from '../../api/putItemDynamoDB';
import { gymMembersTableName } from '../../api/apiConstants';

const createGymMember = async (
  myEmailId: any,
  myToken: any,
  myCustomId: any
) => {
  let myGymMember = {
    id: myEmailId,
    firstName: '',
    lastName: '',
    bio: '',
    email: myEmailId,
    imageUrl: '',
    exerciseIdsJSON: [],
    gymDayIdsJSON: [],
    workoutIdsJSON: [],
    teamMateIdsJSON: [],
    dataJSON: [],
    exerciseDaysJSON: [],
  };
  const data = await putItemDynamoDB(
    gymMembersTableName,
    myGymMember,
    myToken,
    myCustomId
  );
  if (data.err) {
    return null;
  }
  return myGymMember;
};

export default createGymMember;
