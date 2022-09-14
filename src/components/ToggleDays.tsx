import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

const DAYS = [
    {
        key: "sunday",
        label: "SUN"
    },
    {
        key: "monday",
        label: "MON"
    },
    {
        key: "tuesday",
        label: "TUE"
    },
    {
        key: "wednesday",
        label: "WED"
    },
    {
        key: "thursday",
        label: "THU"
    },
    {
        key: "friday",
        label: "FRI"
    },
    {
        key: "saturday",
        label: "SAT"
    }
];

// const StyledToggleButtonGroup = withStyles(theme => ({
//     grouped: {
//         margin: theme.spacing(2),
//         padding: theme.spacing(0, 1),
//         "&:not(:first-child)": {
//             border: "1px solid",
//             borderColor: "#692B7C",
//             borderRadius: "50%"
//         },
//         "&:first-child": {
//             border: "1px solid",
//             borderColor: "#692B7C",
//             borderRadius: "50%"
//         }
//     }
// }))(ToggleButtonGroup);

// const StyledToggle = withStyles({
//     root: {
//         color: "#692B7C",
//         "&$selected": {
//             color: "white",
//             background: "#692B7C"
//         },
//         "&:hover": {
//             borderColor: "#BA9BC3",
//             background: "#BA9BC3"
//         },
//         "&:hover$selected": {
//             borderColor: "#BA9BC3",
//             background: "#BA9BC3"
//         },
//         minWidth: 32,
//         maxWidth: 32,
//         height: 32,
//         textTransform: "unset",
//         fontSize: "0.75rem"
//     },
//     selected: {}
// })(ToggleButton);

const ToggleDays = () => {
    const [days, setDays] = useState([]);
    return (
        <>
            <ToggleButtonGroup
                className="my-1"
                size="small"
                arial-label="Days of the week"
                value={days}
                onChange={(event, value) => setDays(value)}
            >
                {DAYS.map((day, index) => (
                    <ToggleButton key={day.key} value={index} aria-label={day.key}>
                        {day.label}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </>
    );
};

export default ToggleDays;
