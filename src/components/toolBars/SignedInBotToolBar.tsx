import React, { Fragment, useContext } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import { Tooltip } from '@material-ui/core';

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
            exerciseIdsJSON: associate.exerciseIdsJSON,
            teamMateIdsJSON: associate.teamMateIdsJSON,
            gymDayIdsJSON: associate.gymDayIdsJSON,
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

    return (
        <Fragment>
            <Toolbar color="primary" component='div'>
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