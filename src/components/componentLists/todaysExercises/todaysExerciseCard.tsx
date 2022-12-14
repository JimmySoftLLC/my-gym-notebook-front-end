import React, { useState, useContext } from 'react';
import { Button, TextField } from '@material-ui/core';
import putExerciseDay from '../../../model/exerciseDay/putExerciseDay';
import DataAndMethodsContext from '../../../context/dataAndMethods/dataAndMethodsContext';
import dateString from '../../../utilities/dateString';
import putGymMember from '../../../model/gymMember/putGymMember';
import changeToMultiline from '../../../utilities/changeToMultiline';
import getTodaysExercises from '../../../model/exerciseDay/getTodaysExercises';
import convertToActualObject from '../../../utilities/convertToActualObject';
import convertToActualData from '../../../utilities/convertToActualData';
import VideoEmbed from '../../VideoEmbed';

const TodaysExercisesCard = ({ Exercise }: any) => {
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
    gymDays,
    workouts,
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

  const changeActual = (e: any, i: any) => {
    let changedActualData = JSON.parse(JSON.stringify(actualObject));
    changedActualData.values[i] = e.target.value;
    changedActualData = convertToActualData(changedActualData);
    setExerciseDayItem(Exercise.id, 'actualData', changedActualData);
  };

  const changeInDatabase = (inDB: any) => {
    const newGoalData = inDB;
    setExerciseDayItem(Exercise.id, 'inDatabase', newGoalData);
  };

  const handleStartClick = async () => {
    setModeStartEdit(false);
    if (values.length === 0) {
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
    const exerciseResult = {
      actualData: exerciseDay.dataJSON[Exercise.id].actualData,
      inDatabase: inDatabase,
    };
    newExerciseDay.dataJSON[Exercise.id] = exerciseResult;
    putExerciseDay(newExerciseDay, idToken, customId);
    let newGymMember = JSON.parse(JSON.stringify(gymMember));
    if (newGymMember.exerciseDaysJSON[exerciseDateString] === undefined) {
      const currentExerciseIds = await getTodaysExercises(
        gymDays,
        selectedDate,
        workouts
      );
      newGymMember.exerciseDaysJSON[exerciseDateString] = currentExerciseIds;
      await putGymMember(newGymMember, idToken, customId);
      setGymMember(newGymMember);
    }
  };

  const getActualObject = (): { labels: any[]; values: any[] } => {
    if (exerciseDay.dataJSON !== undefined) {
      if (exerciseDay.dataJSON[Exercise.id] !== undefined) {
        if (exerciseDay.dataJSON[Exercise.id].actualData !== undefined) {
          return convertToActualObject(
            exerciseDay.dataJSON[Exercise.id].actualData
          );
        }
      }
    }
    return { labels: [], values: [] };
  };

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

  const actualObject = getActualObject();

  const labels: any = actualObject.labels;

  const values: any = actualObject.values;

  const inDatabase = getInDatabase();

  return (
    <>
      <h5>{Exercise.title}</h5>
      <h5>
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
          style={{ width: 50 }}
        >
          <i className='fas fa-copy'></i>
        </Button>
        <Button
          disabled={startEdit}
          variant='outlined'
          color='primary'
          onClick={() => handleDoneClick()}
          style={{ width: 50 }}
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
        {values.map((number: number, i: number) => (
          <TextField
            key={i}
            label={labels[i]}
            id={'current'}
            type='text'
            multiline={true}
            minRows={minRows}
            value={number}
            onChange={(e) => changeActual(e, i)}
            disabled={startEdit}
            style={{ width: 50 }}
          />
        ))}
        <VideoEmbed embedId={Exercise.videoUrl} />
      </div>
    </>
  );
};

export default TodaysExercisesCard;
