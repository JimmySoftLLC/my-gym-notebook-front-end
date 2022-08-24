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
import putGymMember from '../../model/gymMember/putGymMember';
import saveImageToDatabase from '../../model/images/saveImageToDatabase';
import ImageEditor from '../imageEditor/ImageEditor';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography, FormLabel } from '@material-ui/core';
import MemberDataInventory from '../memberData/MemberDataInventory';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            marginLeft: 0,
        },
    },
}));

const GymMemberDialog: any = () => {
    const classes = useStyles();
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        idToken,
        customId,
        setGymMemberDialogOpen,
        setGymMemberDialogDataItem,
        gymMemberDialogOpen,
        setGymMember,
        gymMember,
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
        dataJSON,
        dialogType,
        message,
    } = dataAndMethodsContext.gymMemberDialogData;

    const {
        deleteFileName,
        imageUrl,
        blob,
        editMode,
    } = dataAndMethodsContext.imageEditorData;

    // edit logged in gymMember save to database
    // get gymMembers for restaurant from database
    // update restaurant with these new gymMembers and save to database
    // update state for gymMember, restaurantGymMembers
    const saveGymMemberEditMe = async () => {
        let myGymMember: any = {};
        myGymMember.id = id;
        myGymMember.firstName = firstName
        myGymMember.lastName = lastName
        myGymMember.bio = bio
        myGymMember.email = email
        myGymMember.exerciseIdsJSON = exerciseIdsJSON
        myGymMember.teamMateIdsJSON = teamMateIdsJSON
        myGymMember.gymDayIdsJSON = gymDayIdsJSON
        myGymMember.imageUrl = imageUrl;
        myGymMember.dataJSON = dataJSON;
        await saveImageToDatabase(deleteFileName, imageUrl, blob, editMode, idToken, customId)
        await putGymMember(myGymMember, idToken, customId)
        setGymMember(myGymMember);
    };

    const handleClose = () => {
        setGymMemberDialogOpen(false);
    };

    const handleSave = async () => {
        switch (dialogType) {
            case "EditMe":
                saveGymMemberEditMe()
                break;
            default:
        }
        setGymMemberDialogOpen(false);
    };

    const changeFirstName = (e: any) => {
        setGymMemberDialogDataItem('firstName', e.target.value);
    };

    const changeLastName = (e: any) => {
        setGymMemberDialogDataItem('lastName', e.target.value);
    };

    const changeBio = (e: any) => {
        setGymMemberDialogDataItem('bio', e.target.value);
    };

    let dialogTitle = '';

    if (dialogType === "EditMe") { dialogTitle = 'Edit my details' };

    let loggedInUserMessage = '';
    if (gymMember.id === id) {
        loggedInUserMessage = 'Logged in user ' + email
    }

    return (
        <div>
            <Dialog className={classes.root} open={gymMemberDialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
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
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Metrics</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid item xs={12}>
                                <MemberDataInventory />
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Button onClick={() => handleSave()} color="primary">
                        Add
                    </Button>
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

export default GymMemberDialog;