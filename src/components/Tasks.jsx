import React from "react";
import { useTasksContext } from "./context";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Task from "./Task";
import TaskForm from "./TaskForm";


export default function TaskSection(props) {
    const { tasks, setTasks } = useTasksContext();
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
        setTasks(prevValue => prevValue.map(task => task.id === id ? { ...task, status: !task.status } : task));
    }
    function removeTask(id) {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    }
    const completedTasks = [];
    const ongoingTasks = [];
    tasks.forEach(task => {
        if (task.status) {
            completedTasks.push(task);
        } else {
            ongoingTasks.push(task);
        }
    })
    return (
        <Grid container spacing={1} sx={{ width: '100%' }}>
            <Grid size={12}>
                <Typography variant='h5' fontWeight={500} color="primary">Daily Tasks</Typography>
            </Grid>
            <Grid container size={12} sx={{maxHeight: '550px', overflowY: 'scroll', m: 0, pt: 2}}>
                {ongoingTasks.map(task =>
                    <Grid key={task.id} size={12}>
                        <Task onCheck={completeTask} {...task} goal={props.goals.find(goal => goal.id === task.weeklyGoalId)} onHide={removeTask} />
                    </Grid>
                )}
                {completedTasks.map(task =>
                    <Grid key={task.id} size={12}>
                        <Task onCheck={completeTask} {...task} goal={props.goals.find(goal => goal.id === task.weeklyGoalId)} onHide={removeTask} />
                    </Grid>
                )}
            </Grid>
            <Grid size={12} sx={{ mt: 2 }}>
                <Typography variant='h6' fontWeight={500} color="primary">New Task</Typography>
            </Grid>
            <Grid size={12}>
                <TaskForm ref={props.taskFormRef} formRef={props.formRef} inputRef={props.inputRef} onAdd={addTask} weeklyGoals={props.goals} />
            </Grid>
        </Grid>
    );
}