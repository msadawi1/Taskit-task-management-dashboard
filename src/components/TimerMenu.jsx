import Timer from "./Timer";
import TabTitle from "./mini_components/TabTitle.jsx";
import Box from "@mui/material/Box";
import SessionSummary from "./TimerPage/SessionSummary.jsx";
import TaskSelector from "./TimerPage/TaskSelector.jsx";
import TimerControls from "./TimerPage/TimerControls.jsx";
import SessionStatus from "./TimerPage/SessionStatus.jsx";
import useTimerSession from "./hooks/useTimerSession.js";

export default function TimerMenu() {
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
        tasks,
        handleChange,
        input,
        error,
        startSession,
        stopSession,
        getSelectedTaskTitle,
    } = useTimerSession();
    return (
        <Box component='section' sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 3 }}>
            <TabTitle title="Focus Timer"/>
            <Box component='section' sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 2 }}>
                <Box sx={{ height: 70 }}>
                    {!isStarted && <TaskSelector tasks={tasks} error={error} onChange={handleChange} taskId={input} />}
                    {isStarted && <SessionStatus taskTitle={getSelectedTaskTitle()} />}
                </Box>
                <Timer duration={duration} onChange={updateDuration} onDecrement={decrementCounter} isStarted={isStarted} isPaused={isPaused} />
                <TimerControls isStarted={isStarted} isPaused={isPaused} onStart={startSession} onPause={togglePause} onStop={stopSession} />
                {isFinished && <SessionSummary elapsed={elapsed} taskTitle={getSelectedTaskTitle()} />}
            </Box>
        </Box>
    );
}