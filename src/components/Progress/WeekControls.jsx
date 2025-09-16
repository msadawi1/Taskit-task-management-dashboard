import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function WeekControls() {
    return (
        <>
            <IconButton>
                <ArrowBackIosIcon />
            </IconButton>
            <IconButton>
                <ArrowForwardIosIcon />
            </IconButton>
        </>
    );
}