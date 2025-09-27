import useTimerCore from './useTimerCore';
import useTaskSelection from './useTaskSelection';
import useSettings from './useSettings';

export default function useTimerSession() {
    const { settings } = useSettings();
    const timer = useTimerCore(settings.defaultDuration);
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