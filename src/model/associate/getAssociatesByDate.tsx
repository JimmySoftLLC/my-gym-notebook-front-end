import getAssociates from './getAssociates';
import getAssociateFromRestaurant from './getAssociateFromRestaurant';
import validDate from '../validDate';
import isEmail from 'validator/lib/isEmail';

const getTodaysAssociates = async (restaurants: string | any[], myMenuDays: string | any[], selectedDate: any) => {
    // create an array of all ids
    let associateInIds: any[] = [];
    let associateInIdsNoEmail: any[] = [];
    let myAssociates: any[] = [];
    let myAssociatesNoEmail: any[] = [];
    let myFinalAssociates: any[] = [];

    // get associate from the valid menu days, create a list of one from database and ones from restaurant object
    // these associates are in house so mark them as in.
    for (let j = 0; j < myMenuDays.length; j++) {
        if (validDate(myMenuDays[j].dateFrom, myMenuDays[j].dateTo, selectedDate)) {
            for (let k = 0; k < myMenuDays[j].associatesJSON.length; k++) {
                if (isEmail(myMenuDays[j].associatesJSON[k])) {
                    if (associateInIds.indexOf(myMenuDays[j].associatesJSON[k]) === -1) {
                        associateInIds.push(myMenuDays[j].associatesJSON[k])
                    }
                } else {
                    if (associateInIdsNoEmail.indexOf(myMenuDays[j].associatesJSON[k]) === -1) {
                        associateInIdsNoEmail.push(myMenuDays[j].associatesJSON[k])
                    }
                }
            }
        }
    }

    // get associates from database
    let myAssociatesDatabase = await getAssociates(associateInIds)

    for (let i = 0; i < myAssociatesDatabase.length; i++) {
        if (!myAssociatesDatabase[i].hideAssociate) {
            myAssociates.push(myAssociatesDatabase[i]);
        }
    }

    // get associates from restaurant object
    for (let i = 0; i < associateInIdsNoEmail.length; i++) {
        for (let j = 0; j < restaurants.length; j++) {
            let associateNoEmail = getAssociateFromRestaurant(restaurants[j], associateInIdsNoEmail[i])
            if (associateNoEmail) {
                if (!associateNoEmail.hideAssociate) {
                    myAssociatesNoEmail.push(associateNoEmail)
                }
                break;
            }
        }
    }

    // combine associates
    myAssociates = myAssociates.concat(myAssociatesNoEmail)

    // mark these associates as in, since they are from the menudays object
    for (let i = 0; i < myAssociates.length; i++) {
        myAssociates[i].isIn = true
    }

    // combine associates in the final associates object
    myFinalAssociates = myFinalAssociates.concat(myAssociates)

    // reset objects to find associates that are part of the restaurant but are out.
    let associateOutIds = [];
    let associateOutIdsNoEmail = [];
    myAssociates = [];
    myAssociatesNoEmail = [];

    for (let j = 0; j < restaurants.length; j++) {
        for (let k = 0; k < restaurants[j].associatesJSON.length; k++) {
            if (!restaurants[j].associatesJSON[k].hideAssociate) {
                if (isEmail(restaurants[j].associatesJSON[k].id)) {
                    if (associateInIds.indexOf(restaurants[j].associatesJSON[k].id) === -1 && associateOutIds.indexOf(restaurants[j].associatesJSON[k].id) === -1) {
                        associateOutIds.push(restaurants[j].associatesJSON[k].id)
                    }
                } else {
                    if (associateInIdsNoEmail.indexOf(restaurants[j].associatesJSON[k].id) === -1 && associateOutIdsNoEmail.indexOf(restaurants[j].associatesJSON[k].id) === -1) {
                        associateOutIdsNoEmail.push(restaurants[j].associatesJSON[k].id)
                    }
                }
            }
        }
    }

    myAssociates = await getAssociates(associateOutIds)

    for (let i = 0; i < associateOutIdsNoEmail.length; i++) {
        for (let j = 0; j < restaurants.length; j++) {
            let associateNoEmail = getAssociateFromRestaurant(restaurants[j], associateOutIdsNoEmail[i])
            if (associateNoEmail) {
                myAssociatesNoEmail.push(associateNoEmail)
                break;
            }
        }
    }

    myAssociates = myAssociates.concat(myAssociatesNoEmail)

    for (let i = 0; i < myAssociates.length; i++) {
        myAssociates[i].isIn = false;
    }

    myFinalAssociates = myFinalAssociates.concat(myAssociates)

    return myFinalAssociates;
}

export default getTodaysAssociates;