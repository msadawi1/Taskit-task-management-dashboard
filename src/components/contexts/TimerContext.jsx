import { createContext, useContext } from "react";
import useTimerSession from "../hooks/useTimerSession";

const TimerContext = createContext(null);

export default function TimerContextProvider({ children, defaultDuration, shouldAlert }) {
    const timer = useTimerSession(defaultDuration, shouldAlert);
    return (
        <TimerContext.Provider value={timer}>
            {children}
        </TimerContext.Provider>
    );
}

export function useTimerContext() {
    const context = useContext(TimerContext);
    if (!context) {
        throw new Error("Error: useTimerContext must be used inside a TimerContextProvider");
    }
    return context;
}