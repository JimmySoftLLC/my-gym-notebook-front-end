import React from 'react';
import TodaysExercisesCard from './todaysExerciseCard';

const TodaysExercises = ({ workoutsExercises }: any) => {
  return workoutsExercises.map(
    (Exercise: {
      id: React.Key | null | undefined;
      key: React.Key | null | undefined;
    }) => (
      <TodaysExercisesCard
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
