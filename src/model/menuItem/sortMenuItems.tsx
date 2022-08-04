const sortMenuItems = async (myMenuItems: any, myStates: any) => {
    if (myStates['sortTitle'] || myStates === 'sortTitle') {
        // sort by title
        myMenuItems.sort(function (a: any, b: any) {
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
    if (myStates['sortPrice'] || myStates === 'sortPrice') {
        // sort by price
        myMenuItems.sort(function (a: any, b: any) {
            return a.price - b.price;
        });
    }
    // console.log(myRestaurantsMenuItems);
    return myMenuItems;
}

export default sortMenuItems