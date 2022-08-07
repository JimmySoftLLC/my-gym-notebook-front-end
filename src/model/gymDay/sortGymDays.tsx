const sortGymDays = async (myGymDays: any, myStates: any) => {
    // console.log(myStates)
    if (myStates['sortDate'] || myStates === 'sortDate') {
        // sort by date
        myGymDays.sort(function (a: any, b: any) {
            return a.dateFrom - b.dateFrom;
        });
    }
    if (myStates['sortTitle'] || myStates === 'sortTitle') {
        // sort by title
        myGymDays.sort(function (a: any, b: any) {
            var textA = a.title.toUpperCase(); // ignore upper and lowercase
            var textB = b.title.toUpperCase(); // ignore upper and lowercase
            if (textA < textB) {
                return -1;
            }
            if (textA > textB) {
                return 1;
            }
            // names must be equal
            return 0;
        });
    }
    // console.log(myRestaurantsGymDays);
    return myGymDays;
}

export default sortGymDays