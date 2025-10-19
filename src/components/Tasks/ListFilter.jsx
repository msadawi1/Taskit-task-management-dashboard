import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ListFilter({ lists, value, onChange }) {
    return (
        <FormControl size='small' fullWidth>
            <InputLabel id="select-label">List</InputLabel>
            <Select
                labelId="select-label"
                id="filter-select"
                value={value}
                label="List"
                onChange={(event) => { onChange(event.target.value) }}
                size='small'
            >
                <MenuItem value={0}>All</MenuItem>
                {lists.map(
                    list => <MenuItem key={list.name} value={list.name}>{list.name}</MenuItem>
                )}
            </Select>
        </FormControl>
    );
}