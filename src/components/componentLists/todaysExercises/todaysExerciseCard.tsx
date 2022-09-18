import React from 'react';
import { TextField } from '@material-ui/core';

const TodaysExercisesCard = ({ Exercise }: any) => {

    const dataJSONString = Exercise.dataJSON.map(function (item: string) {
        return item;
    }).join("\n");

    return (
        <div className='list'>
            <h5>
                {Exercise.title}
                <TextField
                    id="data"
                    type="text"
                    fullWidth
                    multiline={true}
                    minRows="3"
                    value={dataJSONString}
                />
            </h5>
        </div>
    );
};

export default TodaysExercisesCard;