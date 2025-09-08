import React, { useState } from "react";
import { uid } from "uid";
import { useTasksContext } from "./context";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Task from "./Task";
import TaskForm from "./TaskForm";
import Button from "@mui/material/Button";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);

export default function TaskSection(props) {
    const { tasks, setTasks } = useTasksContext();
    const [showForm, setShowForm] = useState(false);
    function addTask(title, goalId, priority, dueDate) {
        setTasks(prevValue => [...prevValue, {
            id: uid(),
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
    return (<>
        <Grid container spacing={1} sx={{ width: '100%' }}>
            <Grid size={6}>
                <Typography variant='h5' fontWeight={500} color="primary">Daily Tasks</Typography>
            </Grid>
            <Grid display="flex" size={6} justifyContent='flex-end'>
                <Button variant="contained" onClick={() => setShowForm(true)}>New Task</Button>
            </Grid>
            <Grid container size={12} sx={{ m: 0, pt: 2 }}>
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
        </Grid>
        <AnimatePresence>
            {showForm && <MotionBox
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    minWidth: '100vw',
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(3px)',
                    zIndex: 100,
                }}
            >
                <MotionBox
                    initial={{ opacity: 0, scale: 0.9, y: -30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -30 }}
                    transition={{ duration: 0.1, ease: "easeOut" }} sx={{ maxWidth: '30vw' }}>
                    <Paper elevation={10} sx={{ p: 3, borderRadius: 3 }}>
                        <TaskForm
                            ref={props.taskFormRef}
                            formRef={props.formRef}
                            inputRef={props.inputRef}
                            onAdd={addTask}
                            weeklyGoals={props.goals}
                            onClose={() => { setShowForm(false) }}
                        />
                    </Paper>
                </MotionBox>
            </MotionBox>}
        </AnimatePresence>
    </>
    );
}