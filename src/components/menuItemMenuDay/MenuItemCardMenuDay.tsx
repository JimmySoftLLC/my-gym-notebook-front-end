import React, { useContext } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';

const MenuItemCardMenuDay = ({ menuItem }: any) => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const { menuDayDialogData, setMenuDayDialogData
    } = dataAndMethodsContext;

    let menuItemSelected = false;
    for (let j = 0; j < menuDayDialogData.menuItemIdsJSON.length; j++) {
        if (menuItem.id === menuDayDialogData.menuItemIdsJSON[j]) {
            menuItemSelected = true;
            break;
        }
    }

    const changeMenuItemSelected = () => {
        let myNewMenuDayDialogData = JSON.parse(JSON.stringify(menuDayDialogData))
        let myIndex = myNewMenuDayDialogData.menuItemIdsJSON.indexOf(menuItem.id, 0)
        if (myIndex !== -1) {
            myNewMenuDayDialogData.menuItemIdsJSON.splice(myIndex, 1)
        } else {
            myNewMenuDayDialogData.menuItemIdsJSON.push(menuItem.id)
        }
        setMenuDayDialogData(myNewMenuDayDialogData)
    }

    const items = []
    for (let i = 0; i < menuItem.categoryJSON.length; i++) {
        switch (menuItem.categoryJSON[i]) {
            case 'meat':
                items.push(<i className='icon-tbone' key={menuItem.id + "_meat"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'pork':
                items.push(<i className='icon-ham' key={menuItem.id + "_pork"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'lamb':
                items.push(<i className='icon-lamb' key={menuItem.id + "_lamb"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'poultry':
                items.push(<i className='fas fa-feather' key={menuItem.id + "_feather"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'fish':
                items.push(<i className='fas fa-fish' key={menuItem.id + "_fish"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'shellfish':
                items.push(<i className='icon-shell' key={menuItem.id + "_shell"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'vegetarian':
                items.push(<i className='fas fa-seedling' key={menuItem.id + "_seedling"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'cheese':
                items.push(<i className='fas fa-cheese' key={menuItem.id + "_cheese"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'pasta':
                items.push(<i className='icon-spaghetti' key={menuItem.id + "_pasta"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'sandwich':
                items.push(<i className='fas fa-hamburger' key={menuItem.id + "_hamburger"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'dessert':
                items.push(<i className='fas fa-birthday-cake' key={menuItem.id + "_dessert"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'drinks':
                items.push(<i className='fas fa-birthday-cake' key={menuItem.id + "_dessert"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'wine':
                items.push(<i className='fas fa-wine-glass' key={menuItem.id + "_dessert"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'beer':
                items.push(<i className='fas fa-beer' key={menuItem.id + "_dessert"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'coffee':
                items.push(<i className='fas fa-coffee' key={menuItem.id + "_dessert"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'specials':
                items.push(<i className='fas fa-tag' key={menuItem.id + "_specials"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            case 'carryout':
                items.push(<i className='fas fa-shopping-bag' key={menuItem.id + "_carryout"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            default:
        }
    }

    return (
        <div className='card'>
            <h4>
                <Checkbox
                    checked={menuItemSelected}
                    onChange={changeMenuItemSelected}
                    name="checked"
                    color="primary"
                />
                {' - '}{items}{menuItem.title}
            </h4>
        </div>
    );
};

export default MenuItemCardMenuDay;