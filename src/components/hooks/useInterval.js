import { useEffect, useRef } from "react";

export function useInterval(callback, delay, condition = true) {
    const savedCallback = useRef(callback);
    /* Explaination:
    Older version (inside Timer):
    useEffect(() => {
            if (!isStarted || isPaused) return;
            const interval = setInterval(() => {
                onDecrement();
            }, 1000);
            return () => clearInterval(interval);
        }, [isStarted, isPaused, onDecrement]);

        Timer component re-renders at each tick (due to duration change), meaning that the callback (onDecrement) reference is changing
        at each render, since the effect is dependent on the callback, this repeatedly creates an interval and clear it
        each second which is wasteful, instead we can remove the callback dependency from the effect and only set one interval
        but we need to use the latest callback (onDecrement, since each time the component renders a different
        version of it is created), that's why we update the reference to the callback each time.
    */
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]); // use latest callback

    useEffect(() => {
        if (!condition || delay === null) return;

        function tick() {
            savedCallback.current();
        }

        const id = setInterval(tick, delay);
        return () => clearInterval(id);
    }, [delay, condition]);
}
