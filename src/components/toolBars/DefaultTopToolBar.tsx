import React, { useContext } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import { Tooltip } from '@material-ui/core';
import { websiteName } from '../../api/apiConstants';

const DefaultTopToolBar = () => {
  const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
  const { myStates, setMyState } = dataAndMethodsContext;

  const setUpRegistrationDialog = () => {
    dataAndMethodsContext.setSignInRegDialogTitle('Member Sign In');
    dataAndMethodsContext.setSignInRegDialogType('signIn');
  };

  const goBack = () => {
    setMyState(myStates['lastState']);
  };

  return (
    <>
      <Toolbar>
        <div>
          {!myStates.gymDaysDetail && (
            <Tooltip title='Refresh'>
              <IconButton
                aria-label=''
                color='inherit'
                style={{ fontSize: '21px' }}
                href='/'
              >
                {websiteName}
              </IconButton>
            </Tooltip>
          )}
          {myStates.gymDaysDetail && (
            <Tooltip title='Go Back'>
              <IconButton
                aria-label=''
                color='inherit'
                onClick={() => goBack()}
              >
                <i className='fas fa-angle-left'></i>
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title='Log in'>
            <IconButton
              aria-label=''
              color='inherit'
              onClick={() => setUpRegistrationDialog()}
            >
              <i className='fas fa-sign-in-alt'></i>
            </IconButton>
          </Tooltip>
        </div>
      </Toolbar>
    </>
  );
};

export default DefaultTopToolBar;
