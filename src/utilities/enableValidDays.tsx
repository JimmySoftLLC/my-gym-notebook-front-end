const DAYS = [
    {
        disabled: true,
        key: "Sunday",
        ariaLabel: "SU"
    },
    {
        disabled: true,
        key: "Monday",
        ariaLabel: "MO"
    },
    {
        disabled: true,
        key: "Tuesday",
        ariaLabel: "TU"
    },
    {
        disabled: true,
        key: "Wednesday",
        ariaLabel: "WE"
    },
    {
        disabled: true,
        key: "Thursday",
        ariaLabel: "TH"
    },
    {
        disabled: true,
        key: "Fr",
        ariaLabel: "FR"
    },
    {
        disabled: true,
        key: "Saturday",
        ariaLabel: "SA"
    }
];

const enableValidDays = (daysOfWeek: any[]) => {
    let newDays = JSON.parse(JSON.stringify(DAYS))
    for (let i = 0; i < daysOfWeek.length; i++) {
        newDays[daysOfWeek[i]].disabled = false;
    }
    return newDays;
}

export default enableValidDays;

