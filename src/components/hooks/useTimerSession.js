import useTimerCore from './useTimerCore';
import useTaskSelection from './useTaskSelection';

export default function useTimerSession(durationMins = 25) {
    const timer = useTimerCore(durationMins);
    const selector = useTaskSelection();
    function startSession() {
        if (selector.input === '') {
            selector.setError(true);
            return;
        }
        selector.setSelectedTaskId(selector.input);
        timer.handleStart();
    }
    function stopSession() {
        selector.clearSelection();
        timer.handleStop();
    }
    return {
        ...timer,
        ...selector,
        startSession,
        stopSession
    }
}