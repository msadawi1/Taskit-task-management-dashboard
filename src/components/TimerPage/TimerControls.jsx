import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function TimerControls({ isStarted, isPaused, onStart, onPause, onStop }) {
    return (
        <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
            {!isStarted &&
                <Button fullWidth disableElevation variant="contained"
                    sx={{ height: 50, fontSize: 18 }}
                    color="primary" onClick={onStart}>Start Session</Button>}
            {isStarted && !isPaused &&
                <Button fullWidth disableElevation variant="contained"
                    sx={{ height: 50, fontSize: 18 }}
                    color="secondary" onClick={onPause}>Pause</Button>}
            {isStarted && isPaused &&
                <Button fullWidth disableElevation variant="contained"
                    sx={{ height: 50, fontSize: 18 }}
                    color="primary" onClick={onPause}>Resume</Button>}
            {isStarted &&
                <Button fullWidth disableElevation variant="contained"
                    sx={{ height: 50, fontSize: 18 }}
                    color="secondary" onClick={onStop}>Stop</Button>}
        </Box>
    );
}