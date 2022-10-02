import React, { useReducer } from 'react';
import DataAndMethodsContext from './dataAndMethodsContext';
import DataAndMethodsReducer from './dataAndMethodsReducer';
import setMyStatesLogic from '../../utilities/setMyStatesLogic';
// import getLocation from '../../model/getLocation';

import {
  SET_MY_STATES,
  SET_TODAYS_DATE,
  SET_SELECTED_DATE,
  SET_LOADING,
  SET_LOADING_DIALOG,
  SET_SIGN_IN_REG_DIALOG_TYPE,
  SET_SIGN_IN_REG_DIALOG_TITLE,
  SET_AUTH_TOKEN,
  SET_ID_TOKEN,
  SET_CUSTOM_ID,
  SET_LOGIN_TYPE,
  SET_GYM_MEMBER,
  SET_GYM_MEMBERS,
  SET_GYM_MEMBER_DIALOG_DATA,
  SET_GYM_MEMBER_DIALOG_OPEN,
  SET_EXERCISE_ITEMS,
  SET_EXERCISE_ITEM_DIALOG_DATA,
  SET_EXERCISE_ITEM_DIALOG_OPEN,
  SET_WORKOUT_ITEMS,
  SET_WORKOUT_DIALOG_OPEN,
  SET_WORKOUT_DIALOG_DATA,
  SET_GYM_DAY_ITEMS,
  SET_GYM_DAY_DIALOG_OPEN,
  SET_GYM_DAY_DIALOG_DATA,
  SET_PHOTOS,
  SET_PHOTO_DIALOG_DATA,
  SET_PHOTO_DIALOG_OPEN,
  SET_IMAGE_EDITOR_DATA,
  SET_TODAYS_WORKOUTS,
  SET_TODAYS_EXERCISES,
  SET_EXERCISE_DAY,
  SET_EXERCISES_PREVIOUS,
} from '../types';
import validDate from '../../utilities/validDate';
import dateString from '../../utilities/dateString';

