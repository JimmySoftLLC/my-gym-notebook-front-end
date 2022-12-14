import React, { useContext } from 'react';
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
import getExerciseDays from '../../model/exerciseDay/getExerciseDays';

const SignedInTopToolBar = () => {
  const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
  const {
    setExerciseDialogData,
    setExerciseDialogOpen,
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
    exercises,
    setExercisesPrevious,
  } = dataAndMethodsContext;

  const newExerciseClick = () => {
    let myNewId = uuidv4();
    let myEditItem = {
      id: myNewId,
      title: '',
      dataJSON: [],
      categoryJSON: [],
      videoUrl: '',
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
      e,
      exercises,
      setExercisesPrevious,
      gymDays,
      workouts
    );
  };

  return (
    <>
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
                <i className='icon-gym-day-person'></i>
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
                <i className='icon-exercise-cog'></i>
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
                <i className='icon-workout-cog'></i>
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
                <i className='icon-gym-day-cog'></i>
              </IconButton>
            </Tooltip>
            {myStates['exerciseSettings'] && (
              <Tooltip title='Add exercise item'>
                <IconButton
                  aria-label=''
                  color='inherit'
                  onClick={() => newExerciseClick()}
                >
                  <i className='icon-exercise-add'></i>
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
                  <i className='icon-workout-add'></i>
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
                  <i className='icon-gym-day-add'></i>
                </IconButton>
              </Tooltip>
            )}
          </div>
        </Toolbar>
      </MuiPickersUtilsProvider>
    </>
  );
};

export default SignedInTopToolBar;
