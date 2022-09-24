import deleteItemDynamoDB from '../../api/deleteItemDynamoDB';
import { exerciseDaysTableName } from '../../api/apiConstants';

const deleteExerciseDay = async (
  myExerciseDayId: any,
  myToken: any,
  myCustomId: any
) => {
  const data = await deleteItemDynamoDB(
    exerciseDaysTableName,
    myExerciseDayId,
    myToken,
    myCustomId
  );
  if (data.err) {
    return null;
  }
  return data;
};

export default deleteExerciseDay;
