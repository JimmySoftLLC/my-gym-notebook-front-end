import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';

const TodaysExercisesCard = ({ Exercise }: any) => {
  const changeToMultiline = (items: string[]) => {
    const dataJSONString = items
      .map(function (item: string) {
        return item;
      })
      .join('\n');
    return dataJSONString;
  };

  const dataJSONString = changeToMultiline(Exercise.dataJSON);

  const [startEdit, setModeStartEdit] = useState(true);
  const [inDatabase, setInDatabase] = useState(false);
  const [actual, setActual] = useState('');
  const [newGoal, setNewGoal] = useState('');

  const minRows = Exercise.dataJSON.length;

  const changeActual = (e: any) => {
    setActual(e.target.value);
    //const changedData = e.target.value.split(/\r?\n/);
  };

  const changeNewGoal = (e: any) => {
    setNewGoal(e.target.value);
    //const changedData = e.target.value.split(/\r?\n/);
  };

  const handleStartClick = () => {
    setModeStartEdit(false);
    if (actual === '') setActual(dataJSONString);
  };

  const handleCopyClick = () => {
    setNewGoal(actual);
  };

  const handleDoneClick = () => {
    setModeStartEdit(true);
    setInDatabase(true);
  };

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
