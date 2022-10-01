import dateString from './dateString';

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
  } else {
    setExerciseDay({});
  }
};

export default getExerciseDays;
