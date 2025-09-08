import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function Duedate({ value, onChange, error }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker minDate={dayjs()} label="Due Date" value={value} slotProps={{
                textField: {
                    error: error,
                    helperText: error ? 'Please choose a vlid date' : '',
                    fullWidth: true,
                },
            }} onChange={onChange} />
        </LocalizationProvider>
    );
}