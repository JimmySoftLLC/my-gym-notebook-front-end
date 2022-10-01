import dateString from '../../utilities/dateString';

const getPreviousExercisesDayData = async (
  gymMember: any,
  myExerciseDay: any,
  selectedDate: any
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

  // gather previous results by going back in time, if not found use exercise parameters
  for (let i = start; i < gymMemberDateIds.length; i++) {
    if (todaysExerciseIds.length) {
      const previousExerciseIds = getExerciseIds(gymMemberDateIds[i]);
      const matchingExerciseIds = todaysExerciseIds.filter((ai: any) =>
        previousExerciseIds.includes(ai)
      );
      // now reduce the list to whats not found
      todaysExerciseIds = todaysExerciseIds.filter(
        (ai: any) => !matchingExerciseIds.includes(ai)
      );
    }
  }

  console.log(todaysExerciseIds);

  return gymMemberDateIds;
};

export default getPreviousExercisesDayData;
