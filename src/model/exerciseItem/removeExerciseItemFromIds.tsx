const removeExerciseItemFromIds = async (restaurant: any, exerciseId: any) => {
    let myRestaurant = JSON.parse(JSON.stringify(restaurant))
    let myIndex = myRestaurant.ExerciseItemIdsJSON.indexOf(exerciseId, 0)
    while (myIndex !== -1) {
        myRestaurant.ExerciseItemIdsJSON.splice(myIndex, 1)
        myIndex = myRestaurant.ExerciseItemIdsJSON.indexOf(exerciseId, 0)
    }
    return myRestaurant;
}

export default removeExerciseItemFromIds;