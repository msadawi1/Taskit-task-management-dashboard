import { encodeDuration } from '../utils/TimerUtils';
import { useState, useCallback } from 'react';

export default function useTimerCore(durationMins = 25) {
    const [isStarted, setStarted] = useState(false);
    const [isPaused, setPaused] = useState(false);
    // initial elapsed time as -1000 explained below
    const [elapsed, setElapsed] = useState(-1000);
    const [duration, setDuration] = useState(encodeDuration(0, durationMins, 0));
    const [isFinished, setFinished] = useState(false);
    const minDuration = 60 * 1000;
    function updateDuration(hours, minutes, seconds) {
        setDuration(Math.max(encodeDuration(hours, minutes, seconds), minDuration));
    }
    function handleStart() {
        setPaused(false);
        setElapsed(-1000);
        setStarted(true);
        setFinished(false);
    }
    const handleStop = useCallback(() => {
        setStarted(false);
        setPaused(false);
        setFinished(false);
    }, []);
    function togglePause() {
        setPaused(!isPaused);
    }
    const handleFinish = useCallback(() => {
        handleStop();
        setFinished(true);
    }, [handleStop]);
    const decrementCounter = useCallback(() => {
        setDuration(prev => {
            if (prev < 1000) {
                handleFinish();
                return minDuration;
            }
            return Math.max(prev - 1000, 0)
        });
        // Note: prev < 1000 allows the user to see the 00 seconds timing but will increase elapsed time
        // by 1 second, that's why we start with -1000.
        setElapsed(prev => prev + 1000);
    }, [handleFinish, minDuration]);

    return {
        isStarted,
        isPaused,
        isFinished,
        elapsed,
        duration,
        handleStop,
        handleStart,
        togglePause,
        decrementCounter,
        updateDuration,
    }
}