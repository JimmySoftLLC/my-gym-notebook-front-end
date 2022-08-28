import React, { Fragment, useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import DataAndMethodsContext from '../../context/dataAndMethods/dataAndMethodsContext';
import { Tooltip } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import ExerciseItem from '@material-ui/core/MenuItem';

const CategoriesMenu = () => {
    const dataAndMethodsContext: any = useContext(DataAndMethodsContext);
    const { myStates, setMyState } = dataAndMethodsContext;
    const [anchorCategoryMenu, setAnchorCategoryMenu] = React.useState(null);

    const closeCategoryMenu = () => {
        setAnchorCategoryMenu(null);
    };

    const categoryMenuClick = (event: any) => {
        setAnchorCategoryMenu(event.currentTarget);
    };

    const handleCategoryClick = (myState: any) => {
        setMyState(myState)
        if (myStates.helpDialogStage === 2 && myStates.helpDialogActive) { closeCategoryMenu() }
    }

    return (
        <Fragment>
            {myStates.exerciseItems && <Tooltip title="Select menu category">
                <IconButton aria-controls="simple-menu" aria-haspopup="true"
                    color="inherit"
                    onClick={categoryMenuClick}>
                    <i className="fas fa-list"></i>
                </IconButton>
            </Tooltip>}
            <Menu
                id="price-menu"
                anchorEl={anchorCategoryMenu}
                keepMounted
                open={Boolean(anchorCategoryMenu)}
                onClose={closeCategoryMenu}
            >
                <ExerciseItem onClick={closeCategoryMenu}>
                    <IconButton aria-label=""
                        color={"primary"}
                    >
                        <i className="fas fa-times"></i>
                    </IconButton>
                </ExerciseItem>
                <ExerciseItem>
                    {myStates.exerciseItems && <Tooltip title="Daily strength">
                        <IconButton aria-label="" color={myStates['strength'] ? "secondary" : "default"}
                            onClick={() => handleCategoryClick('strength')}
                        >
                            <i className="fas fa-tag"></i>
                        </IconButton>
                    </Tooltip>}
                </ExerciseItem>
                <ExerciseItem>
                    {myStates.exerciseItems && <Tooltip title="Soup">
                        <IconButton aria-label="" color={myStates['aerobic'] ? "secondary" : "default"}
                            onClick={() => handleCategoryClick('aerobic')}
                        >
                            <i className="icon-aerobic"></i>
                        </IconButton>
                    </Tooltip>}
                </ExerciseItem>
                <ExerciseItem>
                    {myStates.exerciseItems && <Tooltip title="Salad">
                        <IconButton aria-label="" color={myStates['balance'] ? "secondary" : "default"}
                            onClick={() => handleCategoryClick('balance')}
                        >
                            <i className="icon-balance"></i>
                        </IconButton>
                    </Tooltip>}
                </ExerciseItem>
                <ExerciseItem>
                    {myStates.exerciseItems && <Tooltip title="Appetizers">
                        <IconButton aria-label="" color={myStates['agility'] ? "secondary" : "default"}
                            onClick={() => handleCategoryClick('agility')}
                        >
                            <i className="icon-appetizer"></i>
                        </IconButton>
                    </Tooltip>}
                </ExerciseItem>
                <ExerciseItem>
                    {myStates.exerciseItems && <Tooltip title="Sandwiches">
                        <IconButton aria-label="" color={myStates['flexibilityMobility'] ? "secondary" : "default"}
                            onClick={() => handleCategoryClick('flexibilityMobility')}
                        >
                            <i className='fas fa-hamburger'></i>
                        </IconButton>
                    </Tooltip>}
                </ExerciseItem>
                <ExerciseItem>
                    {myStates.exerciseItems && <Tooltip title="Pizza">
                        <IconButton aria-label="" color={myStates['pizza'] ? "secondary" : "default"}
                            onClick={() => handleCategoryClick('pizza')}
                        >
                            <i className="fas fa-pizza-slice"></i>
                        </IconButton>
                    </Tooltip>}
                </ExerciseItem>
                <ExerciseItem>
                    {myStates.exerciseItems && <Tooltip title="Pasta">
                        <IconButton aria-label="" color={myStates['pasta'] ? "secondary" : "default"}
                            onClick={() => handleCategoryClick('pasta')}
                        >
                            <i className='icon-spaghetti'></i>
                        </IconButton>
                    </Tooltip>}
                </ExerciseItem>
                <ExerciseItem>
                    {myStates.exerciseItems && <Tooltip title="Entrees">
                        <IconButton aria-label="" color={myStates['entree'] ? "secondary" : "default"}
                            onClick={() => handleCategoryClick('entree')}
                        >
                            <i className="fas fa-concierge-bell"></i>
                        </IconButton>
                    </Tooltip>}
                </ExerciseItem>
                <ExerciseItem>
                    {myStates.exerciseItems && <Tooltip title="Dessert">
                        <IconButton aria-label="" color={myStates['dessert'] ? "secondary" : "default"}
                            onClick={() => handleCategoryClick('dessert')}
                        >
                            <i className="fas fa-birthday-cake"></i>
                        </IconButton>
                    </Tooltip>}
                </ExerciseItem>
                <ExerciseItem>
                    {myStates.exerciseItems && <Tooltip title="Drinks">
                        <IconButton aria-label="" color={myStates['drinks'] ? "secondary" : "default"}
                            onClick={() => handleCategoryClick('drinks')}
                        >
                            <i className="fas fa-cocktail"></i>
                        </IconButton>
                    </Tooltip>}
                </ExerciseItem>
                <ExerciseItem>
                    {myStates.exerciseItems && <Tooltip title="Wine">
                        <IconButton aria-label="" color={myStates['wine'] ? "secondary" : "default"}
                            onClick={() => handleCategoryClick('wine')}
                        >
                            <i className="fas fa-wine-glass"></i>
                        </IconButton>
                    </Tooltip>}
                </ExerciseItem>
                <ExerciseItem>
                    {myStates.exerciseItems && <Tooltip title="Beer">
                        <IconButton aria-label="" color={myStates['beer'] ? "secondary" : "default"}
                            onClick={() => handleCategoryClick('beer')}
                        >
                            <i className="fas fa-beer"></i>
                        </IconButton>
                    </Tooltip>}
                </ExerciseItem>
                <ExerciseItem>
                    {myStates.exerciseItems && <Tooltip title="Coffee">
                        <IconButton aria-label="" color={myStates['coffee'] ? "secondary" : "default"}
                            onClick={() => handleCategoryClick('coffee')}
                        >
                            <i className="fas fa-coffee"></i>
                        </IconButton>
                    </Tooltip>}
                </ExerciseItem>
                <ExerciseItem>
                    {myStates.exerciseItems && <Tooltip title="Kids menu">
                        <IconButton aria-label="" color={myStates['kids'] ? "secondary" : "default"}
                            onClick={() => handleCategoryClick('kids')}
                        >
                            <i className="fas fa-child"></i>
                        </IconButton>
                    </Tooltip>}
                </ExerciseItem>
            </Menu>
        </Fragment>
    );
}

export default CategoriesMenu;