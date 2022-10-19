import changeToMultiline from './changeToMultiline';

const changeToActual = (actual2: any): any => {
  const actual = {
    labels: [['W'], ['REST']],
    values: ['301\n20\n10', '20\n20\n20'],
  };

  const myArray: any = [];
  for (let i = 0; i < actual.values.length; i++) {
    const value = actual.values[i].split(/\r?\n/);
    for (let j = 0; j < value.length; i++) {
      if (myArray.length < j + 1) {
        myArray.push(actual);
      }
    }
  }

  const returnedArray = ['W301/REST20', 'W20/REST20', 'W10/REST20'];
};

export default changeToActual;
