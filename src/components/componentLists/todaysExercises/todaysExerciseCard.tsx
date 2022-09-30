import React, { useState, useContext } from 'react';
import { Button, TextField } from '@material-ui/core';
import putExerciseDay from '../../../model/exerciseDay/putExerciseDay';
import DataAndMethodsContext from '../../../context/dataAndMethods/dataAndMethodsContext';
import putGymMember from '../../../model/gymMember/putGymMember';
import getExerciseDaysFromIds from '../../../model/exerciseDay/getExerciseDaysFromIds';
import sortExerciseDays from '../../../model/exerciseDay/sortExerciseDays';
import dateString from '../../../utilities/dateString';

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
  } = dataAndMethodsContext;

  const dataJSONString = changeToMultiline(Exercise.dataJSON);

  const [startEdit, setModeStartEdit] = useState(true);

  const minRows = Exercise.dataJSON.length;

  const changeActual = (e: any) => {
    const actualData = e.target.value.split(/\r?\n/);
    setExerciseDayItem(Exercise.id, 'actualData', actualData);
  };

  const changeNewGoal = (e: any) => {
    const newGoalData = e.target.value.split(/\r?\n/);
    setExerciseDayItem(Exercise.id, 'newGoalData', newGoalData);
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

  const handleCopyClick = () => {
    const newGoalData = actual.split(/\r?\n/);
    setExerciseDayItem(Exercise.id, 'newGoalData', newGoalData);
  };

  const handleDoneClick = async () => {
    setModeStartEdit(true);
    changeInDatabase(true);
    let newExerciseDay = JSON.parse(JSON.stringify(exerciseDay));
    if (newExerciseDay.id === undefined) {
      newExerciseDay.id =
        gymMember.id + dateString(selectedDate, selectedDate, 'dateAsId');
    }
    if (newExerciseDay.dataJSON === undefined) {
      newExerciseDay.dataJSON = {};
    }
    const actualData = actual.split(/\r?\n/);
    const newGoalData = newGoal.split(/\r?\n/);
    const exerciseResult = {
      actualData: actualData,
      newGoalData: newGoalData,
      inDatabase: inDatabase,
    };
    newExerciseDay.dataJSON[Exercise.id] = exerciseResult;
    putExerciseDay(newExerciseDay, idToken, customId);
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

  const getGoalValue = () => {
    if (exerciseDay.dataJSON !== undefined) {
      if (exerciseDay.dataJSON[Exercise.id] !== undefined) {
        if (exerciseDay.dataJSON[Exercise.id].newGoalData !== undefined) {
          return changeToMultiline(
            exerciseDay.dataJSON[Exercise.id].newGoalData
          );
        }
      }
    }
    return '';
  };

  const newGoal = getGoalValue();

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
          label='Goal'
          id='goal'
          type='text'
          multiline={true}
          minRows={minRows}
          value={dataJSONString}
          disabled={true}
        />
        <TextField
          label='Actual'
          id='actual'
          type='text'
          multiline={true}
          minRows={minRows}
          value={actual}
          onChange={changeActual}
          disabled={startEdit}
        />
        <TextField
          label='New Goal'
          id='newGoal'
          type='text'
          multiline={true}
          minRows={minRows}
          value={newGoal}
          onChange={changeNewGoal}
          disabled={startEdit}
        />
      </div>
    </>
  );
};

export default TodaysExercisesCard;
