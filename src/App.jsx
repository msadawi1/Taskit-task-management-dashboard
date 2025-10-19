import { useState, useEffect, useMemo, useCallback } from "react";
import Drawer from "./components/Drawer"
import useMediaQuery from '@mui/material/useMediaQuery';
import TimerMenu from "./components/TimerMenu";
import Dashboard from "./components/Dashboard";
import Calendar from "./components/Calendar"
import Progress from "./components/Progress";
import Settings from "./components/Settings";
import Header from "./components/Header";
import { createTheme, ThemeProvider, CssBaseline, Box } from '@mui/material';
import Footer from "./components/Footer"
import useSettings from "./components/hooks/useSettings";
import { lightPalette, darkPalette } from "./components/utils/Theme";
import Tab from "./components/Tab";
import SnackbarContextProvider from "./components/contexts/SnackbarContext";
import TimerContextProvider from "./components/contexts/TimerContext";
import SnackbarFeedback from "./components/mini_components/Snackbar";

function App() {
  const { settings, setDefaultDuration, switchLightMode, toggleNotifications } = useSettings();

  const [themeMode, setThemeMode] = useState(settings.theme);

  useEffect(() => {
    setThemeMode(settings.theme);
  }, [settings]);

  const theme = useMemo(() => {

    return createTheme({
      components: {
        MuiFormLabel: {
          styleOverrides: {
            asterisk: {
              display: "none",
            },
          },
        },
      },
      palette: themeMode === 'dark' ? darkPalette : lightPalette,
    });

  }, [themeMode])

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--fc-primary', theme.palette.primary.main);
    root.style.setProperty('--fc-primary-contrast', theme.palette.primary.contrastText);
    root.style.setProperty('--fc-secondary', theme.palette.secondary.main);
    root.style.setProperty('--fc-bg', theme.palette.background.paper);
    root.style.setProperty('--fc-bg-hover', theme.palette.background.dark);
    root.style.setProperty('--fc-text', theme.palette.text.primary);
    root.style.setProperty('--fc-text-secondary', theme.palette.text.secondary);
    root.style.setProperty('--fc-grid-border', theme.palette.secondary.grid);
    root.style.setProperty('--fc-today-column-bg', theme.palette.primary.todayCol);
  }, [theme]);

  const navbarIndex = useMemo(() => {
    return {
      dashboard: 0,
      timer: 1,
      calendar: 2,
      progress: 3,
      settings: 4,
    }
  }, []);

  const [tab, setTab] = useState(navbarIndex.dashboard);
  function handleTabChange(newValue) {
    setTab(newValue);
    setDrawerOpen(false);
  }
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  const toggleDrawer = useCallback(() => {
    setDrawerOpen(prev => !prev);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarContextProvider>
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
          {/* Drawer for all screens: permanent on md+, temporary on xs/sm */}
          {isMdUp ? (
            <Drawer
              value={tab}
              onChange={handleTabChange}
              index={navbarIndex}
              open={true}
              variant="permanent"
            />
          ) : (
            <Drawer
              value={tab}
              onChange={handleTabChange}
              index={navbarIndex}
              open={drawerOpen}
              onClose={toggleDrawer}
              variant="temporary"
            />
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1, mt: 3, px: { xs: 2.5, sm: 3, md: 3.5, lg: 4.5, xl: 5 } }}>
            <Header onMenuClick={toggleDrawer} />
            <Tab value={tab} index={navbarIndex.dashboard}>
              <Dashboard />
            </Tab>
            <TimerContextProvider defaultDuration={settings.defaultDuration} shouldAlert={settings.notifications}>
              <Tab value={tab} index={navbarIndex.timer}>
                <TimerMenu />
              </Tab>
            </TimerContextProvider>
            <Tab value={tab} index={navbarIndex.calendar}>
              <Calendar isMobile={!isMdUp}/>
            </Tab>
            <Tab value={tab} index={navbarIndex.progress}>
              <Progress />
            </Tab>
            <Tab value={tab} index={navbarIndex.settings}>
              <Settings
                settings={settings} setDefaultDuration={setDefaultDuration}
                switchLightMode={switchLightMode} toggleNotifications={toggleNotifications}
              />
            </Tab>
            <SnackbarFeedback />
            <Footer />
          </Box>
        </Box>
      </SnackbarContextProvider>
    </ThemeProvider>
  );
}

export default App;