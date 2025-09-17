import Typography from "@mui/material/Typography";
import Chip from '@mui/material/Chip';

export default function ProgressCaption({ startDate, endDate, offset }) {
    let weekLabel;
    const distance = Math.abs(offset);
    if (offset < 0) {
        weekLabel = `${distance} week${distance === 1 ? '' : 's'} ago`;
    } else if (offset > 0) {
        weekLabel = `${distance} week${distance === 1 ? '' : 's'} ahead`;
    } else {
        weekLabel = "current week";
    }
    return (
        <>
            <Typography variant='subtitle1' color="secondary.dark">Track your productivity for {startDate} - {endDate}</Typography>
            <Chip label={weekLabel} color="secondary"/>
        </>
    );
}