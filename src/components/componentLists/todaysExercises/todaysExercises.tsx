import React from 'react';
import ExerciseCardWorkout from './todaysExerciseCard';

const TodaysExercises = ({ workoutsExercises }: any) => {
  return workoutsExercises.map(
    (Exercise: {
      id: React.Key | null | undefined;
      key: React.Key | null | undefined;
    }) => (
      <ExerciseCardWorkout
        workoutsExercises={workoutsExercises}
        Exercise={Exercise}
        isInList={true}
        ExerciseId={Exercise.id}
        key={Exercise.id}
      />
    )
  );
};

export default TodaysExercises;
