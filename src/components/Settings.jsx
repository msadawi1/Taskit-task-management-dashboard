import React, { useCallback } from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TabTitle from "./mini_components/TabTitle";
import Caption from "./mini_components/Caption";
import Appearance from "./Settings/Appearance";
import TimerSettings from "./Settings/TimerSettings";
import Notifications from "./Settings/Notifications";
import { useSnackbarContext } from './contexts/SnackbarContext';

function Settings({ settings, setDefaultDuration, switchLightMode, toggleNotifications }) {
    const { showSnackbar } = useSnackbarContext();
    
    const handleDurationChange = useCallback((newValue) => {
        setDefaultDuration(newValue);
        showSnackbar("Default duration set to " + newValue + "m.");
    }, [setDefaultDuration, showSnackbar]);

    const handleNotificationChange = useCallback(() => {
        const prevValue = settings.notifications
        const switchValue = prevValue ? "off" : "on";
        toggleNotifications();
        showSnackbar("Timer alert turned " + switchValue + ".");
    }, [toggleNotifications, showSnackbar, settings]);

    return (
        <Box component='section' sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 3 }}>
            <Grid container spacing={2} width={{ xs: "100%", md: '70%' }}>
                <Grid size={12}>
                    <TabTitle title="Settings" />
                    <Caption text={"Customize your focus experience"} />
                </Grid>
                <Grid size={12}>
                    <Appearance theme={settings.theme} onChange={switchLightMode} />
                </Grid>
                <Grid size={12}>
                    <TimerSettings defaultDuration={settings.defaultDuration} onChange={handleDurationChange} />
                </Grid>
                <Grid size={12}>
                    <Notifications enabled={settings.notifications} onChange={handleNotificationChange} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default React.memo(Settings);