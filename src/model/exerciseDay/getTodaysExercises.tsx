import validDate from '../../utilities/validDate';

const getTodaysExercises = async (
  gymDays: any,
  selectedDate: Date,
  workouts: any
) => {
  // get gym day
  let todaysGymDay: any = [];
  for (let j = 0; j < gymDays.length; j++) {
    if (
      validDate(
        gymDays[j].dateFrom,
        gymDays[j].dateTo,
        selectedDate,
        gymDays[j].dayJSON
      )
    ) {
      todaysGymDay.push(gymDays[j]);
    }
  }

  // get workouts
  let todaysWorkouts = [];
  for (let j = 0; j < todaysGymDay.length; j++) {
    for (let k = 0; k < todaysGymDay[j].workoutIdsJSON.length; k++) {
      todaysWorkouts.push(
        workouts.filter((e: any) => e.id === todaysGymDay[j].workoutIdsJSON[k])
      );
    }
  }

  //get exercise ids
  let todaysExercises: any[] = [];
  for (let j = 0; j < todaysWorkouts.length; j++) {
    const myObject = todaysWorkouts[j];
    for (let k = 0; k < myObject.length; k++) {
      for (let l = 0; l < myObject[k].exerciseIdsJSON.length; l++) {
        todaysExercises.push(myObject[k].exerciseIdsJSON[l]);
      }
    }
  }

  return todaysExercises;
};

export default getTodaysExercises;
