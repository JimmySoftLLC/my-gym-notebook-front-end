import batchGetItemDynamoDB from '../../api/batchGetItemDynamoDB';

import {
  workoutsTableName,
  projectionExpressionExerciseDays,
  blankPlaceHolder,
} from '../../api/apiConstants';

const getBatch = async (myIds: any) => {
  let myExerciseDays = [];
  const data = await batchGetItemDynamoDB(
    workoutsTableName,
    myIds,
    projectionExpressionExerciseDays
  );
  if (data.err) {
    return [];
  }

  myExerciseDays = data.payload.Responses.workouts;
  for (let i = 0; i < myExerciseDays.length; i++) {
    myExerciseDays[i].title =
      myExerciseDays[i].title === blankPlaceHolder
        ? ''
        : myExerciseDays[i].title;
    myExerciseDays[i].exerciseIdsJSON = JSON.parse(
      myExerciseDays[i].exerciseIdsJSON
    );
  }

  return myExerciseDays;
};

const getExerciseDaysFromIds = async (ExerciseDaysIds: any) => {
  if (ExerciseDaysIds.length === 0) {
    return [];
  }
  // console.log(restaurant);
  let myExerciseDays: any = [];

  // get records in batches of 100
  let myIds = [];
  let currentIndex = 0;
  let nextIndex = 0;
  for (let i = 0; i < ExerciseDaysIds.length; i++) {
    myIds.push(ExerciseDaysIds[i]);
    currentIndex++;
    if (currentIndex > 99) {
      const myBatch = await getBatch(myIds);
      myIds = [];
      currentIndex = 0;
      myExerciseDays = myExerciseDays.concat(myBatch);
      nextIndex = i + 1;
    }
  }

  // get any leftover records
  myIds = [];
  for (let i = nextIndex; i < ExerciseDaysIds.length; i++) {
    myIds.push(ExerciseDaysIds[i]);
  }
  const myBatch = await getBatch(myIds);
  myExerciseDays = myExerciseDays.concat(myBatch);

  return myExerciseDays;
};

export default getExerciseDaysFromIds;
