import { encodeDuration } from '../utils/TimerUtils';
import { useState, useCallback, useRef, useEffect } from 'react';

export default function useTimerSession(durationMins) {
    const durationInSeconds = encodeDuration(0, durationMins, 0);
    
    const [status, setStatus] = useState("stopped");
    const [elapsed, setElapsed] = useState(0);
    const [duration, setDuration] = useState(durationInSeconds);
    // useEffect to keep the default duration updated when settings are changed
    useEffect(() => {
        setDuration(encodeDuration(0, durationMins, 0));
    }, [durationMins]);
    const startTimeRef = useRef(null);
    const pausedTimeRef = useRef(null);
    const totalPausedRef = useRef(null);
    
    const intervalRef = useRef(null); // ref for clearning interval later

    const minDuration = 60;

    function updateDuration(hours, minutes, seconds) {
        setDuration(Math.max(encodeDuration(hours, minutes, seconds), minDuration));
    }

    const start = useCallback(() => {
        if (status === "running") return;
        totalPausedRef.current = 0; // restart total paused counter
        startTimeRef.current = Date.now();
        setElapsed(0);
        setStatus("running");
    }, [status])

    const stop = useCallback(() => {
        if (status === "stopped") return;
        setStatus("stopped");
        setDuration(durationInSeconds);
    }, [durationInSeconds, status]);

    const togglePause = useCallback(() => {
        if (status === "paused") { // when u unpause: accumulate the paused time
            totalPausedRef.current = totalPausedRef.current + Date.now() - pausedTimeRef.current;
            setStatus("running");
        } else { // when pause: record paused-at time
            pausedTimeRef.current = Date.now();
            setStatus("paused");
        }
    }, [status]);

    const finish = useCallback(() => {
        if (status === "finished") return;
        setStatus("finished");
        setDuration(durationInSeconds);
    }, [status, durationInSeconds]);

    useEffect(() => {
        // if timer is running and the start time is set
        if (status !== "running") return;

        const tick = () => {
            if (startTimeRef.current) {
                const now = Date.now();

                // if used paused -> deduct the total paused time from the total elapsed time
                let newElapsed;
                if (totalPausedRef) {
                    console.log("Paused for: ", totalPausedRef.current);
                    newElapsed = Math.floor(((now - startTimeRef.current) / 1000) - (totalPausedRef.current / 1000));
                } else {
                    newElapsed = Math.floor(((now - startTimeRef.current) / 1000));
                }

                if (newElapsed >= duration) {
                    setElapsed(duration);
                    finish();
                    clearInterval(intervalRef.current);
                } else {
                    setElapsed(newElapsed);
                }
            }
        };

        tick(); // run immediately so UI updates right away
        const intervalId = setInterval(tick, 1000); // update every second
        intervalRef.current = intervalId;

        return () => clearInterval(intervalRef.current);
    }, [status, duration, finish]);

    useEffect(() => {
        console.log("Status changed:", status);
    }, [status]);

    return {
        status,
        elapsed,
        duration,
        stop,
        start,
        togglePause,
        updateDuration,
    }
}