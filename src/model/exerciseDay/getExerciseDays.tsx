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
  const exerciseDaysId =
    gymMember.id + dateString(selectedDate, selectedDate, 'dateAsId');

  // get selected dates exerciseDays, array count will be 0 or 1
  const exerciseDaysIds = [];
  exerciseDaysIds.push(exerciseDaysId);
  const exerciseDays = await getExerciseDaysFromIds(exerciseDaysIds);

  // if exerciseDays.length is 0 then a new exercise day and populate with exerciseDays and newGymMember with temp exercise ids
  let newGymMember = JSON.parse(JSON.stringify(gymMember));
  if (!exerciseDays.length) {
    const currentExerciseIds = await getTodaysExercises(
      gymDays,
      selectedDate,
      workouts
    );
    const items: any = {};
    for (let i = 0; i < currentExerciseIds.length; i++) {
      items[currentExerciseIds[i]] = { actualData: [], inDatabase: false };
    }
    exerciseDays.push({
      id: gymMember.id + dateString(selectedDate, selectedDate, 'dateAsId'),
      dataJSON: items,
    });
    newGymMember.exerciseDaysJSON[
      dateString(selectedDate, selectedDate, 'dateAsId')
    ] = currentExerciseIds;
  }

  // get previous exercise days data
  if (exerciseDays.length) {
    setExerciseDay(exerciseDays[0]);
    const exercisesPrevious = await getPreviousExercisesDayData(
      newGymMember,
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
