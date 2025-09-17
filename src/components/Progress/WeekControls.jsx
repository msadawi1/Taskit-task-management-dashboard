import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function WeekControls({onPrev, onNext}) {
    return (
        <>
            <IconButton onClick={onPrev}>
                <ArrowBackIosIcon />
            </IconButton>
            <IconButton onClick={onNext}>
                <ArrowForwardIosIcon />
            </IconButton>
        </>
    );
}