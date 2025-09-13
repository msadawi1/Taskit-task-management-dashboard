import React from "react";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

function Category({ value, onChange }) {
    console.log("Category renderd");
    
    const categories = [{ id: 1, title: 'Ibadah' }, { id: 2, title: 'Career' }, { id: 3, title: 'Relationships' }, { id: 4, title: 'Health' }];
    return (
        <FormControl fullWidth required={true} size='medium'>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
                name="category"
                labelId="category-select-label"
                id="category-select"
                value={value}
                label="Category"
                onChange={onChange}
            >
                {categories.map(category =>
                    <MenuItem key={category.id} id={category.id} value={category.id}>{category.title[0].toUpperCase() + category.title.slice(1, category.title.length)}</MenuItem>
                )}
            </Select>
        </FormControl>
    );
}

export default React.memo(Category);