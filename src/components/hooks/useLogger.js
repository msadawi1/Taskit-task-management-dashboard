import { useEffect } from "react";

function useLogger(label, value) {
    useEffect(() => {
        console.log(`[${label}]`, value);
    }, [value, label]);
}

export default useLogger;