import dateString from './dateString';

const previousDate = (dateFrom: any, daysPrevious: any) => {
  let myDateFrom = new Date(dateFrom);
  myDateFrom.setHours(0, 0, 0, 0);
  return dateString(myDateFrom, myDateFrom, 'dataAsId');
};

export default previousDate;
