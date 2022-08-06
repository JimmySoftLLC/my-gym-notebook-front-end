import React, { useContext } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import putAssociate from '../../model/associate/putAssociate';
import saveImageToDatabase from '../../model/images/saveImageToDatabase';
import ImageEditor from '../imageEditor/ImageEditor';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            marginLeft: 0,
        },
    },
}));

const AssociateDialog: any = () => {
    const classes = useStyles();
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        idToken,
        customId,
        setAssociateDialogOpen,
        setAssociateDialogDataItem,
        associateDialogOpen,
        setAssociate,
        associate,
    } = dataAndMethodsContext;

    const {
        id,
        firstName,
        lastName,
        bio,
        email,
        exerciseIdsJSON,
        teamMateIdsJSON,
        gymDayIdsJSON,
        dialogType,
        message,
    } = dataAndMethodsContext.associateDialogData;

    const {
        deleteFileName,
        imageUrl,
        blob,
        editMode,
    } = dataAndMethodsContext.imageEditorData;

    // edit logged in associate save to database
    // get associates for restaurant from database
    // update restaurant with these new associates and save to database
    // update state for associate, restaurantAssociates
    const saveAssociateEditMe = async () => {
        let myAssociate: any = {};
        myAssociate.id = id;
        myAssociate.firstName = firstName
        myAssociate.lastName = lastName
        myAssociate.bio = bio
        myAssociate.email = email
        myAssociate.exerciseIdsJSON = exerciseIdsJSON
        myAssociate.teamMateIdsJSON = teamMateIdsJSON
        myAssociate.gymDayIdsJSON = gymDayIdsJSON
        myAssociate.imageUrl = imageUrl;
        await saveImageToDatabase(deleteFileName, imageUrl, blob, editMode, idToken, customId)
        await putAssociate(myAssociate, idToken, customId)
        setAssociate(myAssociate);
    };

    const handleClose = () => {
        setAssociateDialogOpen(false);
    };

    const handleSave = async () => {
        switch (dialogType) {
            case "EditMe":
                saveAssociateEditMe()
                break;
            default:
        }
        setAssociateDialogOpen(false);
    };

    const changeFirstName = (e: any) => {
        setAssociateDialogDataItem('firstName', e.target.value);
    };

    const changeLastName = (e: any) => {
        setAssociateDialogDataItem('lastName', e.target.value);
    };

    const changeBio = (e: any) => {
        setAssociateDialogDataItem('bio', e.target.value);
    };

    let dialogTitle = '';

    if (dialogType === "EditMe") { dialogTitle = 'Edit my details' };

    let loggedInUserMessage = '';
    if (associate.id === id) {
        loggedInUserMessage = 'Logged in user ' + email
    }

    return (
        <div>
            <Dialog className={classes.root} open={associateDialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {dialogTitle}</DialogTitle>
                <DialogContent>
                    <p>{loggedInUserMessage}</p>
                    <TextField
                        id="firstName"
                        label="First name"
                        type="text"
                        fullWidth
                        variant="filled"
                        size="small"
                        value={firstName}
                        onChange={changeFirstName}
                    />
                    <TextField
                        id="lastName"
                        label="Last name"
                        type="text"
                        fullWidth
                        variant="filled"
                        value={lastName}
                        onChange={changeLastName}
                    />
                    <TextField
                        id="bio"
                        label="Bio"
                        type="text"
                        fullWidth
                        variant="filled"
                        multiline={true}
                        rows="4"
                        value={bio}
                        onChange={changeBio}
                    />
                    <p>Profile Image</p>
                    <ImageEditor />
                    <p>{message}</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="default">
                        Cancel
                    </Button>
                    <Button onClick={() => handleSave()} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AssociateDialog;