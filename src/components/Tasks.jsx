import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Task from "./Task";
import TaskForm from "./TaskForm";
import Button from "@mui/material/Button";
import { motion, AnimatePresence } from "framer-motion";
import useManager from "./hooks/useManager";
import SubTitle from "./mini_components/SubTitle";

const MotionBox = motion.create(Box);

export default function TaskSection(props) {
    const { tasks, addTask, removeTask, completeTask } = useManager();
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
            <Grid size='grow'>
                <SubTitle title="Daily Tasks"/>
            </Grid>
            <Grid display="flex" size='auto' justifyContent='flex-end'>
                <Button variant="contained" onClick={() => props.setFormVisible(true)}>New Task</Button>
            </Grid>
            <Grid container size={12} sx={{ m: 0, pt: 2 }}>
                {ongoingTasks.map(task =>
                    <Grid key={task.id} size={12}>
                        <Task onCheck={completeTask} {...task} goal={props.goals.find(goal => goal.id === task.goalId)} onHide={removeTask} />
                    </Grid>
                )}
                {completedTasks.map(task =>
                    <Grid key={task.id} size={12}>
                        <Task onCheck={completeTask} {...task} goal={props.goals.find(goal => goal.id === task.goalId)} onHide={removeTask} />
                    </Grid>
                )}
            </Grid>
        </Grid>
        <AnimatePresence>
            {props.isFormVisible && <MotionBox
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
                            onAdd={addTask}
                            weeklyGoals={props.goals}
                            onClose={() => { props.setFormVisible(false); props.onClose() }}
                            data={{
                                title: "",
                                goalId: props.goal,
                                category: '',
                                priority: '',
                                dueDate: null,
                                allDay: false,
                                start: '',
                                end: '',
                                location: '',
                                duration: 0,
                                error: null,
                            }}
                        />
                    </Paper>
                </MotionBox>
            </MotionBox>}
        </AnimatePresence>
    </>
    );
}