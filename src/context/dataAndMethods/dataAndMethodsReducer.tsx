import {
    SET_MY_STATES,

    SET_TODAYS_DATE,
    SET_SELECTED_DATE,

    SET_LOADING,
    SET_LOADING_DIALOG,
    SET_ON_SCREEN_DEBUG_MESSAGE,

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

    SET_GYM_DAY_ITEMS,
    SET_GYM_DAY_DIALOG_OPEN,
    SET_GYM_DAY_DIALOG_DATA,

    SET_PHOTOS,
    SET_PHOTO_DIALOG_DATA,
    SET_PHOTO_DIALOG_OPEN,
    SET_IMAGE_EDITOR_DATA,
} from '../types';

export default (state: any, action: { type: any; payload: any; }): any => {
    switch (action.type) {
        case SET_MY_STATES:
            return {
                ...state,
                myStates: action.payload,
            };
        case SET_TODAYS_DATE:
            return {
                ...state,
                todaysDate: action.payload,
            };
        case SET_SELECTED_DATE:
            return {
                ...state,
                selectedDate: action.payload,
            };
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case SET_LOADING_DIALOG:
            return {
                ...state,
                loadingDialog: action.payload,
            };
        case SET_ON_SCREEN_DEBUG_MESSAGE:
            return {
                ...state,
                onScreenDebugMessage: action.payload,
            };
        case SET_SIGN_IN_REG_DIALOG_TYPE:
            return {
                ...state,
                signInRegDialogType: action.payload,
            };
        case SET_SIGN_IN_REG_DIALOG_TITLE:
            return {
                ...state,
                signInRegDialogTitle: action.payload,
            };
        case SET_AUTH_TOKEN:
            return {
                ...state,
                authToken: action.payload,
            };
        case SET_ID_TOKEN:
            return {
                ...state,
                idToken: action.payload,
            };
        case SET_CUSTOM_ID:
            return {
                ...state,
                customId: action.payload,
            };
        case SET_LOGIN_TYPE:
            return {
                ...state,
                logInType: action.payload,
            };
        case SET_GYM_MEMBER:
            return {
                ...state,
                gymMember: action.payload,
            };
        case SET_GYM_MEMBERS:
            return {
                ...state,
                gymMembers: action.payload,
            };
        case SET_GYM_MEMBER_DIALOG_DATA:
            return {
                ...state,
                gymMemberDialogData: action.payload,
            };
        case SET_GYM_MEMBER_DIALOG_OPEN:
            return {
                ...state,
                gymMemberDialogOpen: action.payload,
            };
        case SET_EXERCISE_ITEMS:
            return {
                ...state,
                exerciseItems: action.payload,
            };
        case SET_EXERCISE_ITEM_DIALOG_DATA:
            return {
                ...state,
                exerciseItemDialogData: action.payload,
            };
        case SET_EXERCISE_ITEM_DIALOG_OPEN:
            return {
                ...state,
                exerciseItemDialogOpen: action.payload,
            };
        case SET_GYM_DAY_ITEMS:
            return {
                ...state,
                gymDays: action.payload,
            };
        case SET_GYM_DAY_DIALOG_OPEN:
            return {
                ...state,
                gymDayDialogOpen: action.payload,
            };
        case SET_GYM_DAY_DIALOG_DATA:
            return {
                ...state,
                gymDayDialogData: action.payload,
            };
        case SET_PHOTOS:
            return {
                ...state,
                photos: action.payload,
            };
        case SET_PHOTO_DIALOG_DATA:
            return {
                ...state,
                photoDialogData: action.payload,
            };
        case SET_PHOTO_DIALOG_OPEN:
            return {
                ...state,
                photoDialogOpen: action.payload,
            };
        case SET_IMAGE_EDITOR_DATA:
            return {
                ...state,
                imageEditorData: action.payload,
            };
        default:
            return state;
    }
};