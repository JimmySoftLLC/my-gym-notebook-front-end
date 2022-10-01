import dateString from '../../utilities/dateString';
import getPreviousExercisesDayData from './getPreviousExercisesDayData';

const getExerciseDays = async (
  gymMember: { id: any },
  getExerciseDaysFromIds: (arg0: any[]) => any,
  setExerciseDay: (arg0: {}) => void,
  selectedDate: Date
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
      myExerciseDays[0],
      selectedDate
    );
  } else {
    setExerciseDay({});
  }
};

export default getExerciseDays;
