import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import DeleteConfirmDialogContext from '../../context/deleteConfirmDialog/deleteConfirmDialogContext';
import associatesAccessLevel from '../../model/associate/associatesAccessLevel';
import sortMenuItems from '../../model/menuItem/sortMenuItems';
import deleteMenuItemFromRestaurant from '../../model/menuItem/deleteMenuItemFromRestaurant';
import updateMenuDaysWithMenuItemChanges from '../../model/menuDay/updateMenuDaysWithMenuItemChanges';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiButton-root': {
            margin: theme.spacing(1),
            marginLeft: 0,
        },
    },
}));

const MenuItemCardInventory = ({ menuItem }: any) => {
    const classes = useStyles();

    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const {
        restaurantMenuItems,
        setMenuItemDialogData,
        setMenuItemDialogOpen,
        idToken,
        customId,
        setRestaurantMenuItems,
        associatesRestaurants,
        restaurantId,
        myStates,
        associate,
        setRestaurantMenuDays,
        restaurantMenuDays,
    } = dataAndMethodsContext;

    const deleteConfirmDialogContext: any = useContext(DeleteConfirmDialogContext);
    const { setDeleteConfirmDialog } = deleteConfirmDialogContext;

    const handleClickMenuItemEdit = (menuId: any) => {
        for (let i = 0; i < restaurantMenuItems.length; i++) {
            if (menuId === restaurantMenuItems[i].id) {
                let myEditItem = {
                    title: restaurantMenuItems[i].title,
                    description: restaurantMenuItems[i].description,
                    categoryJSON: restaurantMenuItems[i].categoryJSON,
                    price: restaurantMenuItems[i].price,
                    id: restaurantMenuItems[i].id,
                    restaurant: restaurantMenuItems[i].restaurant,
                    dialogType: 'Edit',
                }
                setMenuItemDialogData(myEditItem);
                setMenuItemDialogOpen(true);
                break;
            }
        }
    };

    const handleClickMenuItemCopy = (menuId: any) => {
        for (let i = 0; i < restaurantMenuItems.length; i++) {
            if (menuId === restaurantMenuItems[i].id) {
                let myEditItem = {
                    title: restaurantMenuItems[i].title,
                    description: restaurantMenuItems[i].description,
                    categoryJSON: restaurantMenuItems[i].categoryJSON,
                    price: restaurantMenuItems[i].price,
                    id: uuidv4(),
                    restaurant: restaurantMenuItems[i].restaurant,
                    dialogType: "Add",
                }
                setMenuItemDialogData(myEditItem);
                setMenuItemDialogOpen(true);
                break;
            }
        }
    };

    const loadDeleteMenuItemDialog = (menuId: any) => {
        for (let i = 0; i < restaurantMenuItems.length; i++) {
            if (menuId === restaurantMenuItems[i].id) {
                setDeleteConfirmDialog(true,
                    restaurantMenuItems[i].title,
                    'deleteMenuItem',
                    menuId,
                    deleteMenuItemById);
                break;
            }
        }
    };

    const deleteMenuItemById = async (menuId: any) => {
        let myNewMenuItems = await deleteMenuItemFromRestaurant(menuId, restaurantId, associatesRestaurants, true, idToken, customId)
        myNewMenuItems = await sortMenuItems(myNewMenuItems, myStates);
        let myNewMenuDays = await updateMenuDaysWithMenuItemChanges(restaurantMenuDays, myNewMenuItems, idToken, customId)
        setRestaurantMenuItems(myNewMenuItems)
        setRestaurantMenuDays(myNewMenuDays)
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
            case 'carryout':
                items.push(<i className='fas fa-shopping-bag' key={menuItem.id + "_carryout"} style={{ paddingRight: '.25rem' }}></i>)
                break;
            default:
        }
    }

    // let canRead = false;
    // associatesAccessLevel(associatesRestaurants, restaurantId, associate.id) === "read" ? canRead = true : canRead = false
    let canEdit = false;
    associatesAccessLevel(associatesRestaurants, restaurantId, associate.id) === "edit" ? canEdit = true : canEdit = false
    let canAdmin = false;
    associatesAccessLevel(associatesRestaurants, restaurantId, associate.id) === "admin" ? canAdmin = true : canAdmin = false

    return (
        <div className='card'>
            <h4><i className="fas fa-book-open"></i>{' - '}{items}{menuItem.title}{' - '}{menuItem.price}
            </h4>
            {myStates['showDescription'] && <p>{menuItem.description}</p>}
            <div className={classes.root} >
                {(canEdit || canAdmin) && <Button variant="outlined" color="primary" onClick={() => handleClickMenuItemEdit(menuItem.id)}>
                    <i className="fas fa-edit"></i>
                </Button>}
                {canAdmin && <Button variant="outlined" color="primary" onClick={() => handleClickMenuItemCopy(menuItem.id)}>
                    <i className="fas fa-copy"></i>
                </Button>}
                {canAdmin && <Button variant="outlined" color="primary" onClick={() => loadDeleteMenuItemDialog(menuItem.id)}>
                    <i className="fas fa-trash"></i>
                </Button>}
            </div>
        </div>
    );
};

export default MenuItemCardInventory;