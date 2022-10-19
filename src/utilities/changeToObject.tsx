const changeToObject = (sets: string[]) => {
  const myObject: any = {};
  for (let i = 0; i < sets.length; i++) {
    const details = sets[i].split('/');
    for (let j = 0; j < details.length; j++) {
      var commandsStr = details[j].replace(/[0-9]/g, '');
      var numStr = details[j].replace(/[^0-9]/g, '');
      if (!myObject[commandsStr]) {
        myObject[commandsStr] = [numStr];
      } else {
        const myArray: any[] = myObject[commandsStr];
        myArray.push(numStr);
      }
    }
  }
};

export default changeToObject;
