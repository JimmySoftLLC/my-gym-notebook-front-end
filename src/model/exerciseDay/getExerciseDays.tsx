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

  if (!myExerciseDays.length) {
    // myExerciseDays.push({
    //   id: 'jbailey@jimmysoftllc.com2022-10-06',
    //   dataJSON: {
    //     '5c554f33-7503-43af-a857-b67902e25080': {
    //       actualData: ['W70/R12/REST20', 'W60/R12/REST20', 'W50/R12/REST20'],
    //       inDatabase: true,
    //     },
    //     '175d9882-7684-4bea-8f73-e69c15f7a25b': {
    //       actualData: ['W120/R12/REST20', 'W120/R12/REST20', 'W120/R12/REST20'],
    //       inDatabase: true,
    //     },
    //   },
    // });
  }

  const myGymMember = JSON.parse(JSON.stringify(gymMember));

  if (myExerciseDays.length) {
    setExerciseDay(myExerciseDays[0]);
    const exercisesPrevious = await getPreviousExercisesDayData(
      myGymMember,
      selectedDate,
      exercises
    );
    setExercisesPrevious(exercisesPrevious);
  } else {
    setExerciseDay({});
    setExercisesPrevious({});
  }
};

export default getExerciseDays;
