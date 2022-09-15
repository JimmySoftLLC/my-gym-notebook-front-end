const DAYS = [
    {
        disabled: false,
        key: "Sunday",
        label: "SU"
    },
    {
        disabled: false,
        key: "Monday",
        label: "MO"
    },
    {
        disabled: false,
        key: "Tuesday",
        label: "TU"
    },
    {
        disabled: false,
        key: "Wednesday",
        label: "WE"
    },
    {
        disabled: false,
        key: "Thursday",
        label: "TH"
    },
    {
        disabled: false,
        key: "Fr",
        label: "FR"
    },
    {
        disabled: false,
        key: "Saturday",
        label: "SA"
    }
];

const activateDays = async (daysOfWeek: any[]) => {
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

