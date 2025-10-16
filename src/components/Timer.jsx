import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { decodeSeconds } from "./utils/TimerUtils.js";

export default function Timer({ elapsed, duration, onChange, isRunning, isPaused }) {
    const remaining = duration - elapsed;
    let hours, minutes, seconds;
    if (isRunning || isPaused) {
        ({ hours, minutes, seconds } = decodeSeconds(remaining));
    } else {
        ({ hours, minutes, seconds } = decodeSeconds(duration));
    }
    console.log("H:M:S", seconds);

    return (
        <Grid container columnSpacing={{ xs: 0.5, md: 1 }}>
            <Grid size={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <Paper sx={{ alignSelf: 'stretch' }} elevation={1}>
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
                    }} disabled={isRunning || isPaused} required={true} id="hours" onChange={(e) => onChange(+e.target.value, minutes, seconds)} value={String(hours).padStart(2, "0")} />
                </Paper>
                <InputLabel id="hours" sx={{ fontSize: 18 }}>Hours</InputLabel>
            </Grid>
            <Grid size={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <Paper sx={{ alignSelf: 'stretch' }} elevation={1}>
                    <TextField variant="standard" fullWidth={true} size="large" name="minutes" slotProps={{
                        htmlInput: {
                            'type': 'number', 'min': '5', 'max': '59', 'style': {
                                padding: '20px',
                                fontSize: '24px',
                                textAlign: 'center'
                            }
                        },
                        input: {
                            disableUnderline: true,
                        }
                    }} disabled={isRunning || isPaused} required={true} id="minutes" onChange={(e) => onChange(hours, +e.target.value, seconds)}
                        value={String(minutes).padStart(2, "0")} />
                </Paper>
                <InputLabel id="minutes" sx={{ fontSize: 18 }}>Minutes</InputLabel>
            </Grid>
            <Grid size={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <Paper sx={{ alignSelf: 'stretch' }} elevation={1}>
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