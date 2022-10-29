function transpose(matrix: any[]) {
  return matrix[0].map((_col: any, i: string | number) =>
    matrix.map((row) => row[i])
  );
}

const howManyReturnsInString = (myString: string) => {
  return myString.split('\n').length - 1;
};

const convertToActualData = (receivedVal: any, howManyLines: number): any => {
  const valuesArray: any = [];

  for (let i = 0; i < receivedVal.values.length; i++) {
    const homManyReturns = howManyReturnsInString(receivedVal.values[i]);
    if (homManyReturns < howManyLines - 1) {
      receivedVal.values[i] = receivedVal.values[i] + '\n';
    }
  }

  for (let i = 0; i < receivedVal.values.length; i++) {
    const values = receivedVal.values[i].split(/\r?\n/);
    valuesArray.push([]);
    for (let j = 0; j < values.length; j++) {
      valuesArray[i].push(values[j]);
    }
  }

  const returnedActual = transpose(valuesArray);

  for (let i = 0; i < returnedActual.length; i++) {
    for (let j = 0; j < returnedActual[i].length; j++) {
      returnedActual[i][j] = receivedVal.labels[j] + returnedActual[i][j];
    }
    returnedActual[i] = returnedActual[i].join('/');
  }

  return returnedActual;
};

export default convertToActualData;
