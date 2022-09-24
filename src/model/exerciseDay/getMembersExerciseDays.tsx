import getExerciseDaysFromIds from './getExerciseDaysFromIds';

const getMembersExerciseDays = async (gymMember: any) => {
  let workoutItemIds = [];

  for (let k = 0; k < gymMember.workoutIdsJSON.length; k++) {
    workoutItemIds.push(gymMember.workoutIdsJSON[k]);
  }
  const ExerciseDays = await getExerciseDaysFromIds(workoutItemIds);

  return ExerciseDays;
};

export default getMembersExerciseDays;
