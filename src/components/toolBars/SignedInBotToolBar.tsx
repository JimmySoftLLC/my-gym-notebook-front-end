import React, { Fragment, useContext } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import { Tooltip } from '@material-ui/core';
import sortMenuItems from '../../model/menuItem/sortMenuItems';
import {
    noSelectedRestaurant,
} from '../../api/apiConstants';

const SignedInBotToolBar = () => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        setAuthToken,
        setIdToken,
        setCustomId,
        setLogInType,
        setAssociateDialogData,
        setAssociateDialogOpen,
        associate,
        restaurantId,
        myStates,
        setMyState,
        restaurantMenuItems,
        setRestaurantMenuItems,
        setRestaurantMenuDays,
        setRestaurantAssociates,
        setImageEditorData,
    } = dataAndMethodsContext;

    const logOut = () => {
        setAuthToken('');
        setIdToken('');
        setCustomId('');
        setLogInType('default');
        setRestaurantMenuItems([]);
        setRestaurantMenuDays([]);
        setRestaurantAssociates([]);
    }

    const handleEditAssociate = () => {
        let myAssociateData = {
            id: associate.id,
            firstName: associate.firstName,
            lastName: associate.lastName,
            jobTitle: associate.jobTitle,
            bio: associate.bio,
            email: associate.email,
            restaurantIdsJSON: associate.restaurantIdsJSON,
            imageUrl: associate.imageUrl,
            hideAssociate: associate.hideAssociate,
            dialogType: "EditMe",
        };
        setAssociateDialogData(myAssociateData);
        let myImageEditorItem = {
            imageUrl: associate.imageUrl,
            editMode: 'none',
            deleteFileName: '',
            width: 1,
            height: 1,
            aspectRatio: 1,
            blob: '',
            showDelete: true,
        }
        setImageEditorData(myImageEditorItem);
        setAssociateDialogOpen(true);
    };

    const sortBy = async (sortType: any) => {
        let myRestaurantMenuItems = JSON.parse(JSON.stringify(restaurantMenuItems))
        myRestaurantMenuItems = await sortMenuItems(myRestaurantMenuItems, sortType);
        setMyState(sortType)
        setRestaurantMenuItems(myRestaurantMenuItems);
    }

    return (
        <Fragment>
            <Toolbar color="primary" component='div'>
                {(restaurantId !== noSelectedRestaurant && myStates['menuSettings']) &&
                    <Tooltip title="Show description">
                        <IconButton aria-label=""
                            color={myStates['showDescription'] ? "secondary" : "primary"}
                            onClick={() => dataAndMethodsContext.setMyState('showDescription')}>
                            <i className="fas fa-align-left"></i>
                        </IconButton>
                    </Tooltip>}
                {(restaurantId !== noSelectedRestaurant && myStates['menuSettings']) &&
                    <Tooltip title="Sort alphabetically">
                        <IconButton aria-label=""
                            color={myStates['sortTitle'] ? "secondary" : "primary"}
                            onClick={() => sortBy('sortTitle')}>
                            <i className="fas fa-sort-alpha-down"></i>
                        </IconButton>
                    </Tooltip>}
                {(restaurantId !== noSelectedRestaurant && myStates['menuSettings']) &&
                    <Tooltip title="Sort by price">
                        <IconButton aria-label=""
                            color={myStates['sortPrice'] ? "secondary" : "primary"}
                            onClick={() => sortBy('sortPrice')}>
                            <i className="icon-sort-dollar"></i>
                        </IconButton>
                    </Tooltip>}
                <Tooltip title="Edit associate details">
                    <IconButton aria-label=""
                        color="primary"
                        onClick={() => handleEditAssociate()}>
                        <i className="fas fa-user-edit"></i>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Log out">
                    <IconButton aria-label=""
                        color="primary"
                        onClick={() => logOut()}>
                        <i className="fas fa-sign-out-alt"></i>
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </Fragment>
    );
}

export default SignedInBotToolBar;