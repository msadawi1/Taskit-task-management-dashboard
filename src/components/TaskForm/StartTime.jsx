import React from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import dayjs from "dayjs";

function StartTime({ value, onChange, duration, error }) {
    const times = Array.from({ length: 24 * 2 }, (_, i) =>
        dayjs().startOf("day").add(i * 30, "minute").format("HH:mm")
    );
    console.log("StartTime rendered.");
    
    const hours = duration / 60;
    return (
        <FormControl fullWidth required={true} size='medium' error={error === "duration"}>
            <InputLabel id="start-select-label">Start Time</InputLabel>
            <Select
                name="start"
                labelId="start-select-label"
                id="start-select"
                value={value}
                label="Start Time"
                onChange={onChange}
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: 300,
                        },
                    },
                }}
            >
                {times.map(time =>
                    <MenuItem key={time} value={time}>{time}</MenuItem>
                )}
            </Select>
            { !error && <FormHelperText>Duration: {hours}{hours <= 1 ? 'hr' : 'hrs'}</FormHelperText> }
        </FormControl>
    );
}

export default React.memo(StartTime);