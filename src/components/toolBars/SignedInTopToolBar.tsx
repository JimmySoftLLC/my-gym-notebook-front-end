import React, { Fragment, useContext } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import { Tooltip } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import getDays from '../../utilities/getDays';
import enableValidDays from '../../utilities/enableValidDays';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import getExerciseDaysFromIds from '../../model/exerciseDay/getExerciseDaysFromIds';
import getExerciseDays from '../../utilities/getExerciseDays';

const SignedInTopToolBar = () => {
  const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
  const {
    setExerciseDialogData,
    setExerciseDialogOpen,
    restaurantId,
    myStates,
    setWorkoutDialogData,
    setWorkoutDialogOpen,
    setGymDayDialogData,
    setGymDayDialogOpen,
    selectedDate,
    setSelectedDate,
    getTodaysWorkouts,
    gymDays,
    workouts,
    gymMember,
    setExerciseDay,
  } = dataAndMethodsContext;

  const newExerciseClick = () => {
    let myNewId = uuidv4();
    let myEditItem = {
      id: myNewId,
      title: '',
      dataJSON: [],
      categoryJSON: [],
      price: 0,
      restaurantId: restaurantId,
      dialogType: 'Add',
    };
    setExerciseDialogData(myEditItem);
    setExerciseDialogOpen(true);
  };

  const newWorkoutClick = () => {
    let myNewId = uuidv4();
    let myEditItem = {
      id: myNewId,
      title: '',
      exerciseIdsJSON: [],
      dialogType: 'Add',
    };
    setWorkoutDialogData(myEditItem);
    setWorkoutDialogOpen(true);
  };

  const newGymDayClick = async () => {
    let myNewId = uuidv4();
    const newDate = new Date();
    const newDays = await getDays(newDate, newDate);
    const activeDays = enableValidDays(newDays);
    let myEditItem = {
      id: myNewId,
      title: '',
      dateFrom: newDate,
      dateTo: newDate,
      workoutIdsJSON: [],
      dayJSON: newDays,
      days: activeDays,
      dialogType: 'Add',
    };
    setGymDayDialogData(myEditItem);
    setGymDayDialogOpen(true);
  };

  const handleSelectedDateChange = async (e: any) => {
    setSelectedDate(e);
    getTodaysWorkouts(gymDays, e, workouts);
    await getExerciseDays(
      gymMember,
      getExerciseDaysFromIds,
      setExerciseDay,
      selectedDate
    );
  };

  return (
    <Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Toolbar>
          <div>
            <DatePicker
              id='date-from'
              format='MM/dd/yy'
              value={selectedDate}
              onChange={(e) => handleSelectedDateChange(e)}
              style={{ width: 75, paddingTop: 8 }}
            />
            <Tooltip title='Exercise'>
              <IconButton
                aria-label=''
                color={myStates['showWorkoutByDate'] ? 'default' : 'inherit'}
                onClick={() =>
                  dataAndMethodsContext.setMyState('showWorkoutByDate')
                }
              >
                <i className='icon-user-read'></i>
              </IconButton>
            </Tooltip>
            <Tooltip title='Exercise settings'>
              <IconButton
                aria-label=''
                color={myStates['exerciseSettings'] ? 'default' : 'inherit'}
                onClick={() =>
                  dataAndMethodsContext.setMyState('exerciseSettings')
                }
              >
                <i className='icon-book-cog'></i>
              </IconButton>
            </Tooltip>
            <Tooltip title='Workout settings'>
              <IconButton
                aria-label=''
                color={myStates['workoutSettings'] ? 'default' : 'inherit'}
                onClick={() =>
                  dataAndMethodsContext.setMyState('workoutSettings')
                }
              >
                <i className='icon-calendar-cog'></i>
              </IconButton>
            </Tooltip>
            <Tooltip title='Gym day settings'>
              <IconButton
                aria-label=''
                color={myStates['gymDaySettings'] ? 'default' : 'inherit'}
                onClick={() =>
                  dataAndMethodsContext.setMyState('gymDaySettings')
                }
              >
                <i className='icon-calendar-cog'></i>
              </IconButton>
            </Tooltip>
            {myStates['exerciseSettings'] && (
              <Tooltip title='Add exercise item'>
                <IconButton
                  aria-label=''
                  color='inherit'
                  onClick={() => newExerciseClick()}
                >
                  <i className='icon-book-plus'></i>
                </IconButton>
              </Tooltip>
            )}
            {myStates['workoutSettings'] && (
              <Tooltip title='Add workout item'>
                <IconButton
                  aria-label=''
                  color='inherit'
                  onClick={() => newWorkoutClick()}
                >
                  <i className='icon-calendar-solid-plus'></i>
                </IconButton>
              </Tooltip>
            )}
            {myStates['gymDaySettings'] && (
              <Tooltip title='Add gym day'>
                <IconButton
                  aria-label=''
                  color='inherit'
                  onClick={() => newGymDayClick()}
                >
                  <i className='icon-calendar-solid-plus'></i>
                </IconButton>
              </Tooltip>
            )}
          </div>
        </Toolbar>
      </MuiPickersUtilsProvider>
    </Fragment>
  );
};

export default SignedInTopToolBar;
