import React, { Fragment, useContext } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import { Tooltip } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';

const SignedInTopToolBar = () => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        setExerciseItemDialogData,
        setExerciseItemDialogOpen,
        restaurantId,
        myStates,
        setWorkoutDialogData,
        setWorkoutDialogOpen,
        setGymDayDialogData,
        setGymDayDialogOpen,
    } = dataAndMethodsContext;

    const newExerciseItemClick = () => {
        let myNewId = uuidv4()
        let myEditItem = {
            id: myNewId,
            title: '',
            description: '',
            categoryJSON: [],
            price: 0,
            restaurantId: restaurantId,
            dialogType: "Add",
        }
        setExerciseItemDialogData(myEditItem);
        setExerciseItemDialogOpen(true);
    };

    const newWorkoutClick = () => {
        let myNewId = uuidv4()
        let myEditItem = {
            id: myNewId,
            title: '',
            dateFrom: new Date(),
            dateTo: new Date(),
            description: '',
            exerciseItemIdsJSON: [],
            dialogType: "Add",
        }
        setWorkoutDialogData(myEditItem);
        setWorkoutDialogOpen(true);
    };

    const newGymDayClick = () => {
        let myNewId = uuidv4()
        let myEditItem = {
            id: myNewId,
            title: '',
            dateFrom: new Date(),
            dateTo: new Date(),
            description: '',
            exerciseItemIdsJSON: [],
            dialogType: "Add",
        }
        setGymDayDialogData(myEditItem);
        setGymDayDialogOpen(true);
    };

    return (
        <Fragment>
            <Toolbar>
                <div >
                    <Tooltip title="Exercise settings">
                        <IconButton aria-label=""
                            color={myStates['exerciseSettings'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setMyState('exerciseSettings')}>
                            <i className="icon-book-cog"></i>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Workout settings">
                        <IconButton aria-label=""
                            color={myStates['workoutSettings'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setMyState('workoutSettings')}>
                            <i className="icon-calendar-cog"></i>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Gym day settings">
                        <IconButton aria-label=""
                            color={myStates['gymDaySettings'] ? "default" : "inherit"}
                            onClick={() => dataAndMethodsContext.setMyState('gymDaySettings')}>
                            <i className="icon-calendar-cog"></i>
                        </IconButton>
                    </Tooltip>
                    {(myStates['exerciseSettings']) && <Tooltip title="Add exercise item">
                        <IconButton aria-label=""
                            color="inherit"
                            onClick={() => newExerciseItemClick()}>
                            <i className="icon-book-plus"></i>
                        </IconButton>
                    </Tooltip>}
                    {(myStates['workoutSettings']) && <Tooltip title="Add workout item">
                        <IconButton aria-label=""
                            color="inherit"
                            onClick={() => newWorkoutClick()}>
                            <i className="icon-calendar-solid-plus"></i>
                        </IconButton>
                    </Tooltip>}
                    {(myStates['gymDaySettings']) && <Tooltip title="Add gym day">
                        <IconButton aria-label=""
                            color="inherit"
                            onClick={() => newGymDayClick()}>
                            <i className="icon-calendar-solid-plus"></i>
                        </IconButton>
                    </Tooltip>}
                </div>
            </Toolbar>
        </Fragment >
    );
}

export default SignedInTopToolBar;
