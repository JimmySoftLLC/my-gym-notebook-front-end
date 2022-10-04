import React, { useContext } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import { Tooltip } from '@material-ui/core';

const DefaultBotToolBar = () => {
  const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
  const { myStates } = dataAndMethodsContext;

  return (
    <>
      <Toolbar color='primary' component='div'>
        <Tooltip title='Help and information'>
          <IconButton
            aria-label=''
            color={myStates['info'] ? 'secondary' : 'primary'}
            onClick={() => dataAndMethodsContext.setMyState('info')}
          >
            <i className='fas fa-question'></i>
          </IconButton>
        </Tooltip>
      </Toolbar>
    </>
  );
};

export default DefaultBotToolBar;
