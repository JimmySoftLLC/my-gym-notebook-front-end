import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
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

    const [deleteName, setDeleteName] = useState('');
    const [confirmMessage, setConfirmMessage] = useState('');

    const changeDeleteName = (e: any) => {
        setDeleteName(e.target.value)
    };

    const chooseDelete = () => {
        if (deleteConfirmDialog.dialogType === "deleteRestaurant") {
            if (deleteName === deleteConfirmDialog.name) {
                deleteFunction(deleteConfirmDialog.index)
                setDeleteName('')
                setConfirmMessage('')
            } else {
                setConfirmMessage('Typed in name does not match')
            }
        }
        if (deleteConfirmDialog.dialogType === "deleteMenuItem") {
            deleteFunction(deleteConfirmDialog.index)
            setDeleteName('')
            setConfirmMessage('')
        }
        if (deleteConfirmDialog.dialogType === "deleteEntertainmentItem") {
            deleteFunction(deleteConfirmDialog.index)
            setDeleteName('')
            setConfirmMessage('')
        }
        if (deleteConfirmDialog.dialogType === "deleteMenuDay") {
            deleteFunction(deleteConfirmDialog.index)
            setDeleteName('')
            setConfirmMessage('')
        }
        if (deleteConfirmDialog.dialogType === "deleteAssociate") {
            deleteFunction(deleteConfirmDialog.index)
            setDeleteName('')
            setConfirmMessage('')
        }
        if (deleteConfirmDialog.dialogType === "deletePhoto") {
            deleteFunction(deleteConfirmDialog.index)
            setDeleteName('')
            setConfirmMessage('')
        }
    }

    const chooseClose = () => {
        closeDialog()
        setDeleteName('')
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
                    {deleteConfirmDialog.dialogType === "deleteRestaurant" && <DialogTitle id='alert-dialog-title'>
                        <i className='fas fa-exclamation-triangle'></i>
                        {'  Delete restaurant warning'}
                    </DialogTitle>}
                    {deleteConfirmDialog.dialogType === "deleteMenuItem" && <DialogTitle id='alert-dialog-title'>
                        <i className='fas fa-exclamation-triangle'></i>
                        {'  Delete menu item warning'}
                    </DialogTitle>}
                    {deleteConfirmDialog.dialogType === "deleteEntertainmentItem" && <DialogTitle id='alert-dialog-title'>
                        <i className='fas fa-exclamation-triangle'></i>
                        {'  Delete entertainment item warning'}
                    </DialogTitle>}
                    {deleteConfirmDialog.dialogType === "deleteMenuDay" && <DialogTitle id='alert-dialog-title'>
                        <i className='fas fa-exclamation-triangle'></i>
                        {'  Delete menu day warning'}
                    </DialogTitle>}
                    {deleteConfirmDialog.dialogType === "deleteAssociate" && <DialogTitle id='alert-dialog-title'>
                        <i className='fas fa-exclamation-triangle'></i>
                        {'  Delete associate warning'}
                    </DialogTitle>}
                    {deleteConfirmDialog.dialogType === "deletePhoto" && <DialogTitle id='alert-dialog-title'>
                        <i className='fas fa-exclamation-triangle'></i>
                        {'  Delete photo warning'}
                    </DialogTitle>}
                    <DialogContent>
                        {deleteConfirmDialog.dialogType === "deleteRestaurant" && <DialogContentText id='alert-dialog-description'>
                            {`You about to delete `}
                            <strong>{deleteConfirmDialog.name}</strong>
                            {`.  This process is irreversable are you sure?  To confirm delete type the name below.`}
                        </DialogContentText>}
                        {deleteConfirmDialog.dialogType === "deleteMenuItem" && <DialogContentText id='alert-dialog-description'>
                            {`You about to delete `}
                            <strong>{deleteConfirmDialog.name}</strong>
                            {`.  This process is irreversable are you sure?`}
                        </DialogContentText>}
                        {deleteConfirmDialog.dialogType === "deleteEntertainmentItem" && <DialogContentText id='alert-dialog-description'>
                            {`You about to delete `}
                            <strong>{deleteConfirmDialog.name}</strong>
                            {`.  This process is irreversable are you sure?`}
                        </DialogContentText>}
                        {deleteConfirmDialog.dialogType === "deleteMenuDay" && <DialogContentText id='alert-dialog-description'>
                            {`You about to delete `}
                            <strong>{deleteConfirmDialog.name}</strong>
                            {`.  This process is irreversable are you sure?`}
                        </DialogContentText>}
                        {deleteConfirmDialog.dialogType === "deleteAssociate" && <DialogContentText id='alert-dialog-description'>
                            {`You about to delete `}
                            <strong>{deleteConfirmDialog.name}</strong>
                            {`.  This process is irreversable are you sure?`}
                        </DialogContentText>}
                        {deleteConfirmDialog.dialogType === "deletePhoto" && <DialogContentText id='alert-dialog-description'>
                            {`You about to delete `}
                            <strong>{deleteConfirmDialog.name}</strong>
                            {`.  This process is irreversable are you sure?`}
                        </DialogContentText>}
                        {deleteConfirmDialog.dialogType === "deleteRestaurant" && <TextField
                            id="name"
                            label="Name of item to delete"
                            type="text"
                            fullWidth
                            variant="filled"
                            value={deleteName}
                            onChange={changeDeleteName}
                        />}
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
