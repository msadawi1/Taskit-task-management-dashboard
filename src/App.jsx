import React, { useState, useRef } from "react";
import dayjs from "dayjs";
import Sidebar from "./components/Sidebar"
import Header from "./components/Header";
import GoalSection from "./components/Goals";
import Tasks from "./components/Tasks";
import Box from "@mui/material/Box";
import { TasksContext, GoalSelectContext } from "./components/context";
import { createTheme, ThemeProvider, CssBaseline, Divider } from '@mui/material';

const sideBarWidth = 300;

const theme = createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          display: "none", // hide the star
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
      main: '#c62828',      // Red 800 (deep but vibrant)
      dark: '#8e0000',      // Rich dark crimson
      light: '#ef5350',     // Red 400 (slightly lighter than main)
      contrastText: '#ffffff',
    },
    info: {
      main: '#ef6c00',      // Orange 800 (burnt orange)
      dark: '#b53d00',      // Deep rust orange
      light: '#ff9800',     // Orange 500 (vivid accent)
      contrastText: '#ffffff',
    },
    success: {
      main: '#2e7d32',      // Green 800 (forest green)
      dark: '#1b5e20',      // Darker evergreen
      light: '#66bb6a',     // Green 400 (fresh accent)
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

function App() {
  const [weeklyGoals, setWeeklyGoals] = useState([
    { id: 1, title: "Complete Project Report", status: "in-progress" },
    { id: 2, title: "Improve Fitness", status: "in-progress" },
    { id: 3, title: "Develop Coding Skills", status: "completed" }
  ]);
  const [goalSelect, setGoalSelect] = useState('');
  const formRef = useRef(null);
  const taskTitleRef = useRef(null);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Write Introduction & Methodology",
      priority: 0,
      weeklyGoalId: 1,
      dueDate: dayjs("2025-08-19T10:00:00"),
      status: true
    },
    {
      id: 2,
      title: "Analyze Results & Create Charts",
      priority: 1,
      weeklyGoalId: 1,
      dueDate: dayjs("2025-08-20T14:00:00"),
      status: false
    },
    {
      id: 3,
      title: "Run 10km",
      priority: 0,
      weeklyGoalId: 2,
      dueDate: dayjs("2025-08-21T07:30:00"),
      status: false
    },
    {
      id: 4,
      title: "Do strength training (upper body)",
      priority: 2,
      weeklyGoalId: 2,
      dueDate: dayjs("2025-08-19T18:30:00"),
      status: true
    },
    {
      id: 5,
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
    }, 200);
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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Sidebar width={sideBarWidth} />
      <TasksContext.Provider value={{ tasks, setTasks }}>
        <GoalSelectContext.Provider value={{ goalSelect, setGoalSelect }}>
          <Box component='main' sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, p: 3, pr: 15, ml: `${sideBarWidth}px`, gap: 3 }}>
            <Header />
            <Divider />
            <GoalSection scrollToForm={scrollToForm} goals={weeklyGoals} onRemove={removeGoal} onAdd={addGoal} />
            <Divider />
            <Tasks formRef={formRef} inputRef={taskTitleRef} goals={weeklyGoals} />
          </Box>
        </GoalSelectContext.Provider>
      </TasksContext.Provider>
    </ThemeProvider>
  );
}

export default App;