const DataAndMethodsState: any = (props: { children: any }) => {
  const [myStatesLocalStorage] = React.useState(() => {
    let myStates: any = window.localStorage.getItem('iWantToDine.myStates');
    myStates =
      myStates !== null
        ? JSON.parse(myStates)
        : {
            // menu categories
            strength: false,
            aerobic: false,
            balance: false,
            agility: false,
            flexibilityMobility: false,

            // dates
            date_0: false,
            date_1: false,
            date_2: false,
            date_3: false,
            date_4: false,
            date_5: false,
            date_6: false,

            // backend pages
            exerciseSettings: false,
            workoutSettings: false,
            gymDaySettings: false,
            gymMemberSettings: false,
            showDescription: false,

            // sorting types
            sortTitle: false,
            sortPrice: false,
            sortDate: false,
            sortTime: false,
            sortName: false,

            lastState: 'exercises',

            // help dialog
            helpDialogStage: 0,
            helpDialogActive: false,
            helpDialogOpen: false,
          };
    // dates
    myStates.date_0 = true;
    myStates.date_1 = false;
    myStates.date_2 = false;
    myStates.date_3 = false;
    myStates.date_4 = false;
    myStates.date_5 = false;
    myStates.date_6 = false;
    return myStates;
  });

  const initialState = {
    myStates: myStatesLocalStorage,

    todaysDate: Date(),
    selectedDate: Date(),

    loading: false,
    loadingDialog: false,

    signInRegDialogType: 'false',
    signInRegDialogTitle: '',
    authToken: {},
    idToken: {},
    customId: '',
    logInType: 'default',

    gymMember: {},
    gymMembers: [],
    gymMemberDialogOpen: false,
    gymMemberDialogData: {
      id: '',
      firstName: '',
      lastName: '',
      bio: '',
      email: '',
      exerciseIdsJSON: [],
      teamMateIdsJSON: [],
      gymDayIdsJSON: [],
      workoutIdsJSON: [],
      dataJSON: [],
      exerciseDaysJSON: {},
      dialogType: 'Edit',
      message: '',
    },

    exercises: [],
    exerciseItemDialogOpen: false,
    exerciseItemDialogData: {
      title: '',
      dataJSON: [],
      categoryJSON: [],
      id: '',
      dialogType: 'Edit',
    },

    workouts: [],
    workoutDialogOpen: false,
    workoutDialogData: {
      id: '',
      title: '',
      exerciseIdsJSON: [],
      dialogType: 'Edit',
    },

    gymDays: [],
    gymDayDialogOpen: false,
    gymDayDialogData: {
      id: '',
      title: '',
      dateFrom: '',
      dateTo: '',
      dayJSON: [],
      days: [],
      workoutIdsJSON: [],
      dialogType: 'Edit',
    },

    photos: [],
    photoDialogOpen: false,
    photoDialogData: {
      src: '',
      caption: '',
      dialogType: 'Add',
    },

    imageEditorData: {
      imageUrl: '',
      editMode: 'none',
      deleteFileName: '',
      width: 1,
      height: 1,
      aspectRatio: 1,
      blob: '',
      showDelete: true,
    },

    todaysWorkouts: [],

    exerciseDay: {},

    exercisesPrevious: {},
  };

  const [state, dispatch] = useReducer(DataAndMethodsReducer, initialState);

  //set my states -----------------------------------------------------
  const setMyState = async (key: any) => {
    let myNewStateChoices = JSON.parse(JSON.stringify(state.myStates));
    myNewStateChoices = setMyStatesLogic(myNewStateChoices, key);
    window.localStorage.setItem(
      'iWantToDine.myStates',
      JSON.stringify(myNewStateChoices)
    );
    setMyStates(myNewStateChoices);
  };
  const setMyStates = async (myStates: any) => {
    dispatch({ type: SET_MY_STATES, payload: myStates });
  };

  // set date -------------------------------------------------------------------------------
  const setTodaysDate = (todaysDate: any) =>
    dispatch({ type: SET_TODAYS_DATE, payload: todaysDate });
  const setSelectedDate = (selectedDate: any) =>
    dispatch({ type: SET_SELECTED_DATE, payload: selectedDate });

  // set loading spinner ---------------------------------------------------------------------
  const setLoading = (myBool: boolean) =>
    dispatch({ type: SET_LOADING, payload: myBool });
  const setLoadingDialog = (myBool: any) =>
    dispatch({ type: SET_LOADING_DIALOG, payload: myBool });

  // login dialog and authorization items ------------------------------
  const setSignInRegDialogType = async (signInRegDialogType: any) => {
    dispatch({
      type: SET_SIGN_IN_REG_DIALOG_TYPE,
      payload: signInRegDialogType,
    });
  };
  const setSignInRegDialogTitle = async (signInRegDialogTitle: any) => {
    dispatch({
      type: SET_SIGN_IN_REG_DIALOG_TITLE,
      payload: signInRegDialogTitle,
    });
  };
  const setAuthToken = async (authToken: any) => {
    dispatch({ type: SET_AUTH_TOKEN, payload: authToken });
  };
  const setCustomId = async (customId: any) => {
    dispatch({ type: SET_CUSTOM_ID, payload: customId });
  };
  const setIdToken = async (idToken: any) => {
    dispatch({ type: SET_ID_TOKEN, payload: idToken });
  };
  const setLogInType = async (logInType: any) => {
    dispatch({ type: SET_LOGIN_TYPE, payload: logInType });
  };

  // gymMembers and dialog --------------------------------------------
  const setGymMemberDialogDataItem = async (key: string, value: any) => {
    let gymMemberDialogData = JSON.parse(
      JSON.stringify(state.gymMemberDialogData)
    );
    gymMemberDialogData[key] = value;
    if (key === 'firstName') {
      gymMemberDialogData['message'] = '';
    }
    if (key === 'lastName') {
      gymMemberDialogData['message'] = '';
    }
    if (key === 'bio') {
      gymMemberDialogData['message'] = '';
    }
    setGymMemberDialogData(gymMemberDialogData);
  };
  const setGymMember = async (gymMember: any) => {
    dispatch({ type: SET_GYM_MEMBER, payload: gymMember });
  };
  const setGymMembers = async (gymMembers: any[]) => {
    dispatch({ type: SET_GYM_MEMBERS, payload: gymMembers });
  };
  const setGymMemberDialogData = async (gymMemberDialogData: any) => {
    dispatch({
      type: SET_GYM_MEMBER_DIALOG_DATA,
      payload: gymMemberDialogData,
    });
  };
  const setGymMemberDialogOpen = async (gymMemberDialogOpen: any) => {
    dispatch({
      type: SET_GYM_MEMBER_DIALOG_OPEN,
      payload: gymMemberDialogOpen,
    });
  };

  // exercise items and dialog --------------------------------------------
  const setExercises = async (exercises: any[]) => {
    dispatch({ type: SET_EXERCISE_ITEMS, payload: exercises });
  };
  const setExerciseDialogDataItem = async (key: string, value: any) => {
    let exerciseItemDialogData = JSON.parse(
      JSON.stringify(state.exerciseItemDialogData)
    );
    exerciseItemDialogData[key] = value;
    setExerciseDialogData(exerciseItemDialogData);
  };
  const setExerciseDialogDataCategory = async (key: string) => {
    let myNewCategories = JSON.parse(
      JSON.stringify(state.exerciseItemDialogData.categoryJSON)
    );
    let myIndex = -1;
    let keysToClear = [
      'strength',
      'aerobic',
      'balance',
      'agility',
      'flexibilityMobility',
    ];
    if (keysToClear.indexOf(key, 0) !== -1) {
      for (let i = 0; i < keysToClear.length; i++) {
        myIndex = myNewCategories.indexOf(keysToClear[i], 0);
        if (myIndex !== -1) {
          myNewCategories.splice(myIndex, 1);
        }
      }
    }
    myIndex = myNewCategories.indexOf(key, 0);
    if (myIndex !== -1) {
      myNewCategories.splice(myIndex, 1);
    } else {
      myNewCategories.push(key);
    }
    setExerciseDialogDataItem('categoryJSON', myNewCategories);
  };
  const setExerciseDialogData = async (exerciseItemDialogData: any) => {
    dispatch({
      type: SET_EXERCISE_ITEM_DIALOG_DATA,
      payload: exerciseItemDialogData,
    });
  };
  const setExerciseDialogOpen = async (exerciseItemDialogOpen: any) => {
    dispatch({
      type: SET_EXERCISE_ITEM_DIALOG_OPEN,
      payload: exerciseItemDialogOpen,
    });
  };

  // workouts and dialog -----------------------------------------------
  const setWorkouts = async (workouts: any[]) => {
    dispatch({ type: SET_WORKOUT_ITEMS, payload: workouts });
  };
  const setWorkoutDialogDataItem = async (key: string | number, value: any) => {
    let workoutDialogData = JSON.parse(JSON.stringify(state.workoutDialogData));
    workoutDialogData[key] = value;
    setWorkoutDialogData(workoutDialogData);
  };
  const setWorkoutDialogData = async (workoutDialogData: any) => {
    dispatch({ type: SET_WORKOUT_DIALOG_DATA, payload: workoutDialogData });
  };
  const setWorkoutDialogOpen = async (workoutDialogData: any) => {
    dispatch({ type: SET_WORKOUT_DIALOG_OPEN, payload: workoutDialogData });
  };

  // gym days and dialog -----------------------------------------------
  const setGymDays = async (gymDays: any[]) => {
    dispatch({ type: SET_GYM_DAY_ITEMS, payload: gymDays });
  };
  const setGymDayDialogDataItem = async (key: string | number, value: any) => {
    let gymDayDialogData = JSON.parse(JSON.stringify(state.gymDayDialogData));
    gymDayDialogData[key] = value;
    setGymDayDialogData(gymDayDialogData);
  };
  const setGymDayDialogData = async (gymDayDialogData: any) => {
    dispatch({ type: SET_GYM_DAY_DIALOG_DATA, payload: gymDayDialogData });
  };
  const setGymDayDialogOpen = async (gymDayDialogOpen: any) => {
    dispatch({ type: SET_GYM_DAY_DIALOG_OPEN, payload: gymDayDialogOpen });
  };

  // photos and dialog -----------------------------------------------------
  const setPhotos = async (photos: any[]) => {
    dispatch({ type: SET_PHOTOS, payload: photos });
  };
  const setPhotoDialogDataItem = async (key: string | number, value: any) => {
    let photoDialogData = JSON.parse(JSON.stringify(state.photoDialogData));
    photoDialogData[key] = value;
    setPhotoDialogData(photoDialogData);
  };
  const setPhotoDialogData = async (photoDialogData: any) => {
    dispatch({ type: SET_PHOTO_DIALOG_DATA, payload: photoDialogData });
  };
  const setPhotoDialogOpen = async (photoDialogOpen: any) => {
    dispatch({ type: SET_PHOTO_DIALOG_OPEN, payload: photoDialogOpen });
  };

  // image editor -----------------------------------------------------
  const setImageEditorDataItem = (key: string | number, value: any) => {
    let imageEditorData = JSON.parse(JSON.stringify(state.imageEditorData));
    imageEditorData[key] = value;
    setImageEditorData(imageEditorData);
  };
  const setImageEditorData = async (imageEditorData: any) => {
    dispatch({ type: SET_IMAGE_EDITOR_DATA, payload: imageEditorData });
  };

  // todays workouts ----------------------------------------------------
  const getTodaysWorkouts = async (
    gymDays: any,
    selectedDate: Date,
    workouts: any
  ) => {
    setLoading(true);
    let todaysGymDays = [];
    for (let j = 0; j < gymDays.length; j++) {
      if (
        validDate(
          gymDays[j].dateFrom,
          gymDays[j].dateTo,
          selectedDate,
          gymDays[j].dayJSON
        )
      ) {
        todaysGymDays.push(gymDays[j]);
      }
    }

    let workoutIdsJSON: any[] = [];
    for (let j = 0; j < todaysGymDays.length; j++) {
      for (let k = 0; k < todaysGymDays[j].workoutIdsJSON.length; k++) {
        workoutIdsJSON.push(todaysGymDays[j].workoutIdsJSON[k]);
      }
    }

    let todaysWorkOuts: any[] = [];

    for (let j = 0; j < workouts.length; j++) {
      for (let k = 0; k < workoutIdsJSON.length; k++) {
        if (workouts[j].id === workoutIdsJSON[k].toString()) {
          let workout = JSON.parse(JSON.stringify(workouts[j]));
          workout.key = workout.id + k;
          todaysWorkOuts.push(workout);
        }
      }
    }

    setTodaysWorkouts(todaysWorkOuts);
    setLoading(false);
  };

  const setTodaysWorkouts = async (todaysWorkouts: any[]) => {
    dispatch({ type: SET_TODAYS_WORKOUTS, payload: todaysWorkouts });
  };

  // todays exercises ----------------------------------------------------
  const getTodaysExercises = async (
    gymDays: any,
    selectedDate: Date,
    exercises: any
  ) => {
    setLoading(true);
    let todaysExercises = [];
    for (let j = 0; j < gymDays.length; j++) {
      if (
        validDate(
          gymDays[j].dateFrom,
          gymDays[j].dateTo,
          selectedDate,
          gymDays[j].dayJSON
        )
      ) {
        todaysExercises.push(gymDays[j]);
      }
    }

    let exerciseIdsJSON: any[] = [];
    for (let j = 0; j < todaysExercises.length; j++) {
      for (let k = 0; k < todaysExercises[j].exerciseIdsJSON.length; k++) {
        exerciseIdsJSON.push(todaysExercises[j].exerciseIdsJSON[k]);
      }
    }

    let todaysWorkOuts: any[] = [];

    for (let j = 0; j < exercises.length; j++) {
      for (let k = 0; k < exerciseIdsJSON.length; k++) {
        if (exercises[j].id === exerciseIdsJSON[k].toString()) {
          let exercise = JSON.parse(JSON.stringify(exercises[j]));
          exercise.key = exercise.id + k;
          todaysWorkOuts.push(exercise);
        }
      }
    }

    setTodaysExercises(todaysWorkOuts);
    setLoading(false);
  };

  const setTodaysExercises = async (todaysExercises: any[]) => {
    dispatch({ type: SET_TODAYS_EXERCISES, payload: todaysExercises });
  };

  // set exercise day -------------------------------------------
  const setExerciseDay = async (exerciseDay: any[]) => {
    dispatch({ type: SET_EXERCISE_DAY, payload: exerciseDay });
  };

  const setExerciseDayItem = async (
    exerciseId: string,
    key: string | number,
    value: any
  ) => {
    let exerciseDayData = JSON.parse(JSON.stringify(state.exerciseDay));
    if (exerciseDayData.id === undefined) {
      exerciseDayData.id =
        state.gymMember.id +
        dateString(state.selectedDate, state.selectedDate, 'dateAsId');
    }
    if (exerciseDayData.dataJSON === undefined) {
      exerciseDayData.dataJSON = {};
    }
    if (exerciseDayData.dataJSON[exerciseId] === undefined) {
      exerciseDayData.dataJSON[exerciseId] = {};
    }
    exerciseDayData.dataJSON[exerciseId][key] = value;

    setExerciseDay(exerciseDayData);
  };

  // set exercises previous -------------------------------------------
  const setExercisesPrevious = async (exercisesPrevious: any[]) => {
    dispatch({ type: SET_EXERCISES_PREVIOUS, payload: exercisesPrevious });
  };

  return (
    <DataAndMethodsContext.Provider
      value={{
        apiPath: state.apiPath,
        apiName: state.apiName,

        myStates: state.myStates,

        todaysDate: state.todaysDate,
        selectedDate: state.selectedDate,

        loading: state.loading,
        loadingDialog: state.loadingDialog,
        onScreenDebugMessage: state.onScreenDebugMessage,

        signInRegDialogType: state.signInRegDialogType,
        signInRegDialogTitle: state.signInRegDialogTitle,
        authToken: state.authToken,
        idToken: state.idToken,
        customId: state.customId,
        logInType: state.logInType,

        gymMember: state.gymMember,
        gymMembers: state.gymMembers,
        gymMemberDialogData: state.gymMemberDialogData,
        gymMemberDialogOpen: state.gymMemberDialogOpen,

        exercises: state.exercises,
        exerciseItemDialogData: state.exerciseItemDialogData,
        exerciseItemDialogOpen: state.exerciseItemDialogOpen,

        exercisesTableName: state.exercisesTableName,
        myExerciseStates: state.myExerciseStates,

        workouts: state.workouts,
        workoutDialogData: state.workoutDialogData,
        workoutDialogOpen: state.workoutDialogOpen,

        gymDays: state.gymDays,
        gymDayDialogData: state.gymDayDialogData,
        gymDayDialogOpen: state.gymDayDialogOpen,

        photos: state.photos,
        photoDialogData: state.photoDialogData,
        photoDialogOpen: state.photoDialogOpen,

        imageEditorData: state.imageEditorData,

        todaysWorkouts: state.todaysWorkouts,

        todaysExercises: state.todaysExercises,

        exerciseDay: state.exerciseDay,

        exercisesPrevious: state.exercisesPrevious,

        setMyState,
        setMyStates,

        getTodaysWorkouts,
        setTodaysDate,
        setSelectedDate,

        setLoading,
        setLoadingDialog,

        setSignInRegDialogType,
        setSignInRegDialogTitle,
        setAuthToken,
        setIdToken,
        setCustomId,
        setLogInType,

        setGymMember,
        setGymMembers,
        setGymMemberDialogData,
        setGymMemberDialogOpen,
        setGymMemberDialogDataItem,

        setExercises,
        setExerciseDialogDataItem,
        setExerciseDialogOpen,
        setExerciseDialogData,
        setExerciseDialogDataCategory,

        setWorkouts,
        setWorkoutDialogDataItem,
        setWorkoutDialogData,
        setWorkoutDialogOpen,

        setGymDays,
        setGymDayDialogDataItem,
        setGymDayDialogData,
        setGymDayDialogOpen,

        setPhotos,
        setPhotoDialogDataItem,
        setPhotoDialogData,
        setPhotoDialogOpen,

        setImageEditorData,
        setImageEditorDataItem,

        getTodaysExercises,
        setTodaysExercises,

        setExerciseDay,
        setExerciseDayItem,

        setExercisesPrevious,
      }}
    >
      {props.children}
    </DataAndMethodsContext.Provider>
  );
};

export default DataAndMethodsState;
