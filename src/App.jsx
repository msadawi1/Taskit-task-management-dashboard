import React, { useState, useRef } from "react";
import Navbar from "./components/Navbar"
import TimerMenu from "./components/TimerMenu";
import Dashboard from "./components/Dashboard";
import Calendar from "./components/Calendar"
import { TasksContext } from "./components/context";
import { createTheme, ThemeProvider, CssBaseline, Box } from '@mui/material';
import useManager from "./components/hooks/useManager";
import useLogger from "./components/hooks/useLogger";

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
      default: '#ffffff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#2c2c2cff',
      secondary: '#555555',
    },
  },
});


const navbarIndex = {
  dashboard: 0,
  timer: 1,
  calendar: 2,
  summaries: 3,
  settings: 4,
}

function App() {
  const [tab, setTab] = useState(navbarIndex.dashboard);
  const { weeklyGoals, tasks, removeGoalAndTasks, addGoal, setTasks } = useManager();
  const taskTitleRef = useRef(null);
  function TabPanel({ children, value, index }) {
    return value === index ? <Box sx={{ p: 2, flexGrow: 1 }}>{children}</Box> : null;
  }
  useLogger("Tasks array:", tasks);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Box sx={{ width: 300, flexShrink: 0, borderRight: 1, borderColor: "divider", position: 'sticky', top: 0, height: '100vh' }}>
          <Navbar value={tab} onChange={setTab} index={navbarIndex} />
        </Box>
        <Box sx={{ flexGrow: 1, p: 3, mr: 10 }}>
          <TabPanel value={tab} index={navbarIndex.dashboard}>
            <TasksContext.Provider value={{ tasks, setTasks }}>
              <Dashboard goals={weeklyGoals} onRemove={removeGoalAndTasks} onAdd={addGoal} inputRef={taskTitleRef} />
            </TasksContext.Provider>
          </TabPanel>
          <TabPanel value={tab} index={navbarIndex.timer}>
            <TasksContext.Provider value={{ tasks, setTasks }}>
              <TimerMenu />
            </TasksContext.Provider>
          </TabPanel>
          <TabPanel value={tab} index={navbarIndex.calendar}>
            <Calendar />
          </TabPanel>
          <TabPanel value={tab} index={navbarIndex.summaries}>
          </TabPanel>
          <TabPanel value={tab} index={navbarIndex.settings}>
          </TabPanel>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;