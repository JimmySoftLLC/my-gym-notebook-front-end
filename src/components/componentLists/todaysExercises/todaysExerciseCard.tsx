import React, { useState, useContext } from 'react';
import { Button, TextField } from '@material-ui/core';
import putExerciseDay from '../../../model/exerciseDay/putExerciseDay';
import DataAndMethodsContext from '../../../context/dataAndMethods/dataAndMethodsContext';
import dateString from '../../../utilities/dateString';
import putGymMember from '../../../model/gymMember/putGymMember';

const TodaysExercisesCard = ({ Exercise }: any) => {
  const changeToMultiline = (items: string[]) => {
    const dataJSONString = items
      .map(function (item: string) {
        return item;
      })
      .join('\n');
    return dataJSONString;
  };

  const dataAndMethodsContext: any = useContext(DataAndMethodsContext);

  const {
    idToken,
    customId,
    gymMember,
    selectedDate,
    exerciseDay,
    setExerciseDayItem,
    exercises,
    setGymMember,
  } = dataAndMethodsContext;

  const dataJSONString = changeToMultiline(Exercise.dataJSON);

  const [startEdit, setModeStartEdit] = useState(true);

  const minRows = Exercise.dataJSON.length;

  const changeActual = (e: any) => {
    const actualData = e.target.value.split(/\r?\n/);
    setExerciseDayItem(Exercise.id, 'actualData', actualData);
  };

  const changeInDatabase = (inDB: any) => {
    const newGoalData = inDB;
    setExerciseDayItem(Exercise.id, 'inDatabase', newGoalData);
  };

  const handleStartClick = () => {
    setModeStartEdit(false);
    if (actual === '') {
      const actualData = dataJSONString.split(/\r?\n/);
      setExerciseDayItem(Exercise.id, 'actualData', actualData);
    }
  };

  const handleDoneClick = async () => {
    setModeStartEdit(true);
    changeInDatabase(true);
    const exerciseDateString = dateString(
      selectedDate,
      selectedDate,
      'dateAsId'
    );
    let newExerciseDay = JSON.parse(JSON.stringify(exerciseDay));
    if (newExerciseDay.id === undefined) {
      newExerciseDay.id = gymMember.id + exerciseDateString;
    }
    if (newExerciseDay.dataJSON === undefined) {
      newExerciseDay.dataJSON = {};
    }
    const actualData = actual.split(/\r?\n/);
    const exerciseResult = {
      actualData: actualData,
      inDatabase: inDatabase,
    };
    newExerciseDay.dataJSON[Exercise.id] = exerciseResult;
    putExerciseDay(newExerciseDay, idToken, customId);
    if (gymMember.exerciseDaysJSON[exerciseDateString] === undefined) {
      let newGymMember = JSON.parse(JSON.stringify(gymMember));
      const myIds = [];
      for (let i = 0; i < exercises.length; i++) {
        myIds.push(exercises[i].id);
      }
      newGymMember.exerciseDaysJSON[exerciseDateString] = myIds;
      await putGymMember(newGymMember, idToken, customId);
      setGymMember(newGymMember);
      console.log(newGymMember);
    }
  };

  const getActualValue = () => {
    if (exerciseDay.dataJSON !== undefined) {
      if (exerciseDay.dataJSON[Exercise.id] !== undefined) {
        if (exerciseDay.dataJSON[Exercise.id].actualData !== undefined) {
          return changeToMultiline(
            exerciseDay.dataJSON[Exercise.id].actualData
          );
        }
      }
    }
    return '';
  };

  const actual = getActualValue();

  const getInDatabase = () => {
    if (exerciseDay.dataJSON !== undefined) {
      if (exerciseDay.dataJSON[Exercise.id] !== undefined) {
        if (exerciseDay.dataJSON[Exercise.id].inDatabase !== undefined) {
          return true;
        }
      }
    }
    return false;
  };

  const inDatabase = getInDatabase();

  return (
    <>
      <h5>
        {Exercise.title}
        <span className='mx-1'></span>
        <Button
          disabled={!startEdit}
          variant='outlined'
          color='primary'
          onClick={() => handleStartClick()}
        >
          {!inDatabase && <i className='fas fa-play'></i>}
          {inDatabase && <i className='fas fa-edit'></i>}
        </Button>
        <Button
          disabled={startEdit}
          variant='outlined'
          color='primary'
          onClick={() => handleDoneClick()}
        >
          <i className='fas fa-check'></i>
        </Button>
      </h5>
      <div>
        <TextField
          label='Previous'
          id='previous'
          type='text'
          multiline={true}
          minRows={minRows}
          value={dataJSONString}
          disabled={true}
        />
        <TextField
          label='Current'
          id='current'
          type='text'
          multiline={true}
          minRows={minRows}
          value={actual}
          onChange={changeActual}
          disabled={startEdit}
        />
      </div>
    </>
  );
};

export default TodaysExercisesCard;
