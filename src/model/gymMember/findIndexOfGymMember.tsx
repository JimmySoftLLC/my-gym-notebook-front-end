const findIndexOfGymMember = (myGymMembers: string | any[], myId: any) => {
    for (let i = 0; i < myGymMembers.length; i++) {
        if (myGymMembers[i].id === myId) {
            return i;
        }
    }
    return -1;
}

export default findIndexOfGymMember