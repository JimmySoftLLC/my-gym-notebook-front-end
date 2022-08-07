import getGymMembers from './getGymMembers';
import validDate from '../validDate';
import isEmail from 'validator/lib/isEmail';

const getTodaysGymMembers = async (restaurants: string | any[], myGymDays: string | any[], selectedDate: any) => {
    // create an array of all ids
    let gymMemberInIds: any[] = [];
    let gymMemberInIdsNoEmail: any[] = [];
    let myGymMembers: any[] = [];
    let myGymMembersNoEmail: any[] = [];
    let myFinalGymMembers: any[] = [];

    // get gymMember from the valid menu days, create a list of one from database and ones from restaurant object
    // these gymMembers are in house so mark them as in.
    for (let j = 0; j < myGymDays.length; j++) {
        if (validDate(myGymDays[j].dateFrom, myGymDays[j].dateTo, selectedDate)) {
            for (let k = 0; k < myGymDays[j].gymMembersJSON.length; k++) {
                if (isEmail(myGymDays[j].gymMembersJSON[k])) {
                    if (gymMemberInIds.indexOf(myGymDays[j].gymMembersJSON[k]) === -1) {
                        gymMemberInIds.push(myGymDays[j].gymMembersJSON[k])
                    }
                } else {
                    if (gymMemberInIdsNoEmail.indexOf(myGymDays[j].gymMembersJSON[k]) === -1) {
                        gymMemberInIdsNoEmail.push(myGymDays[j].gymMembersJSON[k])
                    }
                }
            }
        }
    }

    // get gymMembers from database
    let myGymMembersDatabase = await getGymMembers(gymMemberInIds)

    for (let i = 0; i < myGymMembersDatabase.length; i++) {
        if (!myGymMembersDatabase[i].hideGymMember) {
            myGymMembers.push(myGymMembersDatabase[i]);
        }
    }

    // get gymMembers from restaurant object
    for (let i = 0; i < gymMemberInIdsNoEmail.length; i++) {
        for (let j = 0; j < restaurants.length; j++) {
            let gymMemberNoEmail = {}
            if (gymMemberNoEmail) {
                myGymMembersNoEmail.push(gymMemberNoEmail)
                break;
            }
        }
    }

    // combine gymMembers
    myGymMembers = myGymMembers.concat(myGymMembersNoEmail)

    // mark these gymMembers as in, since they are from the GymDays object
    for (let i = 0; i < myGymMembers.length; i++) {
        myGymMembers[i].isIn = true
    }

    // combine gymMembers in the final gymMembers object
    myFinalGymMembers = myFinalGymMembers.concat(myGymMembers)

    // reset objects to find gymMembers that are part of the restaurant but are out.
    let gymMemberOutIds = [];
    let gymMemberOutIdsNoEmail = [];
    myGymMembers = [];
    myGymMembersNoEmail = [];

    for (let j = 0; j < restaurants.length; j++) {
        for (let k = 0; k < restaurants[j].gymMembersJSON.length; k++) {
            if (!restaurants[j].gymMembersJSON[k].hideGymMember) {
                if (isEmail(restaurants[j].gymMembersJSON[k].id)) {
                    if (gymMemberInIds.indexOf(restaurants[j].gymMembersJSON[k].id) === -1 && gymMemberOutIds.indexOf(restaurants[j].gymMembersJSON[k].id) === -1) {
                        gymMemberOutIds.push(restaurants[j].gymMembersJSON[k].id)
                    }
                } else {
                    if (gymMemberInIdsNoEmail.indexOf(restaurants[j].gymMembersJSON[k].id) === -1 && gymMemberOutIdsNoEmail.indexOf(restaurants[j].gymMembersJSON[k].id) === -1) {
                        gymMemberOutIdsNoEmail.push(restaurants[j].gymMembersJSON[k].id)
                    }
                }
            }
        }
    }

    myGymMembers = await getGymMembers(gymMemberOutIds)

    for (let i = 0; i < gymMemberOutIdsNoEmail.length; i++) {
        for (let j = 0; j < restaurants.length; j++) {
            myGymMembersNoEmail.push({});
            break;
        }
    }

    myGymMembers = myGymMembers.concat(myGymMembersNoEmail)

    for (let i = 0; i < myGymMembers.length; i++) {
        myGymMembers[i].isIn = false;
    }

    myFinalGymMembers = myFinalGymMembers.concat(myGymMembers)

    return myFinalGymMembers;
}

export default getTodaysGymMembers;