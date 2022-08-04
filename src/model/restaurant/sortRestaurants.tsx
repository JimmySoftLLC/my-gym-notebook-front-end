const sortRestaurants = async (restaurants: any) => {
    let myRestaurants = JSON.parse(JSON.stringify(restaurants))
    myRestaurants.sort(function (a: any, b: any) {
        var textA = a.restaurantName.toUpperCase(); // ignore upper and lowercase
        var textB = b.restaurantName.toUpperCase(); // ignore upper and lowercase
        if (textA < textB) {
            return -1;
        }
        if (textA > textB) {
            return 1;
        }
        // names must be equal
        return 0;
    });

    // console.log(myAssociates);
    return myRestaurants;
}

export default sortRestaurants