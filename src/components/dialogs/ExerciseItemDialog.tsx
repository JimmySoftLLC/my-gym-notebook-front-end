import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import Toolbar from '@material-ui/core/Toolbar';
import { Tooltip } from '@material-ui/core';
import putExerciseItem from '../../model/exercise/putExercise';
import sortExerciseItems from '../../model/exercise/sortExercise';
import getExerciseItems from '../../model/exercise/getExercises';
import putGymMember from '../../model/gymMember/putGymMember';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            marginLeft: 0,
        },
    },
}));

const ExerciseItemDialog: any = () => {
    const classes = useStyles();
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);

    const {
        id,
        title,
        description,
        categoryJSON,
        dialogType,
    } = dataAndMethodsContext.exerciseItemDialogData;

    const {
        exerciseItemDialogOpen,
        setExerciseItemDialogDataCategory,
        setExerciseItemDialogOpen,
        setExerciseItemDialogDataItem,
        idToken,
        customId,
        setExerciseItems,
        gymMember,
        setGymMember,
        myStates,
    } = dataAndMethodsContext;

    const handleClose = () => {
        setExerciseItemDialogOpen(false);
    };

    const handleSave = () => {
        switch (dialogType) {
            case "Edit":
                saveExerciseItem()
                break;
            case "Add":
                saveExerciseItemAdd()
                break;
            default:
        }
        setExerciseItemDialogOpen(false);
    };

    const saveExerciseItem = async () => {
        let newExerciseItem: any = {}
        newExerciseItem.id = id;
        newExerciseItem.title = title;
        newExerciseItem.description = description;
        newExerciseItem.categoryJSON = categoryJSON;
        //console.log(exerciseItemsTableName, idToken, myNewExerciseItem, customId);
        await putExerciseItem(newExerciseItem, idToken, customId);
        let myExerciseItems = await getExerciseItems(gymMember.exerciseIdsJSON);
        myExerciseItems = await sortExerciseItems(myExerciseItems, myStates);
        setExerciseItems(myExerciseItems)
    };

    const saveExerciseItemAdd = async () => {
        let newExerciseItem: any = {}
        newExerciseItem.id = id;
        newExerciseItem.title = title;
        newExerciseItem.description = description;
        newExerciseItem.categoryJSON = categoryJSON;
        //console.log(exerciseItemsTableName, idToken, myNewExerciseItem, customId);
        await putExerciseItem(newExerciseItem, idToken, customId);
        let myNewGymMember = JSON.parse(JSON.stringify(gymMember))
        myNewGymMember.exerciseIdsJSON.push(id);
        await putGymMember(myNewGymMember, idToken, customId)
        setGymMember(myNewGymMember);
        let myExerciseItems = await getExerciseItems(myNewGymMember.exerciseIdsJSON);
        myExerciseItems = await sortExerciseItems(myExerciseItems, myStates);
        setExerciseItems(myExerciseItems)
    };

    const changeTitle = (e: any) => {
        setExerciseItemDialogDataItem('title', e.target.value)
    };

    const changeDescription = (e: any) => {
        setExerciseItemDialogDataItem('description', e.target.value)
    };

    const checkIfPresent = (value: any) => {
        if (categoryJSON) {
            if (categoryJSON.indexOf(value) !== -1) { return true }
        }
        return false
    }

    return (
        <div>
            <Dialog className={classes.root} open={exerciseItemDialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {dialogType + " exercise item"}</DialogTitle>
                <DialogContent>
                    <TextField
                        id="title"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="filled"
                        size="small"
                        value={title}
                        onChange={changeTitle}
                    />
                    <TextField
                        id="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="filled"
                        multiline={true}
                        rows="3"
                        value={description}
                        onChange={changeDescription}
                    />
                    <p>Exercise Category</p>
                    <Toolbar>
                        <div >
                            <Tooltip title="Strength Training">
                                <IconButton aria-label="" color={checkIfPresent('strength') ? "inherit" : "default"}
                                    onClick={() => setExerciseItemDialogDataCategory('strength')}
                                >
                                    <i className="fas fa-dumbbell"></i>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Aerobic Training">
                                <IconButton aria-label="" color={checkIfPresent('aerobic') ? "inherit" : "default"}
                                    onClick={() => setExerciseItemDialogDataCategory('aerobic')}
                                >
                                    <i className="fas fa-running"></i>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Balance Training">
                                <IconButton aria-label="" color={checkIfPresent('balance') ? "inherit" : "default"}
                                    onClick={() => setExerciseItemDialogDataCategory('balance')}
                                >
                                    <i className="fas fa-balance-scale"></i>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Agility Training">
                                <IconButton aria-label="" color={checkIfPresent('agility') ? "inherit" : "default"}
                                    onClick={() => setExerciseItemDialogDataCategory('agility')}
                                >
                                    <i className="icon-dancing"></i>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Flexibility and Mobility Training">
                                <IconButton aria-label="" color={checkIfPresent('flexibilityMobility') ? "inherit" : "default"}
                                    onClick={() => setExerciseItemDialogDataCategory('flexibilityMobility')}
                                >
                                    <i className="fas fa-child"></i>
                                </IconButton>
                            </Tooltip>
                        </div>
                    </Toolbar>
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

export default ExerciseItemDialog;


