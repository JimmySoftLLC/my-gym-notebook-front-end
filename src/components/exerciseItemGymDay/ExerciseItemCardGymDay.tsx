import React, { useContext } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const ExerciseItemCardGymDay = ({ ExerciseItem }: any) => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const { GymDayDialogData, setGymDayDialogData
    } = dataAndMethodsContext;

    let ExerciseItemSelected = false;
    for (let j = 0; j < GymDayDialogData.ExerciseItemIdsJSON.length; j++) {
        if (ExerciseItem.id === GymDayDialogData.ExerciseItemIdsJSON[j]) {
            ExerciseItemSelected = true;
            break;
        }
    }

    const changeExerciseItemSelected = () => {
        let myNewGymDayDialogData = JSON.parse(JSON.stringify(GymDayDialogData))
        let myIndex = myNewGymDayDialogData.ExerciseItemIdsJSON.indexOf(ExerciseItem.id, 0)
        if (myIndex !== -1) {
            myNewGymDayDialogData.ExerciseItemIdsJSON.splice(myIndex, 1)
        } else {
            myNewGymDayDialogData.ExerciseItemIdsJSON.push(ExerciseItem.id)
        }
        setGymDayDialogData(myNewGymDayDialogData)
    }

    const items = []
    for (let i = 0; i < ExerciseItem.categoryJSON.length; i++) {
        switch (ExerciseItem.categoryJSON[i]) {
            case 'meat':
                items.push(<i className='icon-tbone' key={ExerciseItem.id + "_meat"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'pork':
                items.push(<i className='icon-ham' key={ExerciseItem.id + "_pork"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'lamb':
                items.push(<i className='icon-lamb' key={ExerciseItem.id + "_lamb"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'poultry':
                items.push(<i className='fas fa-feather' key={ExerciseItem.id + "_feather"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'fish':
                items.push(<i className='fas fa-fish' key={ExerciseItem.id + "_fish"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'shellfish':
                items.push(<i className='icon-shell' key={ExerciseItem.id + "_shell"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'vegetarian':
                items.push(<i className='fas fa-seedling' key={ExerciseItem.id + "_seedling"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'cheese':
                items.push(<i className='fas fa-cheese' key={ExerciseItem.id + "_cheese"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'pasta':
                items.push(<i className='icon-spaghetti' key={ExerciseItem.id + "_pasta"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'flexibilityMobility':
                items.push(<i className='fas fa-hamburger' key={ExerciseItem.id + "_hamburger"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'dessert':
                items.push(<i className='fas fa-birthday-cake' key={ExerciseItem.id + "_dessert"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'drinks':
                items.push(<i className='fas fa-birthday-cake' key={ExerciseItem.id + "_dessert"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'wine':
                items.push(<i className='fas fa-wine-glass' key={ExerciseItem.id + "_dessert"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'beer':
                items.push(<i className='fas fa-beer' key={ExerciseItem.id + "_dessert"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'coffee':
                items.push(<i className='fas fa-coffee' key={ExerciseItem.id + "_dessert"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'strength':
                items.push(<i className='fas fa-tag' key={ExerciseItem.id + "_strength"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'carryout':
                items.push(<i className='fas fa-shopping-bag' key={ExerciseItem.id + "_carryout"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            default:
        }
    }

    return (
        <div className='card'>
            <h4>
                <Checkbox
                    checked={ExerciseItemSelected}
                    onChange={changeExerciseItemSelected}
                    name="checked"
                    color="primary"
                />
                {' - '}{items}{ExerciseItem.title}
            </h4>
        </div>
    );
};

export default ExerciseItemCardGymDay;