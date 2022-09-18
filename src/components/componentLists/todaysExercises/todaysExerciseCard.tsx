import React, { useState } from 'react';
import { TextField } from '@material-ui/core';

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

  const [count, setCount] = useState(changeToMultiline(Exercise.dataJSON));

  const minRows = Exercise.dataJSON.length;

  const changeData = (e: any) => {
    setCount(e.target.value);
    //const changedData = e.target.value.split(/\r?\n/);
  };

  return (
    <>
      <h5>{Exercise.title}</h5>
      <div>
        <TextField
          label='Goal'
          id='data'
          type='text'
          multiline={true}
          minRows={minRows}
          value={dataJSONString}
          disabled={true}
        />
        <TextField
          label='Actual'
          id='data'
          type='text'
          multiline={true}
          minRows={minRows}
          value={count}
          onChange={changeData}
        />
      </div>
    </>
  );
};

export default TodaysExercisesCard;
