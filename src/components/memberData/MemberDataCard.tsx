import React, { useContext } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const MemberDataCard = ({ DataItem }: any) => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const { MemberDataDialogData, setMemberData
    } = dataAndMethodsContext;

    let DataItemSelected = false;
    for (let j = 0; j < MemberDataDialogData.exerciseIdsJSON.length; j++) {
        if (DataItem.id === MemberDataDialogData.exerciseIdsJSON[j]) {
            DataItemSelected = true;
            break;
        }
    }

    const changeDataItemSelected = () => {
        let myNewGymDayDialogData = JSON.parse(JSON.stringify(MemberDataDialogData))
        let myIndex = myNewGymDayDialogData.exerciseIdsJSON.indexOf(DataItem.id, 0)
        if (myIndex !== -1) {
            myNewGymDayDialogData.exerciseIdsJSON.splice(myIndex, 1)
        } else {
            myNewGymDayDialogData.exerciseIdsJSON.push(DataItem.id)
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