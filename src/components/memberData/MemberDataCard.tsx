import React, { useContext } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const MemberDataCard = ({ DataItem }: any) => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const { MemberDataDialogData, setMemberData
    } = dataAndMethodsContext;

    let DataItemSelected = false;
    for (let j = 0; j < MemberDataDialogData.exerciseItemIdsJSON.length; j++) {
        if (DataItem.id === MemberDataDialogData.exerciseItemIdsJSON[j]) {
            DataItemSelected = true;
            break;
        }
    }

    const changeDataItemSelected = () => {
        let myNewGymDayDialogData = JSON.parse(JSON.stringify(MemberDataDialogData))
        let myIndex = myNewGymDayDialogData.exerciseItemIdsJSON.indexOf(DataItem.id, 0)
        if (myIndex !== -1) {
            myNewGymDayDialogData.exerciseItemIdsJSON.splice(myIndex, 1)
        } else {
            myNewGymDayDialogData.exerciseItemIdsJSON.push(DataItem.id)
        }
        setMemberData(myNewGymDayDialogData)
    }

    return (
        <div className='card'>
            <h4>
                <Checkbox
                    checked={DataItemSelected}
                    onChange={changeDataItemSelected}
                    name="checked"
                    color="primary"
                />
                {' - '}{DataItem.title}
            </h4>
        </div>
    );
};

export default MemberDataCard;