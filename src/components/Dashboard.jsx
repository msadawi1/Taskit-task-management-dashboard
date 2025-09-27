import { useState } from "react";
import Divider from "@mui/material/Divider";
import Box from '@mui/material/Box'
import GoalSection from "./Goals";
import Tasks from "./Tasks";
import useManager from "./hooks/useManager";

export default function Dahsboard() {
    const [isFormVisible, setFormVisible] = useState(false);
    // default form goal input (set by goal section buttons)
    const [goal, setGoal] = useState('');
    // single source of truth shared custom hook
    const { tasks, addTask, completeTask, removeTask, weeklyGoals, addGoal, removeGoalAndTasks} = useManager();
    return (<Box component='section' sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 3 }}>
        <GoalSection onClick={setGoal} setFormVisible={setFormVisible} goals={weeklyGoals} onRemove={removeGoalAndTasks} onAdd={addGoal} />
        <Divider />
        <Tasks tasks={tasks} onCheck={completeTask}
            onAdd={addTask} onRemove={removeTask} selectedGoal={goal} onClose={() => setGoal('')}
            isFormVisible={isFormVisible} setFormVisible={setFormVisible} goals={weeklyGoals} />
    </Box>);
}