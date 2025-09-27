import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TabTitle from "./mini_components/TabTitle";
import Caption from "./mini_components/Caption";
import Appearance from "./Settings/Appearance";
import TimerSettings from "./Settings/TimerSettings";
import Notifications from "./Settings/Notifications";
import useSettings from "./hooks/useSettings";

export default function Settings() {
    const { settings, setDefaultDuration, switchLightMode, toggleNotifications } = useSettings();
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
                    <TimerSettings defaultDuration={settings.defaultDuration} onChange={setDefaultDuration} />
                </Grid>
                <Grid size={12}>
                    <Notifications enabled={settings.notifications} onChange={toggleNotifications} />
                </Grid>
            </Grid>
        </Box>
    );
}