import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';

function WeeklyGoal(props) {
    function handleAddButtonClick() {
        props.onClick();
    }
    function handleCompleteButtonClick() {
        const success = props.onComplete(props.id);
        if (!success) 
            props.onError();
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
            <Grid size={12} container>
                <Grid size="auto">
                    <Button variant='contained' startIcon={<CheckIcon />} onClick={handleCompleteButtonClick} type="button" color='success' size="small" disableElevation sx={{ fontWeight: "500", borderRadius: 4 }}>Set as complete</Button>
                </Grid>
                <Grid size="auto">
                    <Button variant='contained' startIcon={<AddIcon />} onClick={handleAddButtonClick} type="button" color='secondary' size="small" disableElevation sx={{ fontWeight: "400", borderRadius: 4 }}>Add Task</Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default React.memo(WeeklyGoal);