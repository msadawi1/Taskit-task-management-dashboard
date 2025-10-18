import React from 'react';
import Timer from "./Timer";
import TabTitle from "./mini_components/TabTitle.jsx";
import Box from "@mui/material/Box";
import SessionSummary from "./TimerPage/SessionSummary.jsx";
import TimerControls from "./TimerPage/TimerControls.jsx";
import SessionStatus from "./TimerPage/SessionStatus.jsx";
import Caption from "./mini_components/Caption.jsx";
import { useTimerContext } from './contexts/TimerContext.jsx';

function TimerMenu() {
    const {
        status,
        elapsed,
        duration,
        updateDuration,
        start: startSession,
        stop: stopSession,
        togglePause
    } = useTimerContext();
    return (
        <Box component='section' sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 3 }}>
            <Box component='section' display='flex' flexDirection={'column'}>
                <TabTitle title="Focus Timer" />
                <Caption text="Boost your productivity with a timed session" />
            </Box>
            <Box component='section' sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 2 }}>
                <Box>
                    {(status === "running" || status === "paused") && <SessionStatus isRunning={status === "running"} />}
                </Box>
                <Timer elapsed={elapsed} duration={duration} onChange={updateDuration} isPaused={status === "paused"} isRunning={status === "running"} />
                <TimerControls isRunning={status === "running"} isStoppedOrFinished={status === "stopped" || status === "finished"} isPaused={status === "paused"} onStart={startSession} onPause={togglePause} onStop={stopSession} />
                {status === "finished" && <SessionSummary elapsed={elapsed} />}
            </Box>
        </Box>
    );
}

export default React.memo(TimerMenu);