import React from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

function List({ value, onChange }) {
    const lists = [{ id: 1, title: 'Ibadah' }, { id: 2, title: 'Career' }, { id: 3, title: 'Relationships' }, { id: 4, title: 'Health' }];
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
                    <MenuItem key={list.id} id={list.id} value={list.id}>{list.title[0].toUpperCase() + list.title.slice(1, list.title.length)}</MenuItem>
                )}
            </Select>
        </FormControl>
    );
}

export default React.memo(List);