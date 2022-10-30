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
import putExercise from '../../model/exercise/putExercise';
import sortExercises from '../../model/exercise/sortExercise';
import getExercises from '../../model/exercise/getExercises';
import putGymMember from '../../model/gymMember/putGymMember';
import VideoEmbed from '../VideoEmbed';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      marginLeft: 0,
    },
  },
}));

const ExerciseDialog: any = () => {
  const classes = useStyles();
  const dataAndMethodsContext: any = useContext(DataAndMethodsContext);

  const { id, title, dataJSON, categoryJSON, videoUrl, dialogType } =
    dataAndMethodsContext.exerciseItemDialogData;

  const {
    exerciseItemDialogOpen,
    setExerciseDialogDataCategory,
    setExerciseDialogOpen,
    setExerciseDialogDataItem,
    idToken,
    customId,
    setExercises,
    gymMember,
    setGymMember,
    myStates,
  } = dataAndMethodsContext;

  const handleClose = () => {
    setExerciseDialogOpen(false);
  };

  const handleSave = () => {
    switch (dialogType) {
      case 'Edit':
        saveExercise();
        break;
      case 'Add':
        saveExerciseAdd();
        break;
      default:
    }
    setExerciseDialogOpen(false);
  };

  const saveExercise = async () => {
    let newExercise: any = {};
    newExercise.id = id;
    newExercise.title = title;
    newExercise.dataJSON = dataJSON;
    newExercise.categoryJSON = categoryJSON;
    newExercise.videoUrl = videoUrl;
    await putExercise(newExercise, idToken, customId);
    let myExercises = await getExercises(gymMember.exerciseIdsJSON);
    myExercises = await sortExercises(myExercises, myStates);
    setExercises(myExercises);
  };

  const saveExerciseAdd = async () => {
    let newExercise: any = {};
    newExercise.id = id;
    newExercise.title = title;
    newExercise.dataJSON = dataJSON;
    newExercise.categoryJSON = categoryJSON;
    newExercise.videoUrl = videoUrl;
    await putExercise(newExercise, idToken, customId);
    let myNewGymMember = JSON.parse(JSON.stringify(gymMember));
    myNewGymMember.exerciseIdsJSON.push(id);
    await putGymMember(myNewGymMember, idToken, customId);
    setGymMember(myNewGymMember);
    let myExercises = await getExercises(myNewGymMember.exerciseIdsJSON);
    myExercises = await sortExercises(myExercises, myStates);
    setExercises(myExercises);
  };

  const changeTitle = (e: any) => {
    setExerciseDialogDataItem('title', e.target.value);
  };

  const changeData = (e: any) => {
    const changedData = e.target.value.split(/\r?\n/);
    setExerciseDialogDataItem('dataJSON', changedData);
  };

  const changeVideoUrl = (e: any) => {
    setExerciseDialogDataItem('videoUrl', e.target.value);
  };

  const checkIfPresent = (value: any) => {
    if (categoryJSON) {
      if (categoryJSON.indexOf(value) !== -1) {
        return true;
      }
    }
    return false;
  };

  const dataJSONString = dataJSON
    .map(function (item: string) {
      return item;
    })
    .join('\n');

  return (
    <div>
      <Dialog
        className={classes.root}
        open={exerciseItemDialogOpen}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>
          {dialogType + ' exercise'}
        </DialogTitle>
        <DialogContent>
          <TextField
            id='title'
            label='Title'
            type='text'
            fullWidth
            variant='filled'
            size='small'
            value={title}
            onChange={changeTitle}
          />
          <TextField
            id='data'
            label='Data'
            type='text'
            fullWidth
            variant='filled'
            multiline={true}
            minRows='3'
            value={dataJSONString}
            onChange={changeData}
          />
          <p>Exercise Category</p>
          <Toolbar>
            <div>
              <Tooltip title='Strength Training'>
                <IconButton
                  aria-label=''
                  color={checkIfPresent('strength') ? 'inherit' : 'default'}
                  onClick={() => setExerciseDialogDataCategory('strength')}
                >
                  <i className='fas fa-dumbbell'></i>
                </IconButton>
              </Tooltip>
              <Tooltip title='Aerobic Training'>
                <IconButton
                  aria-label=''
                  color={checkIfPresent('aerobic') ? 'inherit' : 'default'}
                  onClick={() => setExerciseDialogDataCategory('aerobic')}
                >
                  <i className='fas fa-running'></i>
                </IconButton>
              </Tooltip>
              <Tooltip title='Balance Training'>
                <IconButton
                  aria-label=''
                  color={checkIfPresent('balance') ? 'inherit' : 'default'}
                  onClick={() => setExerciseDialogDataCategory('balance')}
                >
                  <i className='fas fa-balance-scale'></i>
                </IconButton>
              </Tooltip>
              <Tooltip title='Agility Training'>
                <IconButton
                  aria-label=''
                  color={checkIfPresent('agility') ? 'inherit' : 'default'}
                  onClick={() => setExerciseDialogDataCategory('agility')}
                >
                  <i className='icon-dancing'></i>
                </IconButton>
              </Tooltip>
              <Tooltip title='Flexibility and Mobility Training'>
                <IconButton
                  aria-label=''
                  color={
                    checkIfPresent('flexibilityMobility')
                      ? 'inherit'
                      : 'default'
                  }
                  onClick={() =>
                    setExerciseDialogDataCategory('flexibilityMobility')
                  }
                >
                  <i className='fas fa-child'></i>
                </IconButton>
              </Tooltip>
            </div>
          </Toolbar>
          <TextField
            id='videoUrl'
            label='Video Url'
            type='text'
            fullWidth
            variant='filled'
            multiline={false}
            size='small'
            value={videoUrl}
            onChange={changeVideoUrl}
          />
          <VideoEmbed embedId={videoUrl} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='default'>
            Cancel
          </Button>
          <Button onClick={() => handleSave()} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ExerciseDialog;
