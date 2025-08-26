import React, { useState, useCallback } from "react";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Timer from "./Timer";
import Header from "./Header";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Typography from "@mui/material/Typography";
import { useTasksContext } from "./context";
import { encodeDuration, decodeDuration } from "./utils/TimerUtils.js";

export default function TimerMenu() {
    const [selectedTaskId, setSelectedTaskId] = useState('');
    const [isTimerStarted, setTimerStarted] = useState(false);
    const [finishedSession, setFinishedSession] = useState(false);
    const [isTimerPaused, setTimerPaused] = useState(false);
    const [error, setError] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const [finishedTaskId, setFinishedTaskId] = useState('');
    const [duration, setDuration] = useState(encodeDuration(0, 25, 0));
    const { tasks } = useTasksContext();
    const minDuration = 60 * 5 * 1000;
    const handleFinish = useCallback(() => {
        setElapsed(prev => decodeDuration(prev));
        setFinishedSession(true);
        handleStop();
    }, [handleStop]);
    const decrementCounter = useCallback(() => {
        setDuration(prev => { 
            if (prev <= 1000) {
                handleFinish();
                return 0;
            }
            return Math.max(prev - 1000, 0) });
        setElapsed(prev => prev + 1000);
        }, [handleFinish]);
    function updateDuration(hours, minutes, seconds) {
        setDuration(Math.max(encodeDuration(hours, minutes, seconds), minDuration));
    }
    function handleChange(event) {
        const taskId = event.target.value;
        setError(false);
        setSelectedTaskId(taskId);
    }
    function handleStart() {
        if (selectedTaskId === '') {
            setError(true);
            return;
        }
        setFinishedSession(false);
        setFinishedTaskId('');
        setTimerPaused(false);
        setElapsed(0);
        setTimerStarted(true);
    }
    function handleStop() {
        if (isTimerStarted) {
            setFinishedTaskId(selectedTaskId);
            setSelectedTaskId('');
        }
        setDuration(minDuration);
        setTimerStarted(false);
        setTimerPaused(false);
    }
    function togglePause() {
        setTimerPaused(!isTimerPaused);
    }
    return (
        <Box component='section' sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 3 }}>
            <Header />
            <Box component='section' sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 2 }}>
                <Box sx={{ height: 70 }}>
                    {!isTimerStarted && <FormControl fullWidth size='medium'>
                        <InputLabel id="task-select-label">Choose a task to focus on</InputLabel>
                        <Select
                            name="task"
                            labelId="task-select-label"
                            id="task-select"
                            label="Choose a task to focus on"
                            value={selectedTaskId}
                            onChange={handleChange}
                            required
                        >
                            {tasks.filter(task => !task.status).map(task =>
                                <MenuItem key={task.id} id={task.id} value={task.id}>{task.title[0].toUpperCase() + task.title.slice(1, task.title.length)}</MenuItem>
                            )}
                        </Select>
                        {error && <FormHelperText sx={{ color: theme => theme.palette.warning.main }}>Please select an option</FormHelperText>}
                    </FormControl>}
                    {isTimerStarted && <Alert variant="outlined" icon={false} severity="primary">
                        <AlertTitle>Session Started</AlertTitle>
                        <strong style={{ fontWeight: 500 }}>Task:</strong> {(tasks.filter(task => selectedTaskId === task.id))[0].title}
                    </Alert>}
                </Box>
                <Timer duration={duration} onChange={updateDuration} onDecrement={decrementCounter} isTimerStarted={isTimerStarted} isTimerPaused={isTimerPaused}/>
                <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                    {!isTimerStarted && <Button fullWidth disableElevation variant="contained" sx={{ height: 50, fontSize: 18 }} color="primary" onClick={handleStart}>Start Session</Button>}
                    {isTimerStarted && !isTimerPaused && <Button fullWidth disableElevation variant="contained" sx={{ height: 50, fontSize: 18 }} color="secondary" onClick={togglePause}>Pause</Button>}
                    {isTimerStarted && isTimerPaused && <Button fullWidth disableElevation variant="contained" sx={{ height: 50, fontSize: 18 }} color="primary" onClick={togglePause}>Resume</Button>}
                    {isTimerStarted && <Button fullWidth disableElevation variant="contained" sx={{ height: 50, fontSize: 18 }} color="secondary" onClick={handleStop}>Stop</Button>}
                </Box>
                {finishedSession && <Typography variant="h5">Well done! You have spent {elapsed.hours * 60 + elapsed.minutes + elapsed.seconds} minutes focusing on <strong>{tasks.filter(task => finishedTaskId === task.id)[0].title}</strong>.</Typography> }
            </Box>
        </Box>
    );
}