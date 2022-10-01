import dateString from './dateString';

const previousDateId = (dateValue: any, daysPrevious: any) => {
  let returnedDate = new Date(dateValue);
  returnedDate.setDate(returnedDate.getDate() - daysPrevious);
  returnedDate.setHours(0, 0, 0, 0);
  returnedDate = dateString(returnedDate, returnedDate, 'dateAsId');
  return returnedDate;
};

export default previousDateId;
