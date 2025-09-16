import Typography from "@mui/material/Typography";
import Chip from '@mui/material/Chip';

export default function ProgressCaption({ startDate, endDate }) {
    return (
        <>
            <Typography variant='subtitle1' color="secondary.dark">Track your productivity for {"9/14/2025"} - {"9/20/2025"}</Typography>
            <Chip label="Current Week" color="secondary"/>
        </>
    );
}