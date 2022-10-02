import dateString from '../../utilities/dateString';
import getPreviousExercisesDayData from './getPreviousExercisesDayData';

const getExerciseDays = async (
  gymMember: any,
  getExerciseDaysFromIds: any,
  setExerciseDay: any,
  selectedDate: Date,
  exercises: any
) => {
  const myExerciseDaysIds = [];
  myExerciseDaysIds.push(
    gymMember.id + dateString(selectedDate, selectedDate, 'dateAsId')
  );
  const myExerciseDays = await getExerciseDaysFromIds(myExerciseDaysIds);
  if (myExerciseDays.length) {
    setExerciseDay(myExerciseDays[0]);
    const myResult = await getPreviousExercisesDayData(
      gymMember,
      selectedDate,
      exercises
    );
  } else {
    setExerciseDay({});
  }
};

export default getExerciseDays;
