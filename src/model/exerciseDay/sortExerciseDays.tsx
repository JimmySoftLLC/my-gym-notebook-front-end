const sortExerciseDays = async (myExerciseDays: any, myStates: any) => {
  if (myStates['sortDate'] || myStates === 'sortDate') {
    // sort by date
    myExerciseDays.sort(function (a: any, b: any) {
      return a.dateFrom - b.dateFrom;
    });
  }
  if (myStates['sortTitle'] || myStates === 'sortTitle') {
    // sort by title
    myExerciseDays.sort(function (a: any, b: any) {
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
  return myExerciseDays;
};

export default sortExerciseDays;
