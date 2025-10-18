import { useState, useCallback } from "react";
import { createContext, useContext } from "react";

const SnackbarContext = createContext(null);

// state goes here
export default function SnackbarContextProvider({ children }) {
    const [state, setState] = useState({
        open: true,
        message: 'Snackbar',
        vertical: 'bottm',
        horizontal: 'left',
    });

    return (
        <SnackbarContext.Provider value={{ state, setState }}>
            {children}
        </SnackbarContext.Provider>
    );
}

// logic goes here
export function useSnackbarContext() {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error("Error: useSnackbarContext must be used inside a SnackbarContextProvider");
    }
    const { state, setState } = context;

    const showSnackbar = useCallback((message, vertical = 'bottom', horizontal = 'left') => {
        setState(({
            open: true,
            message,
            vertical,
            horizontal
        }));
    }, [setState]);

    const closeSnackbar = useCallback(() => {
        setState(prev => ({
            ...prev,
            open: false
        }));
    }, [setState]);

    return { ...state, showSnackbar, closeSnackbar };
}