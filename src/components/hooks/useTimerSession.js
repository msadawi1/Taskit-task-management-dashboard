import { encodeDuration } from '../utils/TimerUtils';
import { useState, useCallback, useRef, useEffect } from 'react';

export default function useTimerSession(durationMins) {   
    const durationInSeconds = encodeDuration(0, durationMins, 0);
    
    const [status, setStatus] = useState("stopped");
    const [elapsed, setElapsed] = useState(0);
    const [duration, setDuration] = useState(durationInSeconds);
    const startTimeRef = useRef(null);
    const pausedTimeRef = useRef(null);
    const totalPausedRef = useRef(null)
    const intervalRef = useRef(null); // ref for clearning interval later

    const minDuration = 60 * 1000;
    
    function updateDuration(hours, minutes, seconds) {
        setDuration(Math.max(encodeDuration(hours, minutes, seconds), minDuration));
    }

    const start = useCallback(() => {
        if (status === "running") return;
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
        if (status === "paused") 
            setStatus("running");
        else
            setStatus("paused");
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
                console.log("Ticking");
                const now = Date.now();
                const newElapsed = elapsed + Math.floor((now - startTimeRef.current) / 1000);
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