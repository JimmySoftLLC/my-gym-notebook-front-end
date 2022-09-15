const getDays = (localDateFrom: Date, localDateTo: Date) => {
    var daysOfWeek = [];
    for (var d = new Date(localDateFrom); d <= new Date(localDateTo); d.setDate(d.getDate() + 1)) {
        const dayOfWeek = d.getDay()
        if (daysOfWeek.indexOf(dayOfWeek) === -1) {
            daysOfWeek.push(dayOfWeek);
        }
    }
    return daysOfWeek;
}

export default getDays;

