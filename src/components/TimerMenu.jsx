import Timer from "./Timer";
import Header from "./Header";
import Box from "@mui/material/Box";
import SessionSummary from "./TimerPage/SessionSummary.jsx";
import TaskSelector from "./TimerPage/TaskSelector.jsx";
import TimerControls from "./TimerPage/TimerControls.jsx";
import SessionStatus from "./TimerPage/SessionStatus.jsx";
import useTimer from "./hooks/useTimer.js"

export default function TimerMenu() {
    // default value 25 minutes
    const { 
        isStarted,
        isPaused,
        isFinished,
        elapsed,
        duration,
        handleStart,
        handleStop,
        togglePause,
        decrementCounter,
        updateDuration
     } = useTimer();
    return (
        <Box component='section' sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 3 }}>
            <Header />
            <Box component='section' sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 2 }}>
                <Box sx={{ height: 70 }}>
                    {!isStarted && <TaskSelector /> }
                    {isStarted && <SessionStatus />}
                </Box>
                <Timer duration={duration} onChange={updateDuration} onDecrement={decrementCounter} isStarted={isStarted} isPaused={isPaused} />
                <TimerControls isStarted={isStarted} isPaused={isPaused} onStart={handleStart} onPause={togglePause} onStop={handleStop}/>
                {isFinished && <SessionSummary elapsed={elapsed}/>}
            </Box>
        </Box>
    );
}