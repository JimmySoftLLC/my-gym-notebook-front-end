import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteConfirmDialogContext from '../../context/deleteConfirmDialog/deleteConfirmDialogContext';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiButton-root': {
            margin: theme.spacing(1),
            marginLeft: 0,
        },
    },
}));

const DeleteConfirmDialog: any = () => {
    const classes = useStyles();
    const deleteConfirmDialogContext: any = useContext(DeleteConfirmDialogContext);
    const { deleteConfirmDialog, closeDialog, deleteFunction } = deleteConfirmDialogContext;

    const [confirmMessage, setConfirmMessage] = useState('');

    const chooseDelete = () => {
        if (deleteConfirmDialog.dialogType === "deleteExercise") {
            deleteFunction(deleteConfirmDialog.index)
            setConfirmMessage('')
        }
        if (deleteConfirmDialog.dialogType === "deleteWorkout") {
            deleteFunction(deleteConfirmDialog.index)
            setConfirmMessage('')
        }
        if (deleteConfirmDialog.dialogType === "deleteGymDay") {
            deleteFunction(deleteConfirmDialog.index)
            setConfirmMessage('')
        }
        if (deleteConfirmDialog.dialogType === "deletePhoto") {
            deleteFunction(deleteConfirmDialog.index)
            setConfirmMessage('')
        }
    }

    const chooseClose = () => {
        closeDialog()
        setConfirmMessage('')
    }

    return (
        deleteConfirmDialog != null && (
            <div>
                <Dialog
                    className={classes.root}
                    open={deleteConfirmDialog.dialogOpen}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                >
                    {deleteConfirmDialog.dialogType === "deleteExercise" && <DialogTitle id='alert-dialog-title'>
                        <i className='fas fa-exclamation-triangle'></i>
                        {'  Delete exercise item warning'}
                    </DialogTitle>}
                    {deleteConfirmDialog.dialogType === "deleteWorkout" && <DialogTitle id='alert-dialog-title'>
                        <i className='fas fa-exclamation-triangle'></i>
                        {'  Delete workout warning'}
                    </DialogTitle>}
                    {deleteConfirmDialog.dialogType === "deleteGymDay" && <DialogTitle id='alert-dialog-title'>
                        <i className='fas fa-exclamation-triangle'></i>
                        {'  Delete gym day warning'}
                    </DialogTitle>}
                    {deleteConfirmDialog.dialogType === "deletePhoto" && <DialogTitle id='alert-dialog-title'>
                        <i className='fas fa-exclamation-triangle'></i>
                        {'  Delete photo warning'}
                    </DialogTitle>}
                    <DialogContent>
                        {deleteConfirmDialog.dialogType === "deleteExercise" && <DialogContentText id='alert-dialog-description'>
                            {`You about to delete `}
                            <strong>{deleteConfirmDialog.name}</strong>
                            {`.  This process is irreversible are you sure?`}
                        </DialogContentText>}
                        {deleteConfirmDialog.dialogType === "deleteWorkout" && <DialogContentText id='alert-dialog-description'>
                            {`You about to delete `}
                            <strong>{deleteConfirmDialog.name}</strong>
                            {`.  This process is irreversible are you sure?`}
                        </DialogContentText>}
                        {deleteConfirmDialog.dialogType === "deleteGymDay" && <DialogContentText id='alert-dialog-description'>
                            {`You about to delete `}
                            <strong>{deleteConfirmDialog.name}</strong>
                            {`.  This process is irreversible are you sure?`}
                        </DialogContentText>}
                        {deleteConfirmDialog.dialogType === "deletePhoto" && <DialogContentText id='alert-dialog-description'>
                            {`You about to delete `}
                            <strong>{deleteConfirmDialog.name}</strong>
                            {`.  This process is irreversible are you sure?`}
                        </DialogContentText>}
                        <p>{confirmMessage}</p>
                    </DialogContent>
                    <DialogActions>
                        <Button color="default" onClick={() => chooseClose()}>
                            CANCEL
                        </Button>
                        <Button color="primary" onClick={() => chooseDelete()}>
                            DELETE
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>)
    );
}

export default DeleteConfirmDialog;
