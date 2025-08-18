import React, { useState } from "react";
import dayjs from 'dayjs';
import TextField from "@mui/material/TextField";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useGoalSelectContext } from "./context";
import Typography from "@mui/material/Typography";

export default function TaskForm(props) {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState(null);
    const [priority, setPriority] = useState('');
    const [error, setError] = useState('');
    const { goalSelect, setGoalSelect } = useGoalSelectContext();
    const updatePriority = (event) => {
        const newValue = event.target.value;
        setPriority(newValue);
    };
    const updateGoal = (event) => {
        const newValue = event.target.value;
        setGoalSelect(newValue);
    };
    function updateTitle(event) {
        const newValue = event.target.value;
        setTitle(newValue);
    }
    function addTask(event) {
        event.preventDefault();
        if(!dueDate) {
            setError("Please choose due date.");
            return;
        };
        props.onAdd(title, goalSelect, priority, dueDate);
        setGoalSelect('');
        setDueDate(null);
        setTitle('');
        setPriority('');
    }
    function handleDateChange(newValue) {
        const currentDateTime = dayjs();
        if (!newValue || !newValue.isAfter(currentDateTime)) {
            setError("Due time must be after the current time.");
            return false;
        } else {
            setError("");
            setDueDate(newValue);
            return true;
        }
    }
    return (<form onSubmit={addTask} autoComplete="off" ref={props.formRef}>
        <Grid container columnSpacing={1} rowSpacing={1} sx={{ width: '55%' }}>
            <Grid size={12} sx={{mb: 1}}>
                <Typography color="warning" variant="body1">{error}</Typography>
            </Grid>
            <Grid size={12}>
                <TextField required={true} id="standard-outlined" sx={{ width: '100%' }} size="medium" value={title} onChange={updateTitle} label="Task title" inputRef={props.inputRef} />
            </Grid>
            <Grid size={12}>
                <Box sx={{ minWidth: 105 }}>
                    <FormControl fullWidth required={true} size='medium'>
                        <InputLabel id="goal-select-label">Goal</InputLabel>
                        <Select
                            labelId="goal-select-label"
                            id="goal-select"
                            value={goalSelect}
                            label="Goal"
                            onChange={updateGoal}
                        >
                            {props.weeklyGoals.map(goal =>
                                <MenuItem key={goal.id} id={goal.id} value={goal.id}>{goal.title[0].toUpperCase() + goal.title.slice(1, goal.title.length)}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Box>
            </Grid>
            <Grid size={6}>
                <Box sx={{ minWidth: 105 }}>
                    <FormControl fullWidth required={true} size='medium'>
                        <InputLabel id="priority-select-label">Priority</InputLabel>
                        <Select
                            labelId="priority-select-label"
                            id="priority-select"
                            value={priority}
                            label="Priority"
                            onChange={updatePriority}
                            sx={{
                                color:
                                    priority === 0 ? 'warning.main' :
                                        priority === 1 ? 'info.main' : 'success.main'
                            }}
                        >
                            <MenuItem value={0} sx={{ color: 'warning.main' }}>High</MenuItem>
                            <MenuItem value={1} sx={{ color: 'info.main' }}>Medium</MenuItem>
                            <MenuItem value={2} sx={{ color: 'success.main' }}>Low</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Grid>
            <Grid size={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker minDateTime={dayjs()} sx={{width: '100%'}} label="Due date" value={dueDate} onChange={handleDateChange} />
                </LocalizationProvider>
            </Grid>
            <Grid size={12}>
                <Button fullWidth variant='contained' type="submit" color='primary' size="medium" disableElevation sx={{ borderRadius: 0 }}>Add</Button>
            </Grid>
        </Grid>
    </form>);
}