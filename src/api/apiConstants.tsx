export const exercisesTableName = 'exercises';
export const gymMembersTableName = 'gymMembers';
export const gymDaysTableName = 'gymDays';
export const workoutsTableName = 'workouts';
export const exerciseDaysTableName = 'exerciseDays';
export const lambdaFunctionURL =
  'https://kd7snpev85.execute-api.us-east-1.amazonaws.com/default/i_want_to_dine_api';
export const apiName = 'i_want_to_dine_restaurant_api';
export const apiNameNoToken = 'i_want_to_dine_api';
export const apiPath = '/';
export const projectionExpressionGymMember =
  'id,bio,dataJSON,email,exerciseIdsJSON,firstName,gymDayIdsJSON,imageUrl,lastName,teamMateIdsJSON,workoutIdsJSON';
export const projectionExpressionExercise =
  'id,categoryJSON,dataJSON,title, videoUrl';
export const projectionExpressionGymDay =
  'id,title,dateFrom,dateTo,dayJSON,workoutIdsJSON';
export const projectionExpressionWorkout = 'id,title,exerciseIdsJSON';
export const projectionExpressionExerciseDays = 'id,dataJSON';
export const blankPlaceHolder = String.fromCharCode(30);
export const imagePath = 'https://iwanttodine.s3.amazonaws.com/public/';
export const blankImage =
  'https://iwanttodine.s3.amazonaws.com/public/blank.jpg';
export const websiteName = 'myGymNotebook';
