const sortGymMembers = (gymMembers: any[], gymMember: { id: any; } | null) => {
    let myGymMembers = JSON.parse(JSON.stringify(gymMembers))
    myGymMembers.sort(function (a: { firstName: string; }, b: { firstName: string; }) {
        var textA = a.firstName.toUpperCase(); // ignore upper and lowercase
        var textB = b.firstName.toUpperCase(); // ignore upper and lowercase
        if (textA < textB) {
            return -1;
        }
        if (textA > textB) {
            return 1;
        }
        // names must be equal
        return 0;
    });

    // put logged in gymMember at the begining of the array
    if (gymMember) {
        let myIndex = myGymMembers.findIndex((item: { id: any; }) => item.id === gymMember.id);
        let mySlicedGymMember = myGymMembers.splice(myIndex, 1)
        myGymMembers.unshift(mySlicedGymMember[0])
    }

    // console.log(myGymMembers);
    return myGymMembers;
}

export default sortGymMembers