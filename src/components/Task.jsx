import React, { useState } from "react";
import dayjs from "dayjs";
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";

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
    const [isChecked, setChecked] = useState(false);
    function toggleCheck() {
        setChecked(!isChecked);
    }
    function formatDate(d) {
        const today = dayjs();
        const tomorrow = dayjs().add(1, "day");
        if (d.isSame(today, "day")) {
            return "Today";
        } else if (d.isSame(tomorrow, "day")) {
            return "Tomorrow";
        } else {
            return d.format("ddd, MMM D, YYYY");
        }
    }
    return (
        <Paper elevation={0} sx={{ p: 1 }}>
            <Grid container rowSpacing={1} columnSpacing={0.8} sx={{ width: "100%" }} alignItems='flex-start'>
                <Grid size="auto">
                    <Checkbox onClick={toggleCheck} variant='contained' color='primary' disableelevation="true" sx={{ fontWeight: "400", borderRadius: 4, p: 0 }} />
                </Grid>
                <Grid size="grow" sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex' }}>
                        <Typography variant='h6' fontWeight={400} sx={{ lineHeight: 1.2, textDecoration: isChecked ? 'line-through' : 'none', color: isChecked ? 'secondary.dark' : 'primary.main' }}>
                            {props.title}
                        </Typography>
                        <Chip label={priortyText[props.priority]} color={priorityColors[props.priority]} size="small" sx={{ ml: 1 }} />
                    </Box>
                    <Typography variant='body2' color="secondary.dark">
                        <strong style={{ fontWeight: 500 }}>Weekly Goal:</strong> {props.goal.title}
                    </Typography>
                </Grid>
                <Grid
                    size="auto"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        justifyContent: "center",
                        mr: 1
                    }}>
                    <Typography variant="body2" color={props.dueDate.isAfter(dayjs()) ? "primary" : "warning"}>{formatDate(props.dueDate)}</Typography>
                    <Typography variant="body2" color={props.dueDate.isAfter(dayjs()) ? "primary" : "warning"}>
                        {props.dueDate.format("h:mm A")}
                    </Typography>
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