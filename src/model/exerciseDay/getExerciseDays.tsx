import dateString from '../../utilities/dateString';
import getPreviousExercisesDayData from './getPreviousExercisesDayData';

const getExerciseDays = async (
  gymMember: any,
  getExerciseDaysFromIds: any,
  setExerciseDay: any,
  selectedDate: Date,
  exercises: any,
  setExercisesPrevious: any
) => {
  const myExerciseDaysIds = [];
  myExerciseDaysIds.push(
    gymMember.id + dateString(selectedDate, selectedDate, 'dateAsId')
  );
  const myExerciseDays = await getExerciseDaysFromIds(myExerciseDaysIds);

  let newWorkoutData = undefined;
  // if (
  //   gymMember.exerciseDaysJSON[
  //     dateString(selectedDate, selectedDate, 'dateAsId')
  //   ] === undefined
  // ) {
  //   const example = {
  //     '5c554f33-7503-43af-a857-b67902e25080': {
  //       actualData: ['1/1'],
  //       inDatabase: true,
  //     },
  //     '175d9882-7684-4bea-8f73-e69c15f7a25b': {
  //       actualData: ['1/1'],
  //       inDatabase: true,
  //     },
  //   };
  //   newWorkoutData = {
  //     id:
  //       'jbailey@jimmysoftllc.com' +
  //       dateString(selectedDate, selectedDate, 'dateAsId'),
  //     dataJSON: example,
  //   };
  // }
  // console.log(newWorkoutData);

  if (myExerciseDays.length) {
    setExerciseDay(myExerciseDays[0]);
    const exercisesPrevious = await getPreviousExercisesDayData(
      gymMember,
      selectedDate,
      exercises,
      newWorkoutData
    );
    setExercisesPrevious(exercisesPrevious);
  } else {
    setExerciseDay({});
    setExercisesPrevious({});
  }
};

export default getExerciseDays;
