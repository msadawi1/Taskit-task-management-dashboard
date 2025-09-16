import React, { useState } from "react";
import dayjs from "dayjs";
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const priorityColors = {
    0: 'warning',
    1: 'info',
    2: 'success',
};

const priortyText = {
    0: 'High',
    1: 'Medium',
    2: 'Low'
};

export default function Task(props) {
    const [checked, setChecked] = useState(props.status);
    function toggleCheck() {
        setChecked(!checked);
        props.onCheck(props.id);
    }
    function formatDate(dueDate, end, allDay) {
        const today = dayjs();
        const tomorrow = dayjs().add(1, "day");
        const dateDayjs = dayjs(dueDate);
        const endDayjs = dayjs(end);

        const timeStr = endDayjs.format("h:mmA"); // e.g., 5:00 PM

        if (dateDayjs.isSame(today, "day")) {
            return `Today ${!allDay ? timeStr: ''}`;
        } else if (dateDayjs.isSame(tomorrow, "day")) {
            return `Tomorrow ${!allDay ? timeStr: ''}`;
        } else {
            return dateDayjs.format(`ddd, MMM D, YYYY`) + ` ${!allDay ? ('at ' + timeStr): ''}`;
        }
    }
    return (
        <Paper elevation={0} sx={{ p: 2 }}>
            <Grid container rowSpacing={1} columnSpacing={0.8} sx={{ width: "100%" }} alignItems='center'>
                <Grid size="auto">
                    <Checkbox icon={<RadioButtonUncheckedIcon />} checkedIcon={<CheckCircleIcon />} onChange={toggleCheck} checked={checked} size="medium" variant='contained' color='primary' disableelevation="true" sx={{ fontWeight: "400", borderRadius: '50%', p: 0 }} />
                </Grid>
                <Grid size="grow" container direction='column' spacing={0} sx={{ p: 0, m: 0 }}>
                    <Grid container display='flex' alignItems='center'>
                        <Grid size='auto'>
                            <Typography variant='subtitle1' fontWeight={400} sx={{ lineHeight: 1.2, textDecoration: checked ? 'line-through' : 'none', color: checked ? 'secondary.dark' : 'primary.main' }}>
                                {props.title}
                            </Typography>
                        </Grid>
                        <Grid size='auto'>
                            <Chip label={priortyText[props.priority]} color={!props.status ? priorityColors[props.priority] : 'secondary'} size="small" sx={{ ml: 1, }} />
                        </Grid>
                    </Grid>
                    <Grid size={12} container columnSpacing={1.5} sx={{ mt: 0.5 }}>
                        {!props.allDay && <Grid size="auto" display='flex' gap={0.2}>
                            <Typography variant='caption' color="secondary.dark" sx={{ display: "block", lineHeight: 1.2, m: 0 }}>
                                <AccessTimeIcon sx={{ fontSize: 14 }} />
                            </Typography>
                            <Typography variant='caption' color="secondary.dark" sx={{ display: "block", lineHeight: 1.2, m: 0 }}>
                                {props.duration / 60}h
                            </Typography>
                        </Grid>}
                        <Grid size="auto">
                            <Typography variant='caption' color="secondary.dark" sx={{ display: "block", lineHeight: 1.2, m: 0 }}>
                                {props.goal.title}
                            </Typography>
                        </Grid>
                        {props.location && <Grid size="auto">
                            <Typography variant='caption' color="secondary.dark" sx={{ display: "block", lineHeight: 1.2, m: 0 }}>
                                {props.location}
                            </Typography>
                        </Grid>}
                        <Grid size="auto">
                            <Typography variant='caption' sx={{ display: "block", lineHeight: 1.2, m: 0 }} color={
                                props.status
                                    ? "secondary.dark"
                                    : dayjs(props.end).isBefore(dayjs())
                                        ? "warning"
                                        : "secondary.dark"
                            }
                            >
                                {formatDate(props.dueDate, props.end, props.allDay)}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid size="auto" >
                    <IconButton onClick={() => props.onHide(props.id)}>
                        <DeleteIcon />
                    </IconButton >
                </Grid>
            </Grid>
        </Paper>
    );
}