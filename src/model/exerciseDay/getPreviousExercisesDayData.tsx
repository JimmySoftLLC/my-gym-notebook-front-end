import dateString from '../../utilities/dateString';
import getExerciseDaysFromIds from './getExerciseDaysFromIds';

const getPreviousExercisesDayData = async (
  gymMember: any,
  selectedDate: any,
  exercises: any
) => {
  const getExerciseIds = (dateId: string) => {
    if (gymMember.exerciseDaysJSON !== undefined) {
      if (gymMember.exerciseDaysJSON[dateId] !== undefined) {
        return gymMember.exerciseDaysJSON[dateId];
      }
    }
    return [];
  };

  const getGymMemberDateIds = () => {
    if (gymMember.exerciseDaysJSON !== undefined) {
      return Object.keys(gymMember.exerciseDaysJSON);
    }
    return [];
  };

  const selectedDateId = dateString(selectedDate, selectedDate, 'dateAsId');

  // array of exercise ids used to search previous results
  let todaysExerciseIds = getExerciseIds(selectedDateId);

  // get gymMember list of previous exercise days
  const gymMemberDateIds = getGymMemberDateIds();
  gymMemberDateIds.sort();
  gymMemberDateIds.reverse();
  const start =
    gymMemberDateIds.findIndex((item) => item === selectedDateId) + 1;

  // gather previous results by going back in time
  const exerciseDaysIds: string[] = [];
  for (let i = start; i < gymMemberDateIds.length; i++) {
    if (todaysExerciseIds.length) {
      const previousExerciseIds = getExerciseIds(gymMemberDateIds[i]);
      const matchingExerciseIds = todaysExerciseIds.filter((ai: any) =>
        previousExerciseIds.includes(ai)
      );

      // using the matches get the exercise day ids that will be used later
      if (matchingExerciseIds.length)
        exerciseDaysIds.push(gymMember.id + gymMemberDateIds[i]);

      // now filter the list to whats not found for this loop,
      // after all looping whatever is left will be used later.
      todaysExerciseIds = todaysExerciseIds.filter(
        (ai: any) => !matchingExerciseIds.includes(ai)
      );
    }
  }

  // first populate exercisePrevious using exerciseDaysIds
  let exercisePrevious = {};
  const myExerciseDays = await getExerciseDaysFromIds(exerciseDaysIds);
  for (let i = 0; i < myExerciseDays.length; i++) {
    exercisePrevious = Object.assign(
      exercisePrevious,
      myExerciseDays[i].dataJSON
    );
  }

  // second populate exercisePrevious using remaining todaysExerciseIds
  for (let i = 0; i < todaysExerciseIds.length; i++) {
    const course = {
      [todaysExerciseIds[i]]: { test: 'results' },
    };
    exercisePrevious = Object.assign(exercisePrevious, course);
  }

  console.log(exercisePrevious);

  return gymMemberDateIds;
};

export default getPreviousExercisesDayData;
