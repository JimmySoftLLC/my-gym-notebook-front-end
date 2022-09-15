const DAYS = [
    {
        disabled: false,
        key: "Sunday",
        ariaLabel: "SU"
    },
    {
        disabled: false,
        key: "Monday",
        ariaLabel: "MO"
    },
    {
        disabled: false,
        key: "Tuesday",
        ariaLabel: "TU"
    },
    {
        disabled: false,
        key: "Wednesday",
        ariaLabel: "WE"
    },
    {
        disabled: false,
        key: "Thursday",
        ariaLabel: "TH"
    },
    {
        disabled: false,
        key: "Fr",
        ariaLabel: "FR"
    },
    {
        disabled: false,
        key: "Saturday",
        ariaLabel: "SA"
    }
];

const activateDays = (daysOfWeek: any[]) => {
    let newDays = JSON.parse(JSON.stringify(DAYS))
    for (let i = 0; i <= 6; i++) {
        newDays[i].disabled = true;
    }
    for (let i = 0; i < daysOfWeek.length; i++) {
        newDays[daysOfWeek[i]].disabled = false;
    }
    return newDays;
}

export default activateDays;

