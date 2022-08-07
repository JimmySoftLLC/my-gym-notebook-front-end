import React, { useReducer } from 'react';
import DataAndMethodsContext from './dataAndMethodsContext';
import DataAndMethodsReducer from './dataAndMethodsReducer';
import setMyStatesLogic from '../../model/setMyStatesLogic';
// import getLocation from '../../model/getLocation';

import {
    SET_MY_STATES,
    SET_MENU_ITEMS,
    SET_RESTAURANTS,
    SET_MENU_ITEM_DIALOG_DATA,
    SET_MENU_ITEM_DIALOG_OPEN,
    SET_EDIT_RESTAURANTS,
    SET_EDIT_RESTAURANTS_OPEN,
    SET_SIGN_IN_REG_DIALOG_TYPE,
    SET_SIGN_IN_REG_DIALOG_TITLE,
    SET_AUTH_TOKEN,
    SET_ID_TOKEN,
    SET_CUSTOM_ID,
    SET_LOGIN_TYPE,
    SET_ASSOCIATE_RESTAURANTS,
    SET_ASSOCIATE,
    SET_ASSOCIATE_DIALOG_DATA,
    SET_ASSOCIATE_DIALOG_OPEN,
    SET_RESTAURANT_ID,
    SET_RESTAURANT_MENU_DAY_ITEMS,
    SET_MENU_DAY_DIALOG_OPEN,
    SET_MENU_DAY_DIALOG_DATA,
    SET_RESTAURANT_ASSOCIATES,
    SET_LOADING,
    SET_RESTAURANT,
    SET_ASSOCIATES,
    SET_MENU_DAYS,
    SET_LOADING_DIALOG,
    SET_ENTERTAINMENT_ITEMS,
    SET_ENTERTAINMENT_ITEM_DIALOG_DATA,
    SET_ENTERTAINMENT_ITEM_DIALOG_OPEN,
    SET_RESTAURANT_ENTERTAINMENT_ITEMS,
    SET_ON_SCREEN_DEBUG_MESSAGE,
    SET_PHOTOS,
    SET_RESTAURANT_PHOTOS,
    SET_PHOTO_DIALOG_DATA,
    SET_PHOTO_DIALOG_OPEN,
    SET_IMAGE_EDITOR_DATA,
    SET_TODAYS_DATE,
    SET_SELECTED_DATE,
} from '../types';

