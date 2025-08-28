import { useState, useCallback } from 'react';
import { decodeDuration, encodeDuration } from '../utils/TimerUtils';

export default function useTimer(durationMins = 25) {
    const [isStarted, setStarted] = useState(false);
    const [isPaused, setPaused] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const [duration, setDuration] = useState(encodeDuration(0, durationMins, 0));
    const [isFinished, setFinished] = useState(false);
    const minDuration = 60 * 1000;
    function updateDuration(hours, minutes, seconds) {
        setDuration(Math.max(encodeDuration(hours, minutes, seconds), minDuration));
    }
    function handleStart() {
        setPaused(false);
        setElapsed(0);
        setStarted(true);
    }
    const handleStop = useCallback(() => {
        setDuration(minDuration);
        setStarted(false);
        setPaused(false);
    }, [minDuration]); 
    function togglePause() {
        setPaused(!isPaused);
    }
    const handleFinish = useCallback(() => {
        setElapsed(prev => decodeDuration(Math.max(prev, 5000)));
        setFinished(true);
        alert("Timer has finished!");
        handleStop();
    }, [handleStop]);
    const decrementCounter = useCallback(() => {
        setDuration(prev => {
            if (prev <= 1000) {
                handleFinish();
                return 0;
            }
            return Math.max(prev - 1000, 0)
        });
        setElapsed(prev => prev + 1000);
    }, [handleFinish]);

    return {
        isStarted,
        isPaused,
        isFinished,
        elapsed,
        duration,
        handleStop,
        handleStart,
        handleFinish,
        togglePause,
        decrementCounter,
        updateDuration
    }
}