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
        setGymMemberDialogData,
        setGymMemberDialogOpen,
        gymMember,
        setExerciseItems,
        setRestaurantGymDays,
        setRestaurantGymMembers,
        setImageEditorData,
    } = dataAndMethodsContext;

    const logOut = () => {
        setAuthToken('');
        setIdToken('');
        setCustomId('');
        setLogInType('default');
        setExerciseItems([]);
        setRestaurantGymDays([]);
        setRestaurantGymMembers([]);
    }

    const handleEditGymMember = () => {
        let myGymMemberData = {
            id: gymMember.id,
            firstName: gymMember.firstName,
            lastName: gymMember.lastName,
            jobTitle: gymMember.jobTitle,
            bio: gymMember.bio,
            email: gymMember.email,
            exerciseIdsJSON: gymMember.exerciseIdsJSON,
            teamMateIdsJSON: gymMember.teamMateIdsJSON,
            gymDayIdsJSON: gymMember.gymDayIdsJSON,
            imageUrl: gymMember.imageUrl,
            hideGymMember: gymMember.hideGymMember,
            dialogType: "EditMe",
        };
        setGymMemberDialogData(myGymMemberData);
        let myImageEditorItem = {
            imageUrl: gymMember.imageUrl,
            editMode: 'none',
            deleteFileName: '',
            width: 1,
            height: 1,
            aspectRatio: 1,
            blob: '',
            showDelete: true,
        }
        setImageEditorData(myImageEditorItem);
        setGymMemberDialogOpen(true);
    };

    return (
        <Fragment>
            <Toolbar color="primary" component='div'>
                <Tooltip title="Edit gymMember details">
                    <IconButton aria-label=""
                        color="primary"
                        onClick={() => handleEditGymMember()}>
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