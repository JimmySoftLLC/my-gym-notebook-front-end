import React, { useReducer } from 'react';
import DeleteConfirmContext from './deleteConfirmDialogContext';
import DeleteConfirmReducer from './deleteConfirmDialogReducer';
import { SET_ALERT_DIALOG, CLOSE_ALERT_DIALOG } from '../types';

const DeleteConfirmDialogState = (props: any) => {
    const initialState: any = {
        dialogOpen: false,
        name: '',
        title: '',
        index: 0,
    };

    const [state, dispatch] = useReducer(DeleteConfirmReducer, initialState);

    const setDeleteConfirmDialog = (dialogOpen: any, name: any, dialogType: any, index: any, deleteFunctionPassed: any): any => {
        dispatch({
            type: SET_ALERT_DIALOG,
            payload: {
                dialogOpen,
                name,
                dialogType,
                index,
                deleteFunctionPassed,
            },
        });
    };

    const closeDialog = () => {
        dispatch({ type: CLOSE_ALERT_DIALOG, payload: '' });
    };

    const deleteFunction = (index: any) => {
        state.deleteFunctionPassed(index);
        dispatch({ type: CLOSE_ALERT_DIALOG, payload: '' });
    };

    return (
        <DeleteConfirmContext.Provider
            value={{
                deleteConfirmDialog: state,
                setDeleteConfirmDialog,
                closeDialog,
                deleteFunction,
            }}
        >
            {props.children}
        </DeleteConfirmContext.Provider>
    );
};

export default DeleteConfirmDialogState;
