import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import React from 'react';

function Duedate({ value, onChange, error }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker minDate={dayjs()} label="Due Date" value={value} slotProps={{
                textField: {
                    error: error === "date" ? true : false,
                    helperText: error === "date" ? 'Please choose a valid date' : '',
                    fullWidth: true,
                },
            }} onChange={onChange} />
        </LocalizationProvider>
    );
}

export default React.memo(Duedate);