import React, { useState, useContext } from 'react';
import { Button, TextField } from '@material-ui/core';
import putExerciseDay from '../../../model/exerciseDay/putExerciseDay';
import DataAndMethodsContext from '../../../context/dataAndMethods/dataAndMethodsContext';
import dateString from '../../../utilities/dateString';
import putGymMember from '../../../model/gymMember/putGymMember';
import changeToMultiline from '../../../utilities/changeToMultiline';

const TodaysExercisesCard = ({ Exercise, todaysExercises }: any) => {
  const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
  const {
    idToken,
    customId,
    gymMember,
    selectedDate,
    exerciseDay,
    setExerciseDayItem,
    setGymMember,
    exercisesPrevious,
  } = dataAndMethodsContext;

  const getPreviousActualValue = () => {
    if (exercisesPrevious[Exercise.id] !== undefined) {
      return changeToMultiline(exercisesPrevious[Exercise.id].actualData);
    }
    return '';
  };

  const dataJSONString = getPreviousActualValue();

  const [startEdit, setModeStartEdit] = useState(true);

  const minRows = Exercise.dataJSON.length;

  const exerciseDateString = dateString(selectedDate, selectedDate, 'dateAsId');

  const changeActual = (e: any) => {
    const actualData = e.target.value.split(/\r?\n/);
    setExerciseDayItem(Exercise.id, 'actualData', actualData);
  };

  const changeInDatabase = (inDB: any) => {
    const newGoalData = inDB;
    setExerciseDayItem(Exercise.id, 'inDatabase', newGoalData);
  };

  const handleStartClick = async () => {
    setModeStartEdit(false);
    if (actual === '') {
      const actualData = dataJSONString.split(/\r?\n/);
      setExerciseDayItem(Exercise.id, 'actualData', actualData);
    }
  };

  const handleCopyClick = () => {
    const actualData = dataJSONString.split(/\r?\n/);
    setExerciseDayItem(Exercise.id, 'actualData', actualData);
  };

  const handleDoneClick = async () => {
    setModeStartEdit(true);
    changeInDatabase(true);

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
    let newGymMember = JSON.parse(JSON.stringify(gymMember));
    if (newGymMember.exerciseDaysJSON[exerciseDateString] === undefined) {
      const currentExerciseIds = [];
      for (let i = 0; i < todaysExercises.length; i++) {
        currentExerciseIds.push(todaysExercises[i].id);
      }
      newGymMember.exerciseDaysJSON[exerciseDateString] = currentExerciseIds;
      await putGymMember(newGymMember, idToken, customId);
      setGymMember(newGymMember);
    } else {
      const currentExerciseIds =
        newGymMember.exerciseDaysJSON[exerciseDateString];
      let overWriteGymMember = false;
      for (let i = 0; i < todaysExercises.length; i++) {
        if (
          currentExerciseIds.findIndex(
            (x: string) => x === todaysExercises[i].id
          ) === -1
        ) {
          overWriteGymMember = true;
          currentExerciseIds.push(todaysExercises[i].id);
        }
      }
      if (overWriteGymMember) {
        await putGymMember(newGymMember, idToken, customId);
        setGymMember(newGymMember);
      }
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
          onClick={() => handleCopyClick()}
        >
          <i className='fas fa-copy'></i>
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
