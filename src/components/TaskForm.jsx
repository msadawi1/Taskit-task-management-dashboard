import React, { useState, useImperativeHandle, forwardRef } from "react";
import dayjs from 'dayjs';
import TextField from "@mui/material/TextField";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Goal from "./TaskForm/Goal";
import Priority from "./TaskForm/Priority";
import Duedate from "./TaskForm/Duedate";
import Category from "./TaskForm/Category";
import StartTime from "./TaskForm/StartTime";
import EndTime from "./TaskForm/EndTime";
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close';

const TaskForm = forwardRef((props, ref) => {
    const categories = [
        { id: 1, title: 'Ibadah' },
        { id: 2, title: 'Career' },
        { id: 3, title: 'Relationships' },
        { id: 4, title: 'Health' }
    ];
    const [taskFormInput, setTaskFormInput] = useState({
        title: "",
        goalId: '',
        category: '',
        priority: '',
        dueDate: null,
        start: null,
        end: null,
        location: '',
        duration: '',
        error: false
    });
    useImperativeHandle(ref, () => ({
        setGoal: (goalId) => setTaskFormInput(prevValue => ({ ...prevValue, goalId: goalId }))
    }));
    function handleDateChange(newValue) {
        const yesterday = dayjs().subtract(1, "day");
        if (!newValue) {
            setTaskFormInput(prev => ({ ...prev, dueDate: null, error: true }));
            return;
        }
        if (!newValue.isAfter(yesterday)) {
            setTaskFormInput(prev => ({
                ...prev,
                dueDate: null,
                error: true,
            }));
        } else {
            setTaskFormInput(prev => ({ ...prev, dueDate: newValue, error: false }));
        }
    }
    function addTask(event) {
        event.preventDefault();
        if (!taskFormInput.dueDate) {
            setTaskFormInput(prevValue => ({
                ...prevValue,
                error: true,
            }));
            return;
        };
        props.onAdd(taskFormInput.title, taskFormInput.goalId, taskFormInput.priority, taskFormInput.dueDate);
        setTaskFormInput({
            title: "",
            goalId: '',
            dueDate: null,
            priority: '',
            error: false
        });
    }
    function handleChange(event) {
        const { name, value } = event.target;
        console.log(name, value);
        
        setTaskFormInput(prevValue => ({
            ...prevValue,
            [name]: value,
        }));
    }
    return (<form onSubmit={addTask} autoComplete="off" ref={props.formRef}>
        <Grid container columnSpacing={1} rowSpacing={2} sx={{ width: '100%' }}>
            <Grid size={6}>
                <Typography variant="h5" fontWeight={500}>Add New Task</Typography>
            </Grid>
            <Grid display='flex' size={6} justifyContent='flex-end'>
                <IconButton variant="h5" fontWeight={500} onClick={props.onClose}>
                    <CloseIcon color="primary"/>
                </IconButton>
            </Grid> 
            <Grid size={12}>
                <TextField name="title" required={true} id="standard-outlined" sx={{ width: '100%' }} size="medium" value={taskFormInput.title} onChange={handleChange} label="Task Title" inputRef={props.inputRef} />
            </Grid>
            <Grid size={12}>
                <Goal goals={props.weeklyGoals} onChange={handleChange} value={taskFormInput.goalId} />
            </Grid>
            <Grid size={6}>
                <Category categories={categories} onChange={handleChange} value={taskFormInput.category} />
            </Grid>
            <Grid size={6}>
                <Priority onChange={handleChange} value={taskFormInput.priority} />
            </Grid>
            <Grid size={12}>
                <Duedate onChange={handleDateChange} value={taskFormInput.dueDate} error={taskFormInput.error}/>
            </Grid>
            <Grid size={6}>
                <StartTime onChange={handleDateChange} value={taskFormInput.start} />
            </Grid>
            <Grid size={6}>
                <EndTime onChange={handleDateChange} value={taskFormInput.start} />
            </Grid>
            <Grid size={12}>
                <Button fullWidth variant='contained' type="submit" color='primary' disableElevation sx={{ borderRadius: 0 }}>Add</Button>
            </Grid>
        </Grid>
    </form>);
});

export default TaskForm;