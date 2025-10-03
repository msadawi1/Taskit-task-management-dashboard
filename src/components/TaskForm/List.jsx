import React from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import useLists from "../hooks/useLists";

function List({ value, onChange }) {
    const { lists } = useLists();
    return (
        <FormControl fullWidth required={true} size='medium'>
            <InputLabel id="list-select-label">List</InputLabel>
            <Select
                name="list"
                labelId="list-select-label"
                id="list-select"
                value={value}
                label="List"
                onChange={onChange}
            >
                {lists.map(list =>
                    <MenuItem key={list.name} id={list.name} value={list.name}>{list.name}</MenuItem>
                )}
            </Select>
        </FormControl>
    );
}

export default React.memo(List);