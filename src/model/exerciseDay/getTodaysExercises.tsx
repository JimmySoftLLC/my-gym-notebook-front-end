import validDate from '../../utilities/validDate';

const getTodaysExercises = async (
  gymDays: any,
  selectedDate: Date,
  exercises: any
) => {
  let todaysWorkouts = [];
  for (let j = 0; j < gymDays.length; j++) {
    if (
      validDate(
        gymDays[j].dateFrom,
        gymDays[j].dateTo,
        selectedDate,
        gymDays[j].dayJSON
      )
    ) {
      todaysWorkouts.push(gymDays[j]);
    }
  }

  let exerciseIdsJSON: any[] = [];
  for (let j = 0; j < todaysWorkouts.length; j++) {
    for (let k = 0; k < todaysWorkouts[j].exerciseIdsJSON.length; k++) {
      exerciseIdsJSON.push(todaysWorkouts[j].exerciseIdsJSON[k]);
    }
  }

  let todaysExercises: any[] = [];

  for (let j = 0; j < exercises.length; j++) {
    for (let k = 0; k < exerciseIdsJSON.length; k++) {
      if (exercises[j].id === exerciseIdsJSON[k].toString()) {
        let exercise = JSON.parse(JSON.stringify(exercises[j]));
        exercise.key = exercise.id + k;
        todaysExercises.push(exercise);
      }
    }
  }

  return todaysExercises;
};

export default getTodaysExercises;
