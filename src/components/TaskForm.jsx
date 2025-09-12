import { useState } from "react";
import diffInMinutes from "./utils/TaskFormUtils";
import dayjs from 'dayjs';
import TextField from "@mui/material/TextField";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Goal from "./TaskForm/Goal";
import Priority from "./TaskForm/Priority";
import Duedate from "./TaskForm/Duedate";
import Category from "./TaskForm/Category";
import StartTime from "./TaskForm/StartTime";
import EndTime from "./TaskForm/EndTime";
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close';
import useManager from "./hooks/useManager";

export default function TaskForm({ data, onAdd, onClose }) {
    const { weeklyGoals } = useManager();
    const categories = [
        { id: 1, title: 'Ibadah' },
        { id: 2, title: 'Career' },
        { id: 3, title: 'Relationships' },
        { id: 4, title: 'Health' }
    ];
    const [taskFormInput, setTaskFormInput] = useState(data);
    function handleDateChange(newValue) {
        const yesterday = dayjs().subtract(1, "day");
        if (!newValue) {
            setTaskFormInput(prev => ({ ...prev, dueDate: null, error: "date" }));
            return;
        }
        if (!newValue.isAfter(yesterday)) {
            setTaskFormInput(prev => ({
                ...prev,
                dueDate: null,
                error: "date",
            }));
        } else {
            setTaskFormInput(prev => ({ ...prev, dueDate: newValue, error: null }));
        }
    }
    function addTask(event) {
        event.preventDefault();
        if (!taskFormInput.dueDate) {
            setTaskFormInput(prevValue => ({
                ...prevValue,
                error: "date",
            }));
            return;
        };
        const { error, ...formData } = taskFormInput
        onAdd(formData);
        onClose();
    }
    function handleChange(event) {
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
                        updated.error = "duration";
                    }
                    else {
                        updated.duration = diff;
                        updated.error = null;
                    }
                }
            }
            else {
                updated.duration = prevValue.duration;
            }
            return updated;
        });

    }

    return (<form onSubmit={addTask} autoComplete="off">
        <Grid container columnSpacing={1} rowSpacing={2} sx={{ width: '100%' }}>
            <Grid size={6}>
                <Typography variant="h5" fontWeight={500}>Add New Task</Typography>
            </Grid>
            <Grid display='flex' size={6} justifyContent='flex-end'>
                <IconButton variant="h5" fontWeight={500} onClick={onClose}>
                    <CloseIcon color="primary" />
                </IconButton>
            </Grid>
            <Grid size={12}>
                <TextField name="title" required={true} id="standard-outlined" sx={{ width: '100%' }} size="medium" value={taskFormInput.title} onChange={handleChange} label="Task Title" />
            </Grid>
            <Grid size={12}>
                <Goal goals={weeklyGoals} onChange={handleChange} value={taskFormInput.goalId} />
            </Grid>
            <Grid size={6}>
                <Category categories={categories} onChange={handleChange} value={taskFormInput.category} />
            </Grid>
            <Grid size={6}>
                <Priority onChange={handleChange} value={taskFormInput.priority} />
            </Grid>
            <Grid size={12}>
                <TextField name="location" required={false} id="standard-outlined" sx={{ width: '100%' }} size="medium" value={taskFormInput.location} onChange={handleChange} label="Location (optional)" />
            </Grid>
            <Grid size={9}>
                <Duedate onChange={handleDateChange} value={taskFormInput.dueDate} error={taskFormInput.error} />
            </Grid>
            <Grid size={3}>
                <FormControlLabel control={<Switch checked={taskFormInput.allDay} name="allDay" onChange={handleChange} />} label="All Day" color="primary" labelPlacement="top" />
            </Grid>
            {!taskFormInput.allDay && <>
                <Grid size={6} sx={{ mt: -0.5 }}>
                    <StartTime onChange={handleChange} value={taskFormInput.start} duration={taskFormInput.duration} error={taskFormInput.error} />
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