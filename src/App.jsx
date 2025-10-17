import React, { useState, useEffect, useMemo } from "react";
import Fade from '@mui/material/Fade';
import Drawer from "./components/Drawer"
import useMediaQuery from '@mui/material/useMediaQuery';
import TimerMenu from "./components/TimerMenu";
import Dashboard from "./components/Dashboard";
import Calendar from "./components/Calendar"
import Progress from "./components/Progress";
import Settings from "./components/Settings";
import Header from "./components/Header";
import { createTheme, ThemeProvider, CssBaseline, Box, useTheme } from '@mui/material';
import Footer from "./components/Footer"
import useSettings from "./components/hooks/useSettings";
import useTimerSession from "./components/hooks/useTimerSession";


function App() {
  const { settings, setDefaultDuration, switchLightMode, toggleNotifications } = useSettings();

  const {
    status,
    start,
    stop,
    togglePause,
    duration,
    elapsed,
    updateDuration
  } = useTimerSession(settings.defaultDuration);

  const themeMode = settings.theme;
  const lightPalette = {
    mode: 'light',
    primary: {
      main: '#214587',
      contrastText: '#dcedfd',
      light: '#234eaa',
      todayCol: '#f6f6f6'
    },
    secondary: {
      main: '#d1d1d1',
      contrastText: '#4d4d4d',
      dark: '#969696',
      grid: '#cccccc'
    },
    warning: {
      main: '#c62828',
      dark: '#8e0000',
      light: '#ef5350',
      contrastText: '#ffffff',
    },
    info: {
      main: '#ef6c00',
      dark: '#b53d00',
      light: '#ff9800',
      contrastText: '#ffffff',
    },
    success: {
      main: '#2e7d32',
      dark: '#1b5e20',
      light: '#66bb6a',
      contrastText: '#ffffff',
    },
    blue: {
      main: '#11346aff',
      dark: '#0d47a1',
      light: '#42a5f5',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f7f7f7',
      paper: '#fefefe',
      dark: '#aaaaaa'
    },
    text: {
      primary: '#6d6d6d',
      secondary: '#555555',
    },
  };

  const darkPalette = {
    mode: 'dark',
    primary: {
      main: '#4192f0',
      contrastText: '#192b52',
      light: '#e7f2fd',
      todayCol: '#000000'
    },
    secondary: {
      main: '#bfbfbf',
      contrastText: '#4d4d4d',
      dark: '#bfbfbf',
      grid: '#404040'
    },
    warning: {
      main: '#ef5350',
      dark: '#b71c1c',
      light: '#ffcdd2',
      contrastText: '#ffffff',
    },
    info: {
      main: '#ff811a',
      dark: '#b53d00',
      light: '#ff9800',
      contrastText: '#ffffff',
    },
    success: {
      main: '#2d8659',
      dark: '#388e3c',
      light: '#66bb6a',
      contrastText: '#ffffff',
    },
    blue: {
      main: '#1976d2',
      dark: '#0d47a1',
      light: '#64b5f6',
      contrastText: '#ffffff',
    },
    background: {
      default: '#1a1a1a',
      paper: '#1e1e1e',
      dark: '#23272f',
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#bdbdbd',
    },
  };

  const theme = createTheme({
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

  function ThemeVariables() {
    const theme = useTheme();
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
    return null;
  }

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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  function TabPanel({ children, value, index }) {
    return value === index ? <Box sx={{ flexGrow: 1 }}>{children}</Box> : null;
  }
  function toggleDrawer() {
    setDrawerOpen(prev => !prev);
  }


  // Memoized tab pages
  const DashboardTab = useMemo(() => (
    <TabPanel value={tab} index={navbarIndex.dashboard}>
      <Fade in={tab === navbarIndex.dashboard} timeout={200} mountOnEnter unmountOnExit>
        <div>
          <Dashboard />
        </div>
      </Fade>
    </TabPanel>
  ), [tab, navbarIndex]);

  const TimerMenuTab = useMemo(() => (
    <TabPanel value={tab} index={navbarIndex.timer}>
      <Fade in={tab === navbarIndex.timer} timeout={200} mountOnEnter>
        <div>
          <TimerMenu
            status={status} togglePause={togglePause}
            elapsed={elapsed} duration={duration} updateDuration={updateDuration}
            startSession={start} stopSession={stop}
          />
        </div>
      </Fade>
    </TabPanel>
  ), [
    tab, navbarIndex, status, togglePause, duration, elapsed,
    updateDuration, start, stop
  ]);

  const CalendarTab = useMemo(() => (
    <TabPanel value={tab} index={navbarIndex.calendar}>
      <Fade in={tab === navbarIndex.calendar} timeout={200} mountOnEnter unmountOnExit>
        <div>
          <Calendar />
        </div>
      </Fade>
    </TabPanel>
  ), [tab, navbarIndex]);

  const ProgressTab = useMemo(() => (
    <TabPanel value={tab} index={navbarIndex.progress}>
      <Fade in={tab === navbarIndex.progress} timeout={200} mountOnEnter unmountOnExit>
        <div>
          <Progress />
        </div>
      </Fade>
    </TabPanel>
  ), [tab, navbarIndex]);

  const SettingsTab = useMemo(() => (
    <TabPanel value={tab} index={navbarIndex.settings}>
      <Fade in={tab === navbarIndex.settings} timeout={200} mountOnEnter unmountOnExit>
        <div>
          <Settings settings={settings} setDefaultDuration={setDefaultDuration} switchLightMode={switchLightMode} toggleNotifications={toggleNotifications} />
        </div>
      </Fade>
    </TabPanel>
  ), [tab, navbarIndex, settings, setDefaultDuration, switchLightMode, toggleNotifications]);

  return (
    <ThemeProvider theme={theme}>
      <ThemeVariables />
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        {/* Drawer for all screens: permanent on md+, temporary on xs/sm */}
        {isMdUp ? (
          <Drawer
            value={tab}
            onChange={setTab}
            index={navbarIndex}
            open={true}
            variant="permanent"
          />
        ) : (
          <Drawer
            value={tab}
            onChange={setTab}
            index={navbarIndex}
            open={drawerOpen}
            onClose={toggleDrawer}
            variant="temporary"
          />
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1, mt: 3, px: { xs: 2.5, sm: 3, md: 3.5, lg: 4.5, xl: 5 } }}>
          <Header onMenuClick={toggleDrawer} />
          {DashboardTab}
          {TimerMenuTab}
          {CalendarTab}
          {ProgressTab}
          {SettingsTab}
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;