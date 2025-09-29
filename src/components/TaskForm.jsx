import { useState, useCallback } from "react";
import { diffInMinutes, parseTimeToDate } from "./utils/TaskFormUtils";
import dayjs from 'dayjs';
import TextField from "@mui/material/TextField";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SubTitle from "./mini_components/SubTitle";
import Feedback from "./mini_components/Feedback"
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Goal from "./TaskForm/Goal";
import Priority from "./TaskForm/Priority";
import Duedate from "./TaskForm/Duedate";
import List from "./TaskForm/List";
import StartTime from "./TaskForm/StartTime";
import EndTime from "./TaskForm/EndTime";
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close';
import useManager from "./hooks/useManager";

export default function TaskForm({ data, onAdd, onClose }) {
    const { weeklyGoals } = useManager();
    const [taskFormInput, setTaskFormInput] = useState(data);
    const handleDateChange = useCallback((newValue) => {
        const yesterday = dayjs().subtract(1, "day");
        if (!newValue) {
            setTaskFormInput(prev => ({ ...prev, dueDate: null, dateError: true }));
            return;
        }
        if (!newValue.isAfter(yesterday)) {
            setTaskFormInput(prev => ({
                ...prev,
                dueDate: null,
                dateError: true,
            }));
        } else {
            setTaskFormInput(prev => ({ ...prev, dueDate: newValue, dateError: false }));
        }
    }, []);
    function addTask(event) {
        event.preventDefault();
        if (!taskFormInput.dueDate) {
            setTaskFormInput(prevValue => ({
                ...prevValue,
                dateError: true,
            }));
            return;
        };
        let { dateError, durationError, ...formData } = taskFormInput;
        if (dateError || durationError) {
            return;
        }
        // convert Dayjs (used in MUI) to native Date
        formData.dueDate = formData.dueDate.toDate();
        formData.start = parseTimeToDate(formData.start, formData.dueDate);
        formData.end = parseTimeToDate(formData.end, formData.dueDate);
        onAdd(formData);
        onClose();
    }
    const handleChange = useCallback((event) => {
        let { name, value } = event.target;
        if (name === 'allDay') {
            value = event.target.checked;
        }
        setTaskFormInput(prevValue => {
            let updated = {
                ...prevValue,
                [name]: value,
            }
            if (name === 'start' || name === 'end') {
                if (updated.start && updated.end) {
                    let diff = diffInMinutes(updated.start, updated.end);
                    if (diff <= 0) {
                        updated.durationError = true;
                    }
                    else {
                        updated.duration = diff;
                        updated.durationError = false;
                    }
                }
            }
            return updated;
        });
    }, []);
    return (<form onSubmit={addTask} autoComplete="off">
        <Grid container columnSpacing={1} rowSpacing={2} sx={{ width: '100%' }} >
            <Grid size="grow">
                <SubTitle title="Add New Task" />
            </Grid>
            <Grid display='flex' size="auto">
                <IconButton variant="h5" fontWeight={500} onClick={onClose}>
                    <CloseIcon color="primary" />
                </IconButton>
            </Grid>
            { taskFormInput.durationError && <Grid size={12} sx={{mt: -2, mb: 0}}>
                <Feedback color="warning" text="End time must be after start time" />
            </Grid> }
            { taskFormInput.dateError && <Grid size={12} sx={{mt: -2, mb: 0}}>
                <Feedback color="warning" text="Please select a valid date" />
            </Grid> }
            <Grid size={12}>
                <TextField name="title" required={true} id="standard-outlined" sx={{ width: '100%' }} size="medium" value={taskFormInput.title} onChange={handleChange} label="Task Title" />
            </Grid>
            <Grid size={12}>
                <Goal goals={weeklyGoals} onChange={handleChange} value={taskFormInput.goalId} />
            </Grid>
            <Grid size={6}>
                <List onChange={handleChange} value={taskFormInput.list} />
            </Grid>
            <Grid size={6}>
                <Priority onChange={handleChange} value={taskFormInput.priority} />
            </Grid>
            <Grid size={12}>
                <TextField name="location" required={false} id="standard-outlined" sx={{ width: '100%' }} size="medium" value={taskFormInput.location} onChange={handleChange} label="Location (optional)" />
            </Grid>
            <Grid size={12} container>
                <Grid size='grow'>
                    <Duedate onChange={handleDateChange} value={taskFormInput.dueDate} error={taskFormInput.dateError} />
                </Grid>
                <Grid size='auto'>
                    <FormControlLabel control={<Switch checked={taskFormInput.allDay} name="allDay" onChange={handleChange} />} label="All Day" color="primary" labelPlacement="top" />
                </Grid>
            </Grid>
            {!taskFormInput.allDay && <>
                <Grid size={6} sx={{ mt: -0.5 }}>
                    <StartTime onChange={handleChange} value={taskFormInput.start} duration={taskFormInput.duration} error={taskFormInput.durationError} />
                </Grid>
                <Grid size={6} sx={{ mt: -0.5 }} >
                    <EndTime onChange={handleChange} value={taskFormInput.end} />
                </Grid>
            </>}
            <Grid size={12}>
                <Button fullWidth variant='contained' type="submit" color='primary' disableElevation sx={{ borderRadius: 0 }}>Add</Button>
            </Grid>
        </Grid>
    </form>);
}