const DataAndMethodsState: any = (props: { children: any; }) => {
    const [myStatesLocalStorage] = React.useState(() => {
        let myStates: any = window.localStorage.getItem("iWantToDine.myStates");
        myStates = myStates !== null ? JSON.parse(myStates)
            : {
                // menu categories
                specials: true,
                soup: false,
                salad: false,
                appetizers: true,
                sandwich: false,
                pizza: false,
                pasta: false,
                entree: true,
                dessert: false,
                drinks: false,
                beer: false,
                coffee: false,
                wine: false,
                kids: false,

                // price categories
                dollar_1: true,
                dollar_2: true,
                dollar_3: false,

                // dates
                date_0: false,
                date_1: false,
                date_2: false,
                date_3: false,
                date_4: false,
                date_5: false,
                date_6: false,

                // ingredients
                meat: true,
                pork: false,
                poultry: false,
                fish: false,
                shellfish: false,
                vegetarian: false,
                cheese: false,
                carryout: false,

                // customer pages
                ExerciseItems: false,
                restaurants: false,
                gymMembers: false,
                entertainmentItems: false,
                photoSettings: false,
                info: true,
                restaurantDetail: false,

                // backend pages
                exerciseSettings: false,
                gymDaySettings: false,
                entertainmentSettings: false,
                gymMemberSettings: false,
                showDescription: false,

                // sorting types
                sortTitle: true,
                sortPrice: false,
                sortDate: false,
                sortTime: true,
                sortName: false,

                lastState: 'ExerciseItems',

                // help dialog
                helpDialogStage: 0,
                helpDialogActive: false,
                helpDialogOpen: true,
            };
        // if set to restaurant reset to ExerciseItems since restaurant 
        // detail expects data which does not exist yet.
        if (myStates.restaurantDetail) {
            myStates.restaurantDetail = false
            myStates.ExerciseItems = true
            myStates.lastState = 'ExerciseItems'
        }
        // dates
        myStates.date_0 = true;
        myStates.date_1 = false;
        myStates.date_2 = false;
        myStates.date_3 = false;
        myStates.date_4 = false;
        myStates.date_5 = false;
        myStates.date_6 = false;
        return myStates
    });

    const initialState = {
        authToken: {},
        idToken: {},
        customId: '',
        logInType: 'default',
        loading: false,
        loadingDialog: false,
        myStates: myStatesLocalStorage,
        signInRegDialogType: 'false',
        ExerciseItems: [],
        entertainmentItems: [],
        gymMembers: [],
        GymDays: [],
        exerciseItems: [],
        restaurantEntertainmentItems: [],
        restaurantPhotos: [],
        restaurantGymDays: [],
        restaurants: [],
        gymMembersRestaurants: [],
        gymMember: {},
        ExerciseItemDialogOpen: false,
        restaurantGymMembers: [],
        restaurantDetail: {},
        onScreenDebugMessage: '',
        todaysDate: Date(),
        selectedDate: Date(),
        ExerciseItemDialogData: {
            title: '',
            description: '',
            categoryJSON: [],
            price: 0,
            id: '',
            restaurant: '',
            restaurantId: '',
            dialogType: 'Add',
        },
        gymMemberDialogOpen: false,
        gymMemberDialogData: {
            id: '',
            firstName: '',
            lastName: '',
            bio: '',
            jobTitle: '',
            email: '',
            exerciseIdsJSON: [],
            teamMateIdsJSON: [],
            gymDayIdsJSON: [],
            hideGymMember: false,
            accessLevel: 'none',
            dialogType: 'Edit',
            message: '',
        },
        GymDayDialogOpen: false,
        GymDayDialogData: {
            id: '',
            title: '',
            dateFrom: '',
            dateTo: '',
            description: '',
            ExerciseItemIdsJSON: [],
            entertainmentItemIdsJSON: [],
            gymMembersJSON: [],
            restaurantId: '',
            dialogType: "Edit",
        },
        entertainmentItemDialogOpen: false,
        entertainmentItemDialogData: {
            title: '',
            description: '',
            timeFrom: '',
            timeTo: '',
            imageUrl: '',
            categoryJSON: [],
            restaurantId: '',
            dialogType: 'Add',
        },
        photoDialogOpen: false,
        photoDialogData: {
            src: '',
            caption: '',
            restaurantid: '',
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
        photos: [],
    };

    const [state, dispatch] = useReducer(DataAndMethodsReducer, initialState);

    // get data by date ------------------------------------------------------------------
    const getDataByDate = async (selectedDate: any) => {
        setLoading(true);
        setLoading(false);
    };

    // set date -------------------------------------------------------------------------------
    const setTodaysDate = (todaysDate: any) => dispatch({ type: SET_TODAYS_DATE, payload: todaysDate });
    const setSelectedDate = (selectedDate: any) => dispatch({ type: SET_SELECTED_DATE, payload: selectedDate });

    // set loading spinner ---------------------------------------------------------------------
    const setLoading = (myBool: boolean) => dispatch({ type: SET_LOADING, payload: myBool });
    const setLoadingDialog = (myBool: any) => dispatch({ type: SET_LOADING_DIALOG, payload: myBool });

    //set my states -----------------------------------------------------
    const setMyState = async (key: any) => {
        let myNewStateChoices = JSON.parse(JSON.stringify(state.myStates))
        myNewStateChoices = setMyStatesLogic(myNewStateChoices, key)
        window.localStorage.setItem("iWantToDine.myStates", JSON.stringify(myNewStateChoices));
        setMyStates(myNewStateChoices);
    };
    const setMyStates = async (myStates: any) => { dispatch({ type: SET_MY_STATES, payload: myStates }) }

    // login dialog and authorization items ------------------------------
    const setAuthToken = async (authToken: any) => { dispatch({ type: SET_AUTH_TOKEN, payload: authToken }) }
    const setCustomId = async (customId: any) => { dispatch({ type: SET_CUSTOM_ID, payload: customId }) }
    const setIdToken = async (idToken: any) => { dispatch({ type: SET_ID_TOKEN, payload: idToken }) }
    const setLogInType = async (logInType: any) => { dispatch({ type: SET_LOGIN_TYPE, payload: logInType }) }
    const setSignInRegDialogType = async (signInRegDialogType: any) => { dispatch({ type: SET_SIGN_IN_REG_DIALOG_TYPE, payload: signInRegDialogType }) }
    const setSignInRegDialogTitle = async (signInRegDialogTitle: any) => { dispatch({ type: SET_SIGN_IN_REG_DIALOG_TITLE, payload: signInRegDialogTitle }) }

    // gymMembers and dialog --------------------------------------------
    const setGymMemberDialogDataItem = async (key: string, value: any) => {
        let gymMemberDialogData = JSON.parse(JSON.stringify(state.gymMemberDialogData))
        gymMemberDialogData[key] = value;
        if (key === 'firstName') { gymMemberDialogData['message'] = '' }
        if (key === 'lastName') { gymMemberDialogData['message'] = '' }
        if (key === 'jobTitle') { gymMemberDialogData['message'] = '' }
        if (key === 'bio') { gymMemberDialogData['message'] = '' }
        if (key === 'email') { gymMemberDialogData['message'] = '' }
        if (key === 'accessLevel') { gymMemberDialogData['message'] = '' }
        setGymMemberDialogData(gymMemberDialogData);
    }
    const setGymMember = async (gymMember: any) => { dispatch({ type: SET_ASSOCIATE, payload: gymMember }) }
    const setGymMembers = async (gymMembers: any[]) => { dispatch({ type: SET_ASSOCIATES, payload: gymMembers }) }
    const setGymMemberDialogData = async (gymMemberDialogData: any) => { dispatch({ type: SET_ASSOCIATE_DIALOG_DATA, payload: gymMemberDialogData }) }
    const setGymMemberDialogOpen = async (gymMemberDialogOpen: any) => { dispatch({ type: SET_ASSOCIATE_DIALOG_OPEN, payload: gymMemberDialogOpen }) }
    const setGymMembersRestaurants = async (gymMembersRestaurants: any) => { dispatch({ type: SET_ASSOCIATE_RESTAURANTS, payload: gymMembersRestaurants }) }

    // menu items and dialog --------------------------------------------
    const setExercisetemDialogDataItem = async (key: string, value: any) => {
        let ExerciseItemDialogData = JSON.parse(JSON.stringify(state.ExerciseItemDialogData))
        ExerciseItemDialogData[key] = value;
        setExercisetemDialogData(ExerciseItemDialogData);
    }
    const setExercisetemDialogDataCategory = async (key: string) => {
        let myNewCategories = JSON.parse(JSON.stringify(state.ExerciseItemDialogData.categoryJSON))
        let myIndex = -1
        let keysToClear = ['specials',
            'soup',
            'salad',
            'appetizers',
            'sandwich',
            'pizza',
            'pasta',
            'entree',
            'dessert',
            'drinks',
            'kids']
        if (keysToClear.indexOf(key, 0) !== -1) {
            for (let i = 0; i < keysToClear.length; i++) {
                myIndex = myNewCategories.indexOf(keysToClear[i], 0)
                if (myIndex !== -1) {
                    myNewCategories.splice(myIndex, 1)
                }
            }
        }
        myIndex = myNewCategories.indexOf(key, 0)
        if (myIndex !== -1) {
            myNewCategories.splice(myIndex, 1)
        } else {
            myNewCategories.push(key)
        }
        setExercisetemDialogDataItem('categoryJSON', myNewCategories)
    }
    const setExerciseItems = async (ExerciseItems: any[]) => { dispatch({ type: SET_MENU_ITEMS, payload: ExerciseItems }) }
    const setExercisetemDialogData = async (ExerciseItemDialogData: any) => { dispatch({ type: SET_MENU_ITEM_DIALOG_DATA, payload: ExerciseItemDialogData }) }
    const setExerciseItemDialogOpen = async (ExerciseItemDialogOpen: any) => { dispatch({ type: SET_MENU_ITEM_DIALOG_OPEN, payload: ExerciseItemDialogOpen }) }

    // restaurant and dialog ------------------------------------------
    const setRestaurantDialogDataItem = async (key: string | number, value: any) => {
        let restaurantDialogData = JSON.parse(JSON.stringify(state.restaurantDialogData))
        restaurantDialogData[key] = value;
        setRestaurantDialogData(restaurantDialogData);
    }
    const setRestaurantDetail = async (restaurantDetail: any) => { dispatch({ type: SET_RESTAURANT, payload: restaurantDetail }) }
    const setRestaurants = async (restaurants: any) => { dispatch({ type: SET_RESTAURANTS, payload: restaurants }) }
    const setRestaurantDialogData = async (restaurantDialogData: any) => { dispatch({ type: SET_EDIT_RESTAURANTS, payload: restaurantDialogData }) }
    const setRestaurantDialogOpen = async (restaurantDialogOpen: any) => { dispatch({ type: SET_EDIT_RESTAURANTS_OPEN, payload: restaurantDialogOpen }) }
    const setRestaurantEntertainmentItems = async (restaurantEntertainmentItems: any) => { dispatch({ type: SET_RESTAURANT_ENTERTAINMENT_ITEMS, payload: restaurantEntertainmentItems }) }
    const setRestaurantGymDays = async (restaurantGymDays: any) => { dispatch({ type: SET_RESTAURANT_MENU_DAY_ITEMS, payload: restaurantGymDays }) }
    const setRestaurantPhotos = async (restaurantPhotos: any) => { dispatch({ type: SET_RESTAURANT_PHOTOS, payload: restaurantPhotos }) }
    const setRestaurantId = async (restaurantId: any) => { dispatch({ type: SET_RESTAURANT_ID, payload: restaurantId }) }
    const setRestaurantGymMembers = async (restaurantGymMembers: any) => { dispatch({ type: SET_RESTAURANT_ASSOCIATES, payload: restaurantGymMembers }) }

    // menu days and dialog -----------------------------------------------
    const setGymDays = async (GymDays: any[]) => { dispatch({ type: SET_MENU_DAYS, payload: GymDays }) }
    const setGymDayDialogDataItem = async (key: string | number, value: any) => {
        let GymDayDialogData = JSON.parse(JSON.stringify(state.GymDayDialogData))
        GymDayDialogData[key] = value;
        setGymDayDialogData(GymDayDialogData);
    }
    const setGymDayDialogData = async (GymDayDialogData: any) => { dispatch({ type: SET_MENU_DAY_DIALOG_DATA, payload: GymDayDialogData }) }
    const setGymDayDialogOpen = async (GymDayDialogOpen: any) => { dispatch({ type: SET_MENU_DAY_DIALOG_OPEN, payload: GymDayDialogOpen }) }

    // entertainment items and dialog ---------------------------------------------
    const setEntertainmentItems = async (entertainmentItems: any[]) => { dispatch({ type: SET_ENTERTAINMENT_ITEMS, payload: entertainmentItems }) }
    const setEntertainmentItemDialogDataItem = async (key: string, value: any) => {
        let entertainmentItemDialogData = JSON.parse(JSON.stringify(state.entertainmentItemDialogData))
        entertainmentItemDialogData[key] = value;
        setEntertainmentItemDialogData(entertainmentItemDialogData);
    }
    const setEntertainmentItemDialogDataCategory = async (key: any) => {
        let myNewCategories = JSON.parse(JSON.stringify(state.entertainmentItemDialogData.categoryJSON))
        let myIndex = myNewCategories.indexOf(key, 0)
        if (myIndex !== -1) {
            myNewCategories.splice(myIndex, 1)
        } else {
            myNewCategories.push(key)
        }
        setEntertainmentItemDialogDataItem('categoryJSON', myNewCategories)
    }
    const setEntertainmentItemDialogData = async (entertainmentItemDialogData: any) => { dispatch({ type: SET_ENTERTAINMENT_ITEM_DIALOG_DATA, payload: entertainmentItemDialogData }) }
    const setEntertainmentItemDialogOpen = async (entertainmentItemDialogOpen: any) => { dispatch({ type: SET_ENTERTAINMENT_ITEM_DIALOG_OPEN, payload: entertainmentItemDialogOpen }) }

    // photos and dialog -----------------------------------------------------
    const setPhotos = async (photos: any[]) => { dispatch({ type: SET_PHOTOS, payload: photos }) }
    const setPhotoDialogDataItem = async (key: string | number, value: any) => {
        let photoDialogData = JSON.parse(JSON.stringify(state.photoDialogData))
        photoDialogData[key] = value;
        setPhotoDialogData(photoDialogData);
    }
    const setPhotoDialogData = async (photoDialogData: any) => { dispatch({ type: SET_PHOTO_DIALOG_DATA, payload: photoDialogData }) }
    const setPhotoDialogOpen = async (photoDialogOpen: any) => { dispatch({ type: SET_PHOTO_DIALOG_OPEN, payload: photoDialogOpen }) }

    // image editor -----------------------------------------------------
    const setImageEditorDataItem = (key: string | number, value: any) => {
        let imageEditorData = JSON.parse(JSON.stringify(state.imageEditorData))
        imageEditorData[key] = value;
        setImageEditorData(imageEditorData);
    }
    const setImageEditorData = async (imageEditorData: any) => { dispatch({ type: SET_IMAGE_EDITOR_DATA, payload: imageEditorData }) }

    // debuging tools used for moblie debugging -------------------------------------
    const setOnScreenDebugMessage = async (onScreenDebugMessage: any) => dispatch({ type: SET_ON_SCREEN_DEBUG_MESSAGE, payload: onScreenDebugMessage });

    return (
        <DataAndMethodsContext.Provider
            value={{
                myStates: state.myStates,
                myExerciseItemStates: state.myExerciseItemStates,
                ExerciseItems: state.ExerciseItems,
                exerciseItemsTableName: state.exerciseItemsTableName,
                restaurantsTableName: state.restaurantsTableName,
                restaurants: state.restaurants,
                ExerciseItemDialogData: state.ExerciseItemDialogData,
                restaurantDialogData: state.restaurantDialogData,
                ExerciseItemDialogOpen: state.ExerciseItemDialogOpen,
                restaurantDialogOpen: state.restaurantDialogOpen,
                signInRegDialogType: state.signInRegDialogType,
                signInRegDialogTitle: state.signInRegDialogTitle,
                authToken: state.authToken,
                idToken: state.idToken,
                apiPath: state.apiPath,
                apiName: state.apiName,
                logInType: state.logInType,
                customId: state.customId,
                gymMembersRestaurants: state.gymMembersRestaurants,
                gymMember: state.gymMember,
                gymMemberDialogData: state.gymMemberDialogData,
                gymMemberDialogOpen: state.gymMemberDialogOpen,
                exerciseItems: state.exerciseItems,
                restaurantEntertainmentItems: state.restaurantEntertainmentItems,
                restaurantId: state.restaurantId,
                restaurantGymDays: state.restaurantGymDays,
                GymDayDialogData: state.GymDayDialogData,
                GymDayDialogOpen: state.GymDayDialogOpen,
                restaurantGymMembers: state.restaurantGymMembers,
                loading: state.loading,
                loadingDialog: state.loadingDialog,
                restaurantDetail: state.restaurantDetail,
                gymMembers: state.gymMembers,
                GymDays: state.GymDays,
                entertainmentItems: state.entertainmentItems,
                entertainmentItemDialogData: state.entertainmentItemDialogData,
                entertainmentItemDialogDataItem: state.entertainmentItemDialogDataItem,
                entertainmentItemDialogOpen: state.entertainmentItemDialogOpen,
                onScreenDebugMessage: state.onScreenDebugMessage,
                photos: state.photos,
                restaurantPhotos: state.restaurantPhotos,
                photoDialogData: state.photoDialogData,
                photoDialogOpen: state.photoDialogOpen,
                imageEditorData: state.imageEditorData,
                todaysDate: state.todaysDate,
                selectedDate: state.selectedDate,
                setMyState,
                setMyStates,
                setRestaurants,
                setExercisetemDialogDataItem,
                setExercisetemDialogDataCategory,
                setExerciseItemDialogOpen,
                setRestaurantDialogOpen,
                setSignInRegDialogType,
                setSignInRegDialogTitle,
                setAuthToken,
                setIdToken,
                setCustomId,
                setLogInType,
                setGymMember,
                setExerciseItems,
                setGymMembersRestaurants,
                setRestaurantDialogData,
                setRestaurantDialogDataItem,
                setGymMemberDialogData,
                setGymMemberDialogOpen,
                setGymMemberDialogDataItem,
                setExercisetemDialogData,
                setRestaurantId,
                setRestaurantGymDays,
                setGymDayDialogData,
                setGymDayDialogOpen,
                setGymDayDialogDataItem,
                setRestaurantGymMembers,
                setLoading,
                setRestaurantDetail,
                setGymMembers,
                setGymDays,
                setLoadingDialog,
                setEntertainmentItems,
                setEntertainmentItemDialogData,
                setEntertainmentItemDialogDataItem,
                setEntertainmentItemDialogOpen,
                setEntertainmentItemDialogDataCategory,
                setRestaurantEntertainmentItems,
                setOnScreenDebugMessage,
                setPhotos,
                setRestaurantPhotos,
                setPhotoDialogDataItem,
                setPhotoDialogData,
                setPhotoDialogOpen,
                setImageEditorData,
                setImageEditorDataItem,
                getDataByDate,
                setTodaysDate,
                setSelectedDate,
            }}
        >
            {props.children}
        </DataAndMethodsContext.Provider>
    );
};

export default DataAndMethodsState;