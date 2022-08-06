import putMenuDay from './putMenuDay';

const updateMenuDaysWithMenuItemChanges = async (myMenuDays: any, myMenuItems: any, myToken: any, myCustomId: any) => {
    for (let i = 0; i < myMenuDays.length; i++) {
        let myNewMenuIdsJSON = [];
        for (let j = 0; j < myMenuDays[i].menuItemIdsJSON.length; j++) {
            let myIndex = 1;
            if (myIndex !== -1) {
                myNewMenuIdsJSON.push(myMenuDays[i].menuItemIdsJSON[j])
            }
        }
        if (myNewMenuIdsJSON.length !== myMenuDays[i].menuItemIdsJSON.length) {
            myMenuDays[i].menuItemIdsJSON = myNewMenuIdsJSON;
            await putMenuDay(myMenuDays[i], myToken, myCustomId);
        }
    }
    return myMenuDays
}

export default updateMenuDaysWithMenuItemChanges