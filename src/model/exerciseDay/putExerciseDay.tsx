import putItemDynamoDB from '../../api/putItemDynamoDB';
import { exerciseDaysTableName } from '../../api/apiConstants';

const putExerciseDay = async (
  myExerciseDay: any,
  myToken: any,
  myCustomId: any
) => {
  const data = await putItemDynamoDB(
    exerciseDaysTableName,
    myExerciseDay,
    myToken,
    myCustomId
  );
  if (data.err) {
    return null;
  }
  return data;
};

export default putExerciseDay;
