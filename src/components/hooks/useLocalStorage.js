import { useState, useEffect } from "react";
import dayjs from "dayjs";

export default function useLocalStorage(key, initialValue) {
    // Reviver: converts ISO date strings back into Day.js objects
    const parseWithDayjs = (key, value) => {
        if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
            return dayjs(value);
        }
        return value;
    };

    const [value, setValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item, parseWithDayjs) : initialValue;
        } catch (error) {
            console.error("Error reading localStorage key “" + key + "”:", error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Error setting localStorage key “" + key + "”:", error);
        }
    }, [key, value]);

    return [value, setValue];
}
