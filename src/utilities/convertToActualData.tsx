const convertToActualData = (receivedVal: any): any => {
  const returnedActual: any = [];
  for (let i = 0; i < receivedVal.values.length; i++) {
    const values = receivedVal.values[i].split(/\r?\n/);
    for (let j = 0; j < values.length; j++) {
      if (returnedActual.length < j + 1) {
        returnedActual.push(receivedVal.labels[i] + values[j] + '/');
      } else {
        returnedActual[j] =
          returnedActual[j] + receivedVal.labels[i] + values[j];
      }
    }
  }
  return returnedActual;
};

export default convertToActualData;
