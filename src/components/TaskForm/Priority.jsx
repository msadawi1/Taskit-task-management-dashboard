import React from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

function Priority({ value, onChange }) {    
    return (
        <FormControl fullWidth required={true} size='medium'>
            <InputLabel id="priority-select-label">Priority</InputLabel>
            <Select
                name="priority"
                labelId="priority-select-label"
                id="priority-select"
                value={value}
                label="Priority"
                onChange={onChange}
                sx={{
                    color:
                        value === 0 ? 'warning.main' :
                            value === 1 ? 'info.main' : 'success.main'
                }}
            >
                <MenuItem value={0} sx={{ color: 'warning.main' }}>High</MenuItem>
                <MenuItem value={1} sx={{ color: 'info.main' }}>Medium</MenuItem>
                <MenuItem value={2} sx={{ color: 'success.main' }}>Low</MenuItem>
            </Select>
        </FormControl>
    );
}

export default React.memo(Priority);