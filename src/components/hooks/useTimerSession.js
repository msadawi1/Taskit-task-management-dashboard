import useTimerCore from './useTimerCore';
import useSettings from './useSettings';

export default function useTimerSession() {
    const { settings } = useSettings();
    const timer = useTimerCore(settings.defaultDuration);
    function startSession() {
        timer.handleStart();
    }
    function stopSession() {
        timer.handleStop();
    }
    return {
        ...timer,
        startSession,
        stopSession
    }
}