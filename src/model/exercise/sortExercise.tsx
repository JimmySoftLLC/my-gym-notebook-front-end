const sortExercises = async (exercises: any, myStates: any) => {
    if (myStates['sortTitle'] || myStates === 'sortTitle') {
        // sort by title
        exercises.sort(function (a: any, b: any) {
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
    if (myStates['sortOrder'] || myStates === 'sortOrder') {
        // sort by price
        exercises.sort(function (a: any, b: any) {
            return a.order - b.order;
        });
    }
    return exercises;
}

export default sortExercises