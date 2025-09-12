import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function WeeklyGoal(props) {
    function handleClick() {
        props.onClick();

    }
    return (
        <Grid container columnSpacing={1} sx={{ width: "100%" }} alignItems='center'>
            <Grid size="grow">
                <Typography variant='h6' fontWeight={500} sx={{ lineHeight: 1.2 }}>{props.title[0].toUpperCase() + props.title.substring(1, props.title.length)}</Typography>
            </Grid>
            <Grid size="auto">
                <IconButton onClick={() => props.onRemove(props.id)}>
                    <DeleteIcon />
                </IconButton >
            </Grid>
            <Grid size={12}>
                <Button variant='contained' onClick={handleClick} type="button" color='secondary' size="small" disableElevation sx={{ fontWeight: "400", borderRadius: 4 }}>Add Daily Task</Button>
            </Grid>
        </Grid>
    );
}