import React, { useState, useRef, useEffect } from "react";
import Fade from '@mui/material/Fade';
import Drawer from "./components/Drawer"
import TimerMenu from "./components/TimerMenu";
import Dashboard from "./components/Dashboard";
import Calendar from "./components/Calendar"
import Progress from "./components/Progress";
import Settings from "./components/Settings";
import { TasksContext } from "./components/context";
import Header from "./components/Header";
import { createTheme, ThemeProvider, CssBaseline, Box, useTheme } from '@mui/material';
import useManager from "./components/hooks/useManager";
import useLogger from "./components/hooks/useLogger";
import Footer from "./components/Footer"

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
  palette: {
    mode: 'light',
    primary: {
      main: '#424242ff',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#e5e5e5ff',
      contrastText: '#454545ff',
    },
    warning: {
      main: '#c62828',      // Red 800
      dark: '#8e0000',      // Dark crimson
      light: '#ef5350',     // Red 400
      contrastText: '#ffffff',
    },
    info: {
      main: '#ef6c00',      // Orange 800 (keep as is)
      dark: '#b53d00',
      light: '#ff9800',
      contrastText: '#ffffff',
    },
    success: {
      main: '#2e7d32',      // Green 800
      dark: '#1b5e20',
      light: '#66bb6a',
      contrastText: '#ffffff',
    },
    blue: {
      main: '#11346aff',      // Blue 800 (deep blue for info-like use)
      dark: '#0d47a1',      // Blue 900 (navy)
      light: '#42a5f5',     // Blue 400 (bright accent)
      contrastText: '#ffffff',
    },
    background: {
      default: '#f7f7f7',
      paper: '#fefefe',
      dark: '#aaaaaa'
    },
    text: {
      primary: '#2c2c2cff',
      secondary: '#555555',
    },
  },
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
    root.style.setProperty('--fc-grid-border', theme.palette.secondary.main);
  }, [theme]);
  return null;
}

const navbarIndex = {
  dashboard: 0,
  timer: 1,
  calendar: 2,
  progress: 3,
  settings: 4,
}

function App() {
  const [tab, setTab] = useState(navbarIndex.dashboard);
  const [drawer, setDrawer] = useState(false);
  const { weeklyGoals, tasks, removeGoalAndTasks, addGoal, setTasks } = useManager();
  const taskTitleRef = useRef(null);
  function TabPanel({ children, value, index }) {
    return value === index ? <Box sx={{ flexGrow: 1 }}>{children}</Box> : null;
  }
  function toggleDrawer() {
    setDrawer(prev => !prev);
  }
  useLogger("Tasks array:", tasks);
  return (
    <ThemeProvider theme={theme}>
      <ThemeVariables />
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Box sx={{ display: { xs: drawer ? 'block' : 'none', md: "block" }, width: "clamp(50px, 20%, 300px)", flexShrink: 0, borderRight: 1, borderColor: "divider", position: 'sticky', top: 0, height: '100vh' }}>
          <Drawer value={tab} onChange={setTab} index={navbarIndex} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1, mt: 3, px: { xs: 2.5, sm: 3, md: 3.5, lg: 4.5, xl: 5 } }}>
          <Header onMenuClick={toggleDrawer} />
          <TabPanel value={tab} index={navbarIndex.dashboard}>
            <Fade in={tab === navbarIndex.dashboard} timeout={200} mountOnEnter unmountOnExit>
              <div>
                <TasksContext.Provider value={{ tasks, setTasks }}>
                  <Dashboard goals={weeklyGoals} onRemove={removeGoalAndTasks} onAdd={addGoal} inputRef={taskTitleRef} />
                </TasksContext.Provider>
              </div>
            </Fade>
          </TabPanel>
          <TabPanel value={tab} index={navbarIndex.timer}>
            <Fade in={tab === navbarIndex.timer} timeout={200} mountOnEnter unmountOnExit>
              <div>
                <TasksContext.Provider value={{ tasks, setTasks }}>
                  <TimerMenu />
                </TasksContext.Provider>
              </div>
            </Fade>
          </TabPanel>
          <TabPanel value={tab} index={navbarIndex.calendar}>
            <Fade in={tab === navbarIndex.calendar} timeout={200} mountOnEnter unmountOnExit>
              <div>
                <Calendar />
              </div>
            </Fade>
          </TabPanel>
          <TabPanel value={tab} index={navbarIndex.progress}>
            <Fade in={tab === navbarIndex.progress} timeout={200} mountOnEnter unmountOnExit>
              <div>
                <Progress />
              </div>
            </Fade>
          </TabPanel>
          <TabPanel value={tab} index={navbarIndex.settings}>
            <Fade in={tab === navbarIndex.settings} timeout={200} mountOnEnter unmountOnExit>
              <div>
                <Settings />
              </div>
            </Fade>
          </TabPanel>
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;