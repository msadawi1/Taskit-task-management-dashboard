import { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Task from "./Task";
import TaskForm from "./TaskForm";
import Button from "@mui/material/Button";
import { motion, AnimatePresence } from "framer-motion";
import SubTitle from "./mini_components/SubTitle";
import Feedback from "./mini_components/Feedback";
import TaskControls from "./Tasks/TaskControls";
import Caption from "./mini_components/Caption";

const MotionBox = motion.create(Box);

export default function TaskSection({ goals, onClose, isFormVisible, setFormVisible, selectedGoal, tasks, onAdd, onRemove, onCheck }) {
    const completedTasks = [];
    const ongoingTasks = [];
    const [search, setSearch] = useState('');
    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(search.toLowerCase())
    );
    filteredTasks.forEach(task => {
        if (task.status) {
            completedTasks.push(task);
        } else {
            ongoingTasks.push(task);
        }
    });
    return (<>
        <Grid container spacing={2} sx={{ width: '100%' }}>
            <Grid size='grow'>
                <SubTitle title="Tasks" />
            </Grid>
            <Grid display="flex" size='auto' justifyContent='flex-end'>
                <Button variant="contained" onClick={() => setFormVisible(true)}>New Task</Button>
            </Grid>
            <Grid size={12} sx={{ mt: -3, mb: 2 }}>
                <Caption text="Manage your tasks and stay productive" />
            </Grid>
            <Grid size={12} sx={{mt: -1}}>
                <TaskControls search={search} setSearch={setSearch} />
            </Grid>
            {tasks.length > 0 ? <Grid container size={12} sx={{ m: 0 }}>
                {ongoingTasks.map(task =>
                    <Grid key={task.id} size={12}>
                        <Task onCheck={onCheck} {...task} goal={goals.find(goal => goal.id === task.goalId)} onHide={onRemove} />
                    </Grid>
                )}
                {completedTasks.map(task =>
                    <Grid key={task.id} size={12}>
                        <Task onCheck={onCheck} {...task} goal={goals.find(goal => goal.id === task.goalId)} onHide={onRemove} />
                    </Grid>
                )}
            </Grid> : <Grid size={12}>
                <Feedback text="You have no tasks at the moment" />
            </Grid>}
        </Grid>
        <AnimatePresence>
            {isFormVisible && <MotionBox
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
                    transition={{ duration: 0.1, ease: "easeOut" }} sx={{ maxWidth: 'clamp(250px, 80vw, 500px)' }}>
                    <Paper elevation={10} sx={{ p: 3, borderRadius: 3 }}>
                        <TaskForm
                            onAdd={onAdd}
                            weeklyGoals={goals}
                            onClose={() => { setFormVisible(false); onClose() }}
                            data={{
                                title: "",
                                goalId: selectedGoal,
                                list: '',
                                priority: '',
                                dueDate: null,
                                allDay: false,
                                start: '',
                                end: '',
                                location: '',
                                duration: 0,
                                durationError: null,
                                dateError: null
                            }}
                        />
                    </Paper>
                </MotionBox>
            </MotionBox>}
        </AnimatePresence>
    </>
    );
}