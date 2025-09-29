import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ListFilter() {
    return (
            <FormControl size='small' fullWidth>
                <InputLabel id="select-label">List</InputLabel>
                <Select
                    labelId="select-label"
                    id="filter-select"
                    value={0}
                    label="List"
                    onChange={() => {}}
                    size='small'
                >
                    <MenuItem value={0}>ِAll</MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
    );
}