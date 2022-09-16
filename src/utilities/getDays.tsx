const getDays = async (dateFrom: Date, dateTo: Date) => {
    var daysOfWeek = [];
    let newDateFrom = new Date(dateFrom);
    newDateFrom.setHours(0, 0, 0, 0)
    let newDateTo = new Date(dateTo);
    newDateTo.setHours(0, 0, 0, 0)
    for (var d = newDateFrom; d <= newDateTo; d.setDate(d.getDate() + 1)) {
        const dayOfWeek = d.getDay()
        if (daysOfWeek.indexOf(dayOfWeek) === -1) {
            daysOfWeek.push(dayOfWeek);
        }
    }
    return daysOfWeek;
}

export default getDays;

