import { encodeDuration } from '../utils/TimerUtils';
import { useState, useCallback, useRef, useEffect, useMemo } from 'react';

export default function useTimerSession(durationMins) {
    const durationInSeconds = useMemo(() => {        
        return encodeDuration(0, durationMins, 0);
    }, [durationMins]);
    const [status, setStatus] = useState("stopped");
    const [elapsed, setElapsed] = useState(0);
    const [duration, setDuration] = useState(durationInSeconds);
    // useEffect to keep the default duration updated when settings are changed
    useEffect(() => {
        setDuration(durationInSeconds);
    }, [durationInSeconds]);
    const startTimeRef = useRef(null);
    const pausedTimeRef = useRef(null);
    const totalPausedRef = useRef(null);

    const intervalRef = useRef(null); // ref for clearning interval later

    const updateDuration = useCallback((hours, minutes, seconds) => {
        setDuration(Math.max(encodeDuration(hours, minutes, seconds), 60)); // 60 is minimum duration
    }, []);

    const timerAudio = useRef(null);
    // initialize audio once
    useEffect(() => {
        try {
            const src = (process.env.PUBLIC_URL || '') + '/sounds/timer-alert.mp3';
            timerAudio.current = new Audio(src);
            timerAudio.current.preload = 'auto';
            // attempt to load the resource
            try { timerAudio.current.load(); } catch (e) { /* ignore load errors */ }
        } catch (e) {
            console.warn('Failed to initialize timer audio', e);
            timerAudio.current = null;
        }
    }, []);

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
        if (timerAudio.current) {
            // reset and play; guard against play() rejection
            try {
                timerAudio.current.pause();
                timerAudio.current.currentTime = 0;
                const p = timerAudio.current.play();
                if (p && p.catch) p.catch(err => console.warn('Audio play failed', err));
            } catch (err) {
                console.warn('Audio playback error', err);
            }
        }
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
        if (timerAudio.current) {
            // reset and play; guard against play() rejection
            try {
                timerAudio.current.pause();
                timerAudio.current.currentTime = 0;
                const p = timerAudio.current.play();
                if (p && p.catch) p.catch(err => console.warn('Audio play failed', err));
            } catch (err) {
                console.warn('Audio playback error', err);
            }
        }
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