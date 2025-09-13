import React from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import dayjs from "dayjs";

function EndTime({ value, onChange }) {
    const times = Array.from({ length: 24 * 2 }, (_, i) =>
        dayjs().startOf("day").add(i * 30, "minute").format("HH:mm")
    );
    console.log("EndTime rendered.");
    
    return (
        <FormControl fullWidth required={true} size='medium'>
            <InputLabel id="end-select-label">End Time</InputLabel>
            <Select
                name="end"
                labelId="end-select-label"
                id="end-select"
                value={value}
                label="End Time"
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
        </FormControl>
    );
}

export default React.memo(EndTime);