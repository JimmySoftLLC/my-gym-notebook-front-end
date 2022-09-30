const validDate = (
  dateFrom: any,
  dateTo: any,
  dateToCheck: any,
  dayJSON: any
) => {
  let myDateFrom = new Date(dateFrom);
  let myDateTo = new Date(dateTo);
  let myDateToCheck = new Date(dateToCheck);
  myDateFrom.setHours(0, 0, 0, 0);
  myDateTo.setHours(0, 0, 0, 0);
  myDateToCheck.setHours(0, 0, 0, 0);
  if (myDateFrom <= myDateToCheck && myDateToCheck <= myDateTo) {
    const day = myDateToCheck.getDay();
    const dayValid = dayJSON.findIndex((e: number) => e === day);
    if (dayValid !== -1) return true;
  }
  return false;
};

export default validDate;
