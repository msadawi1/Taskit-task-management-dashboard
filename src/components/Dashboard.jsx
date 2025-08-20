import React from "react";
import Divider from "@mui/material/Divider";
import Box from '@mui/material/Box'
import Header from "./Header";
import Footer from "./Footer";
import GoalSection from "./Goals";
import Tasks from "./Tasks";

export default function Dahsboard({ scrollToForm, goals, onRemove, onAdd, formRef, inputRef }) {
    return (<Box component='section' sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 3 }}>
        <Header />
        <Divider />
        <GoalSection scrollToForm={scrollToForm} goals={goals} onRemove={onRemove} onAdd={onAdd} />
        <Divider />
        <Tasks formRef={formRef} inputRef={inputRef} goals={goals} />
        <Footer />
    </Box>);
}