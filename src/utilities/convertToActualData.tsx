const convertToActualData = (receivedVal: any): any => {
  // const receivedVal = {
  //   labels: ['W', 'REST'],
  //   values: ['320\n20\n10', '20\n20\n20'],
  // };

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

  // const returnedActual = ['W320/REST20', 'W20/REST20', 'W10/REST20'];

  return returnedActual;
};

export default convertToActualData;
