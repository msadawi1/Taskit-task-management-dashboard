import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { decodeDuration } from "./utils/TimerUtils.js";

export default function Timer({ duration, onChange, onDecrement, isTimerStarted, isTimerPaused }) {
    const { hours, minutes, seconds } = decodeDuration(duration);
    useEffect(() => {
        if (!isTimerStarted || isTimerPaused) return;
        const interval = setInterval(() => {
            onDecrement();
        }, 1000);
        return () => clearInterval(interval);
    }, [isTimerStarted, isTimerPaused, onDecrement]);
    return (
        <Grid container columnSpacing={3}>
            <Grid size={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <Paper sx={{ alignSelf: 'stretch' }} elevation={0}>
                    <TextField variant="standard" fullWidth={true} size="large" name="hours" slotProps={{
                        htmlInput: {
                            'type': 'number', 'min': '0', 'max': '23', 'style': {
                                padding: '20px',
                                fontSize: '24px',
                                textAlign: 'center'
                            }
                        },
                        input: {
                            disableUnderline: true,
                        }
                    }} disabled={isTimerStarted} required={true} id="hours" onChange={(e) => onChange(+e.target.value, minutes, seconds)} value={String(hours).padStart(2, "0")} />
                </Paper>
                <InputLabel id="hours" sx={{ fontSize: 18 }}>Hours</InputLabel>
            </Grid>
            <Grid size={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <Paper sx={{ alignSelf: 'stretch' }} elevation={0}>
                    <TextField variant="standard" fullWidth={true} size="large" name="minutes" slotProps={{
                        htmlInput: {
                            'type': 'number', 'min': '3', 'max': '59', 'style': {
                                padding: '20px',
                                fontSize: '24px',
                                textAlign: 'center'
                            }
                        },
                        input: {
                            disableUnderline: true,
                        }
                    }} disabled={isTimerStarted} required={true} id="minutes" onChange={(e) => onChange(hours, +e.target.value, seconds)}
                        value={String(minutes).padStart(2, "0")} />
                </Paper>
                <InputLabel id="minutes" sx={{ fontSize: 18 }}>Minutes</InputLabel>
            </Grid>
            <Grid size={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <Paper sx={{ alignSelf: 'stretch' }} elevation={0}>
                    <TextField variant="standard" fullWidth={true} size="large" name="seconds" slotProps={{
                        htmlInput: {
                            'type': 'number', 'min': '0', 'max': '59', 'style': {
                                padding: '20px',
                                fontSize: '24px',
                                textAlign: 'center'
                            }
                        },
                        input: {
                            disableUnderline: true,
                        }
                    }} disabled={true} required={true} id="seconds" onChange={(e) => onChange(hours, minutes, +e.target.value)} value={String(seconds).padStart(2, "0")} />
                </Paper>
                <InputLabel id="seconds" sx={{ fontSize: 18 }}>Seconds</InputLabel>
            </Grid>
        </Grid>
    );
}