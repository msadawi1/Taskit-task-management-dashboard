import React from 'react';
import Timer from "./Timer";
import TabTitle from "./mini_components/TabTitle.jsx";
import Box from "@mui/material/Box";
import SessionSummary from "./TimerPage/SessionSummary.jsx";
import TimerControls from "./TimerPage/TimerControls.jsx";
import SessionStatus from "./TimerPage/SessionStatus.jsx";
import useTimerSession from "./hooks/useTimerSession.js";
import Caption from "./mini_components/Caption.jsx";

function TimerMenu() {
    // default value 25 minutes
    const {
        isStarted,
        isPaused,
        isFinished,
        elapsed,
        duration,
        togglePause,
        decrementCounter,
        updateDuration,
        startSession,
        stopSession,
    } = useTimerSession();
    return (
        <Box component='section' sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 3 }}>
            <Box component='section' display='flex' flexDirection={'column'}>
                <TabTitle title="Focus Timer" />
                <Caption text="Boost your productivity with a timed session" />
            </Box>
            <Box component='section' sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 2 }}>
                <Box>
                    {isStarted && <SessionStatus isPaused={isPaused} />}
                </Box>
                <Timer duration={duration} onChange={updateDuration} onDecrement={decrementCounter} isStarted={isStarted} isPaused={isPaused} />
                <TimerControls isStarted={isStarted} isPaused={isPaused} onStart={startSession} onPause={togglePause} onStop={stopSession} />
                {isFinished && <SessionSummary elapsed={elapsed} />}
            </Box>
        </Box>
    );
}

export default React.memo(TimerMenu);