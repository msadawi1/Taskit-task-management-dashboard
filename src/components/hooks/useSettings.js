import useLocalStorage from "./useLocalStorage";

export default function useSettings() {
    const [settings, setSettings] = useLocalStorage("settings", {
        theme: 'dark',
        defaultDuration: 25,
        notifications: true,
    });
    function switchLightMode() {
        setSettings(prev => ({
            ...prev,
            theme: prev.theme === 'light' ? 'dark' : 'light'
        }));
    }
    function setDefaultDuration(duration) {
        setSettings(prev => ({
            ...prev,
            defaultDuration: duration
        }));
    }
    function toggleNotifications() {
        setSettings(prev => ({
            ...prev,
            notifications: !prev.notifications
        }));
    }
    return {
        settings,
        switchLightMode,
        setDefaultDuration,
        toggleNotifications
    }
}