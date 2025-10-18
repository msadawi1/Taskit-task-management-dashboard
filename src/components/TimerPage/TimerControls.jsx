import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function TimerControls({ isRunning, isStoppedOrFinished, isPaused, onStart, onPause, onStop }) {    
    return (
        <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
            {isStoppedOrFinished &&
                <Button fullWidth disableElevation variant="contained"
                    sx={{ height: 50, fontSize: 18 }}
                    color="primary" onClick={onStart}>Start Session</Button>}
            {isRunning &&
                <Button fullWidth disableElevation variant="contained"
                    sx={{ height: 50, fontSize: 18 }}
                    color="secondary" onClick={onPause}>Pause</Button>}
            {isPaused &&
                <Button fullWidth disableElevation variant="contained"
                    sx={{ height: 50, fontSize: 18 }}
                    color="primary" onClick={onPause}>Resume</Button>}
            {(isRunning || isPaused) &&
                <Button fullWidth disableElevation variant="contained"
                    sx={{ height: 50, fontSize: 18 }}
                    color="secondary" onClick={onStop}>Stop</Button>}
        </Box>
    );
}

export default React.memo(TimerControls);