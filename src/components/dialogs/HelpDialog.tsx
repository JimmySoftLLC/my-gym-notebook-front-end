import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import HelpItem0 from '../helpItems/HelpItem0';
import HelpItem1 from '../helpItems/HelpItem1';
import HelpItem2 from '../helpItems/HelpItem2';
import HelpItem3 from '../helpItems/HelpItem3';
import HelpItem4 from '../helpItems/HelpItem4';
import HelpItem5 from '../helpItems/HelpItem5';
import HelpItem6 from '../helpItems/HelpItem6';
import HelpItem7 from '../helpItems/HelpItem7';
import HelpItem8 from '../helpItems/HelpItem8';
import HelpItem9 from '../helpItems/HelpItem9';

import { websiteName } from '../../api/apiConstants';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      marginLeft: 0,
    },
  },
}));

const HelpDialog: any = () => {
  const classes = useStyles();

  const dataAndMethodsContext: any = useContext(DataAndMethodsContext);

  const { setMyStates } = dataAndMethodsContext;

  const { helpDialogStage, helpDialogOpen } = dataAndMethodsContext.myStates;

  const closeDialogClick = () => {
    let myNewStateChoices = JSON.parse(
      JSON.stringify(dataAndMethodsContext.myStates)
    );
    myNewStateChoices.helpDialogStage = 0;
    myNewStateChoices.helpDialogActive = false;
    myNewStateChoices.helpDialogOpen = false;
    window.localStorage.setItem(
      'iWantToDine.myStates',
      JSON.stringify(myNewStateChoices)
    );
    setMyStates(myNewStateChoices);
  };

  const tryItClick = () => {
    let myNewStateChoices = JSON.parse(
      JSON.stringify(dataAndMethodsContext.myStates)
    );
    myNewStateChoices.helpDialogActive = true;
    myNewStateChoices.helpDialogOpen = false;
    switch (myNewStateChoices.helpDialogStage) {
      case 1:
        resetPages(myNewStateChoices);
        break;
      case 2:
        resetPages(myNewStateChoices);
        myNewStateChoices['exercises'] = true;
        break;
      case 3:
        resetPages(myNewStateChoices);
        myNewStateChoices['exercises'] = true;
        break;
      case 4:
        resetPages(myNewStateChoices);
        myNewStateChoices['exercises'] = true;
        break;
      case 5:
        resetPages(myNewStateChoices);
        myNewStateChoices['exercises'] = true;
        break;
      case 6:
        resetPages(myNewStateChoices);
        myNewStateChoices['restaurants'] = true;
        myNewStateChoices.helpDialogActive = false;
        break;
      case 7:
        resetPages(myNewStateChoices);
        myNewStateChoices['gymMembers'] = true;
        myNewStateChoices.helpDialogActive = false;
        break;
      case 8:
        resetPages(myNewStateChoices);
        myNewStateChoices['entertainmentItems'] = true;
        myNewStateChoices.helpDialogActive = false;
        break;
      case 9:
        resetPages(myNewStateChoices);
        myNewStateChoices['photoGallery'] = true;
        myNewStateChoices.helpDialogActive = false;
        break;
      case 10:
        resetPages(myNewStateChoices);
        myNewStateChoices['info'] = true;
        myNewStateChoices.helpDialogActive = false;
        break;
      default:
        break;
    }
    window.localStorage.setItem(
      'iWantToDine.myStates',
      JSON.stringify(myNewStateChoices)
    );
    setMyStates(myNewStateChoices);
  };

  const resetPages = (myNewStateChoices: any) => {
    myNewStateChoices['restaurants'] = false;
    myNewStateChoices['exercises'] = false;
    myNewStateChoices['gymMembers'] = false;
    myNewStateChoices['info'] = false;
    myNewStateChoices['gymDaysDetail'] = false;
    myNewStateChoices['photoGallery'] = false;
  };

  const prevClick = () => {
    let myNewStateChoices = JSON.parse(
      JSON.stringify(dataAndMethodsContext.myStates)
    );
    myNewStateChoices.helpDialogStage--;
    window.localStorage.setItem(
      'iWantToDine.myStates',
      JSON.stringify(myNewStateChoices)
    );
    setMyStates(myNewStateChoices);
  };

  const nextClick = () => {
    let myNewStateChoices = JSON.parse(
      JSON.stringify(dataAndMethodsContext.myStates)
    );
    myNewStateChoices.helpDialogStage++;
    window.localStorage.setItem(
      'iWantToDine.myStates',
      JSON.stringify(myNewStateChoices)
    );
    setMyStates(myNewStateChoices);
  };

  return (
    <>
      <Dialog
        className={classes.root}
        open={helpDialogOpen}
        onClose={closeDialogClick}
        aria-labelledby='form-dialog-title'
      >
        {helpDialogStage === 0 && (
          <>
            <DialogTitle id='form-dialog-title'>
              Welcome to {websiteName}
            </DialogTitle>
            <DialogContent>
              <p className='p'>
                Click FIRST HELP TOPIC to learn how to use {websiteName} .
              </p>
              <p className='p'>Click END HELP to explore yourself.</p>
              <p className='p'>
                Start tutorial anytime under the help and information page{' '}
                <i className='fas fa-question'></i>.
              </p>
              <p className='p'>Enjoy!</p>
            </DialogContent>
          </>
        )}
        {helpDialogStage === 1 && (
          <>
            <DialogTitle id='form-dialog-title'>Main pages</DialogTitle>
            <DialogContent>
              <HelpItem0 />
            </DialogContent>
          </>
        )}

        {helpDialogStage === 2 && (
          <>
            <DialogTitle id='form-dialog-title'>Menu Categories</DialogTitle>
            <DialogContent>
              <HelpItem1 />
            </DialogContent>
          </>
        )}

        {helpDialogStage === 3 && (
          <>
            <DialogTitle id='form-dialog-title'>Food Categories</DialogTitle>
            <DialogContent>
              <HelpItem2 />
            </DialogContent>
          </>
        )}

        {helpDialogStage === 4 && (
          <>
            <DialogTitle id='form-dialog-title'>Price Range</DialogTitle>
            <DialogContent>
              <HelpItem3 />
            </DialogContent>
          </>
        )}

        {helpDialogStage === 5 && (
          <>
            <DialogTitle id='form-dialog-title'>Price Range</DialogTitle>
            <DialogContent>
              <HelpItem4 />
            </DialogContent>
          </>
        )}

        {helpDialogStage === 6 && (
          <>
            <DialogTitle id='form-dialog-title'>
              Restaurant listings
            </DialogTitle>
            <DialogContent>
              <HelpItem5 />
            </DialogContent>
          </>
        )}

        {helpDialogStage === 7 && (
          <>
            <DialogTitle id='form-dialog-title'>
              Restaurant gymMembers
            </DialogTitle>
            <DialogContent>
              <HelpItem6 />
            </DialogContent>
          </>
        )}

        {helpDialogStage === 8 && (
          <>
            <DialogTitle id='form-dialog-title'>
              Entertainment Categories
            </DialogTitle>
            <DialogContent>
              <HelpItem7 />
            </DialogContent>
          </>
        )}

        {helpDialogStage === 9 && (
          <>
            <DialogTitle id='form-dialog-title'>Photo Wall</DialogTitle>
            <DialogContent>
              <HelpItem8 />
            </DialogContent>
          </>
        )}

        {helpDialogStage === 10 && (
          <>
            <DialogTitle id='form-dialog-title'>
              Help and Information
            </DialogTitle>
            <DialogContent>
              <HelpItem9 />
            </DialogContent>
          </>
        )}

        <DialogActions>
          {helpDialogStage === 0 && (
            <Button onClick={() => nextClick()} color='primary'>
              First help topic
            </Button>
          )}
          {helpDialogStage > 1 && helpDialogStage < 11 && (
            <Button onClick={() => prevClick()} color='primary'>
              Prev
            </Button>
          )}
          {helpDialogStage < 10 && helpDialogStage !== 0 && (
            <Button onClick={() => nextClick()} color='primary'>
              Next
            </Button>
          )}
          {helpDialogStage > 0 && helpDialogStage < 11 && (
            <Button onClick={() => tryItClick()} color='primary'>
              Try it
            </Button>
          )}
        </DialogActions>
        <DialogActions>
          <Button onClick={() => closeDialogClick()} color='default'>
            End help
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default HelpDialog;
