import React, { useState } from "react";
import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Task from "./Task";
import TaskForm from "./TaskForm";

export default function TaskSection(props) {
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
    function addTask(title, goalId, priority, dueDate) {
        setTasks(prevValue => [...prevValue, {
            id: prevValue.length + 1, // to be fixed led
            title: title,
            priority: priority,
            weeklyGoalId: goalId,
            dueDate: dueDate,
        }]);
    }
    function completeTask(id) {
        setTasks(prevValue => prevValue.map(task => task.id === id ? {...task, status: !task.status} : task ));
    }
    function removeTask(id) {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    }
    return (
        <Grid container spacing={1} sx={{ width: '100%' }}>
            <Grid size={12}>
                <Typography variant='h5' fontWeight={500} color="primary">Daily Tasks</Typography>
            </Grid>
            <Grid container sx={{maxHeight: '250px', overflowY: 'scroll', m: 0, pt: 2}}>
                {tasks.map(task =>
                    <Grid key={task.id} size={12}>
                        <Task onCheck={completeTask} {...task} goal={props.goals.find(goal => goal.id === task.weeklyGoalId)} onHide={removeTask} />
                    </Grid>
                )}
            </Grid>
            <Grid size={12} sx={{ mt: 2 }}>
                <Typography variant='h6' fontWeight={500} color="primary">New Task</Typography>
            </Grid>
            <Grid size={12}>
                <TaskForm onAdd={addTask} weeklyGoals={props.goals} />
            </Grid>
        </Grid>
    );
}