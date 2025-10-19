import { useCallback } from "react";
import useLocalStorage from "./useLocalStorage";

export default function useSettings() {
    const [settings, setSettings] = useLocalStorage("settings", {
        theme: 'dark',
        defaultDuration: 25,
        notifications: true,
    });
    const switchLightMode = useCallback(() => {
        setSettings(prev => ({
            ...prev,
            theme: prev.theme === 'light' ? 'dark' : 'light'
        }));
    }, [setSettings]);
    const setDefaultDuration = useCallback((duration) => {
        setSettings(prev => ({
            ...prev,
            defaultDuration: duration
        }));
    }, [setSettings]);
    const toggleNotifications = useCallback(() => {
        setSettings(prev => ({
            ...prev,
            notifications: !prev.notifications
        }));
    }, [setSettings]);
    return {
        settings,
        switchLightMode,
        setDefaultDuration,
        toggleNotifications
    }
}