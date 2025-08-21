import React, { useState, useImperativeHandle, forwardRef } from "react";
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
import Typography from "@mui/material/Typography";

const TaskForm = forwardRef((props, ref) => {
    const [taskFormInput, setTaskFormInput] = useState({
        title: "",
        goalId: '',
        dueDate: null,
        priority: '',
        error: ""
    });
    console.log(taskFormInput.dueDate);
    useImperativeHandle(ref, () => ({
        setGoal: (goalId) => setTaskFormInput(prevValue => ({ ...prevValue, goalId: goalId }))
    }));
    function handleChange(event) {
        const { name, value } = event.target;
        setTaskFormInput(prevValue => ({
            ...prevValue,
            [name]: value,
        }));
    }
    function handleDateChange(newValue) {
        const currentDateTime = dayjs();
        if (!newValue) {
            setTaskFormInput(prev => ({ ...prev, dueDate: null, error: "Please choose a due date." }));
            return;
        }
        if (!newValue.isAfter(currentDateTime)) {
            setTaskFormInput(prev => ({
                ...prev,
                dueDate: null,
                error: "Warning: due date must be after current time.",
            }));
        } else {
            setTaskFormInput(prev => ({ ...prev, dueDate: newValue, error: "" }));
        }
    }

    function addTask(event) {
        event.preventDefault();
        if (!taskFormInput.dueDate) {
            setTaskFormInput(prevValue => ({
                ...prevValue,
                error: "Please choose a due date.",
            }));
            return;
        };
        props.onAdd(taskFormInput.title, taskFormInput.goalId, taskFormInput.priority, taskFormInput.dueDate);
        setTaskFormInput({
            title: "",
            goalId: '',
            dueDate: null,
            priority: '',
            error: ""
        });
    }
    return (<form onSubmit={addTask} autoComplete="off" ref={props.formRef}>
        <Grid container columnSpacing={1} rowSpacing={1} sx={{ width: '55%' }}>
            <Grid size={12} sx={{ mb: 1 }}>
                <Typography color="warning" variant="body1">{taskFormInput.error}</Typography>
            </Grid>
            <Grid size={12}>
                <TextField name="title" required={true} id="standard-outlined" sx={{ width: '100%' }} size="medium" value={taskFormInput.title} onChange={handleChange} label="Task title" inputRef={props.inputRef} />
            </Grid>
            <Grid size={12}>
                <Box sx={{ minWidth: 105 }}>
                    <FormControl fullWidth required={true} size='medium'>
                        <InputLabel id="goal-select-label">Goal</InputLabel>
                        <Select
                            name="goalId"
                            labelId="goal-select-label"
                            id="goal-select"
                            value={taskFormInput.goalId}
                            label="Goal"
                            onChange={handleChange}
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
                            name="priority"
                            labelId="priority-select-label"
                            id="priority-select"
                            value={taskFormInput.priority}
                            label="Priority"
                            onChange={handleChange}
                            sx={{
                                color:
                                    taskFormInput.priority === 0 ? 'warning.main' :
                                        taskFormInput.priority === 1 ? 'info.main' : 'success.main'
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
                    <DateTimePicker minDateTime={dayjs()} sx={{ width: '100%' }} label="Due date" value={taskFormInput.dueDate} slotProps={{
                        actionBar: {
                            actions: ['cancel', 'accept'],
                        },
                    }} onChange={handleDateChange} />
                </LocalizationProvider>
            </Grid>
            <Grid size={12}>
                <Button fullWidth variant='contained' type="submit" color='primary' size="medium" disableElevation sx={{ borderRadius: 0 }}>Add</Button>
            </Grid>
        </Grid>
    </form>);
});

export default TaskForm;