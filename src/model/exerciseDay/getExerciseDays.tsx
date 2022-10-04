import dateString from '../../utilities/dateString';
import getPreviousExercisesDayData from './getPreviousExercisesDayData';
import getTodaysExercises from './getTodaysExercises';

const getExerciseDays = async (
  gymMember: any,
  getExerciseDaysFromIds: any,
  setExerciseDay: any,
  selectedDate: Date,
  exercises: any,
  setExercisesPrevious: any,
  gymDays: any,
  workouts: any
) => {
  const myExerciseDaysIds = [];
  myExerciseDaysIds.push(
    gymMember.id + dateString(selectedDate, selectedDate, 'dateAsId')
  );
  const myExerciseDays = await getExerciseDaysFromIds(myExerciseDaysIds);

  if (!myExerciseDays.length) {
    const currentExerciseIds = await getTodaysExercises(
      gymDays,
      selectedDate,
      workouts
    );
    const items: any = {};
    for (let i = 0; i < currentExerciseIds.length; i++) {
      items[currentExerciseIds[i]] = { actualData: [], inDatabase: true };
    }
    myExerciseDays.push([
      {
        id: 'jbailey@jimmysoftllc.com2022-10-03',
        dataJSON: items,
      },
    ]);
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
