import changeToMultiline from './changeToMultiline';

const changeToObject = (sets: string[]): { labels: any[]; values: any[] } => {
  const keysObj: any = {};
  const valuesObj: any = {};
  for (let i = 0; i < sets.length; i++) {
    const details = sets[i].split('/');
    for (let j = 0; j < details.length; j++) {
      var commandStr = details[j].replace(/[0-9]/g, '');
      var numStr = details[j].replace(/[^0-9]/g, '');
      if (!valuesObj[j]) {
        keysObj[j] = [commandStr];
        valuesObj[j] = [numStr];
      } else {
        const myArray: any[] = valuesObj[j];
        myArray.push(numStr);
      }
    }
  }
  const labels = Object.values(keysObj);
  const values: any = Object.values(valuesObj);
  for (let i = 0; i < values.length; i++) {
    values[i] = changeToMultiline(values[i]);
  }
  return { labels: labels, values: values };
};

export default changeToObject;
