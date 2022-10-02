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
  let notFoundExerciseIds = getExerciseIds(selectedDateId);

  // get gymMember list of all exercise days
  const gymMemberDateIds = getGymMemberDateIds();
  gymMemberDateIds.sort();
  gymMemberDateIds.reverse();
  const start =
    gymMemberDateIds.findIndex((item) => item === selectedDateId) + 1;

  // gather previous results by going back in time
  const foundExerciseDaysIds: string[] = [];
  for (let i = start; i < gymMemberDateIds.length; i++) {
    if (notFoundExerciseIds.length) {
      const previousExerciseIds = getExerciseIds(gymMemberDateIds[i]);
      const matchingExerciseIds = notFoundExerciseIds.filter((item: any) =>
        previousExerciseIds.includes(item)
      );

      if (matchingExerciseIds.length)
        foundExerciseDaysIds.push(gymMember.id + gymMemberDateIds[i]);

      notFoundExerciseIds = notFoundExerciseIds.filter(
        (item: any) => !matchingExerciseIds.includes(item)
      );
    }
  }

  // populate exercisesPrevious using foundExerciseDaysIds
  let exercisesPrevious = {};
  const myExerciseDays = await getExerciseDaysFromIds(foundExerciseDaysIds);
  for (let i = 0; i < myExerciseDays.length; i++) {
    exercisesPrevious = Object.assign(
      exercisesPrevious,
      myExerciseDays[i].dataJSON
    );
  }

  // map exercises for easy searching later
  const mapOfExercises: any = {};
  for (let i = 0; i < exercises.length; i++) {
    mapOfExercises[exercises[i].id] = exercises[i].dataJSON;
  }

  // continue to populate exercisesPrevious using notFoundExerciseIds
  for (let i = 0; i < notFoundExerciseIds.length; i++) {
    const actualData = mapOfExercises[notFoundExerciseIds[i]];
    const exerciseToAdd = {
      [notFoundExerciseIds[i]]: { actualData: actualData, inDatabase: true },
    };
    exercisesPrevious = Object.assign(exercisesPrevious, exerciseToAdd);
  }

  return exercisesPrevious;
};

export default getPreviousExercisesDayData;
