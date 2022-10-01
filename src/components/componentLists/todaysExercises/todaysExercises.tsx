import React from 'react';
import ExerciseCardWorkout from './todaysExerciseCard';

const TodaysExercises = ({ todaysExercises }: any) => {
  return todaysExercises.map(
    (Exercise: {
      id: React.Key | null | undefined;
      key: React.Key | null | undefined;
    }) => (
      <ExerciseCardWorkout
        todaysExercises={todaysExercises}
        Exercise={Exercise}
        isInList={true}
        ExerciseId={Exercise.id}
        key={Exercise.id}
      />
    )
  );
};

export default TodaysExercises;
