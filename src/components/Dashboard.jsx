import React, { useRef } from "react";
import Divider from "@mui/material/Divider";
import Box from '@mui/material/Box'
import Header from "./Header";
import Footer from "./Footer";
import GoalSection from "./Goals";
import Tasks from "./Tasks";
import { TaskFormRefContext } from "./context";

export default function Dahsboard({ scrollToForm, goals, onRemove, onAdd, formRef, inputRef }) {
    const taskFormRef = useRef(null);
    return (<Box component='section' sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 3 }}>
        <Header />
        <Divider />
        <TaskFormRefContext.Provider value={taskFormRef}>
            <GoalSection scrollToForm={scrollToForm} goals={goals} onRemove={onRemove} onAdd={onAdd} />
            <Divider />
            <Tasks taskFormRef={taskFormRef} formRef={formRef} inputRef={inputRef} goals={goals} />
        </TaskFormRefContext.Provider>
        <Footer />
    </Box>);
}