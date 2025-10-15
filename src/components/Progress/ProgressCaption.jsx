import Chip from '@mui/material/Chip';
import Caption from "../mini_components/Caption";

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
            <Caption text={`Track your productivity for ${startDate} - ${endDate}`}/>
            <Chip label={weekLabel} color="secondary"/>
        </>
    );
}