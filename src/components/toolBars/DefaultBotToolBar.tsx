import React, { Fragment, useContext } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import { Tooltip } from '@material-ui/core';

const DefaultBotToolBar = () => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const { myStates, setMyState } = dataAndMethodsContext;

    return (
        <Fragment>
            <Toolbar color="primary" component='div'>
                <Tooltip title="Menu items">
                    <IconButton aria-label=""
                        color={myStates['menuItems'] ? "secondary" : "primary"}
                        onClick={() => setMyState('menuItems')}>
                        <i className="fas fa-book-open"></i>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Restaurants">
                    <IconButton aria-label=""
                        color={myStates['restaurants'] ? "secondary" : "primary"}
                        onClick={() => setMyState('restaurants')}>
                        <i className="fas fa-store"></i>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Restaurant associates">
                    <IconButton aria-label=""
                        color={myStates['associates'] ? "secondary" : "primary"}
                        onClick={() => setMyState('associates')}>
                        <i className="fas fa-users"></i>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Entertainment">
                    <IconButton aria-label="" color={myStates['entertainmentItems'] ? "secondary" : "primary"}
                        onClick={() => dataAndMethodsContext.setMyState('entertainmentItems')}
                    >
                        <i className="fas fa-music"></i>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Photo gallery">
                    <IconButton aria-label="" color={myStates['photoGallery'] ? "secondary" : "primary"}
                        onClick={() => dataAndMethodsContext.setMyState('photoGallery')}
                    >
                        <i className="fas fa-images"></i>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Help and information">
                    <IconButton aria-label="" color={myStates['info'] ? "secondary" : "primary"}
                        onClick={() => dataAndMethodsContext.setMyState('info')}
                    >
                        <i className="fas fa-question"></i>
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </Fragment>
    );
}

export default DefaultBotToolBar;
