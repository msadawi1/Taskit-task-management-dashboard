import React, { useState, useRef } from "react";
import { uid } from 'uid';
import dayjs from "dayjs";
import Navbar from "./components/Navbar"
import TimerMenu from "./components/TimerMenu";
import Dashboard from "./components/Dashboard"
import { TasksContext } from "./components/context";
import { createTheme, ThemeProvider, CssBaseline, Box } from '@mui/material';
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
  const [weeklyGoals, setWeeklyGoals] = useState([
    { id: 1, title: "Complete Project Report", status: "in-progress" },
    { id: 2, title: "Improve Fitness", status: "in-progress" },
    { id: 3, title: "Develop Coding Skills", status: "completed" }
  ]);

  const formRef = useRef(null);
  const taskTitleRef = useRef(null);
  const [tasks, setTasks] = useState([
    {
      id: uid(),
      title: "Write Introduction & Methodology",
      priority: 0,
      weeklyGoalId: 1,
      dueDate: dayjs("2025-08-19T10:00:00"),
      status: true
    },
    {
      id: uid(),
      title: "Analyze Results & Create Charts",
      priority: 1,
      weeklyGoalId: 1,
      dueDate: dayjs("2025-08-20T14:00:00"),
      status: false
    },
    {
      id: uid(),
      title: "Run 10km",
      priority: 0,
      weeklyGoalId: 2,
      dueDate: dayjs("2025-08-21T07:30:00"),
      status: false
    },
    {
      id: uid(),
      title: "Do strength training (upper body)",
      priority: 2,
      weeklyGoalId: 2,
      dueDate: dayjs("2025-08-19T18:30:00"),
      status: true
    },
    {
      id: uid(),
      title: "Solve 5 coding challenges",
      priority: 0,
      weeklyGoalId: 3,
      dueDate: dayjs("2025-08-17T20:00:00"),
      status: true
    }
  ]);
  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      taskTitleRef.current?.focus();
    }, 300);
  }
  function removeGoal(id) {
    setWeeklyGoals(prevGoals => prevGoals.filter(goal => goal.id !== id));
    setTasks(prevValue => prevValue.filter(task => task.weeklyGoalId !== id));
  }
  function addGoal(input) {
    setWeeklyGoals(prevValue => [...prevValue, {
      id: prevValue.length > 0 ? prevValue[prevValue.length - 1].id + 1 : 1,
      title: input,
      status: 'in-progress'
    }]);
  }
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
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <TabPanel value={tab} index={navbarIndex.dashboard}>
            <TasksContext.Provider value={{ tasks, setTasks }}>
              <Dashboard scrollToForm={scrollToForm} goals={weeklyGoals} onRemove={removeGoal} onAdd={addGoal} formRef={formRef} inputRef={taskTitleRef} />
            </TasksContext.Provider>
          </TabPanel>
          <TabPanel value={tab} index={navbarIndex.timer}>
            <TasksContext.Provider value={{ tasks, setTasks }}>
              <TimerMenu />
            </TasksContext.Provider>
          </TabPanel>
          <TabPanel value={tab} index={navbarIndex.calendar}>
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