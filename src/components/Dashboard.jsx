import { useState } from "react";
import Divider from "@mui/material/Divider";
import Box from '@mui/material/Box'
import GoalSection from "./Goals";
import Tasks from "./Tasks";

export default function Dahsboard({ goals, onRemove, onAdd, inputRef }) {
    const [isFormVisible, setFormVisible] = useState(false);
    // default form goal input (set by goal section buttons)
    const [goal, setGoal] = useState('');
    return (<Box component='section' sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 3 }}>
        <GoalSection onClick={setGoal} setFormVisible={setFormVisible} goals={goals} onRemove={onRemove} onAdd={onAdd} />
        <Divider />
        <Tasks goal={goal} onClose={() => setGoal('')} isFormVisible={isFormVisible} setFormVisible={setFormVisible} inputRef={inputRef} goals={goals} />
    </Box>);
}