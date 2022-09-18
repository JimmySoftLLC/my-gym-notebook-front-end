import React from 'react';
import ExerciseCardWorkout from './todaysExerciseCard';

const TodaysExercises = ({ exercises }: any) => {
  return exercises.map(
    (Exercise: {
      id: React.Key | null | undefined;
      key: React.Key | null | undefined;
    }) => (
      <ExerciseCardWorkout
        Exercise={Exercise}
        isInList={true}
        ExerciseId={Exercise.id}
        key={Exercise.id}
      />
    )
  );
};

export default TodaysExercises;
