import { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import { motion, AnimatePresence } from "framer-motion";
import Box from "@mui/material/Box";
import SearchIcon from '@mui/icons-material/Search';
import ListFilter from "./ListFilter";
import Button from "@mui/material/Button";
import ListForm from "./ListForm";

const MotionBox = motion.create(Box);


export default function TaskControls({ search, setSearch }) {
    const [listForm, setListForm] = useState(false);
    return (
        <>
            <Paper elevation={1} sx={{ px: 2, py: 2.5 }}>
                <Grid container columnSpacing={1} rowSpacing={2}>
                    <Grid size='grow'>
                        <TextField
                            id="search-field"
                            placeholder="Search tasks..."
                            size="small"
                            fullWidth
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid size={1.5}>
                        <ListFilter />
                    </Grid>
                    <Grid size={1.5}>
                        <Button onClick={() => setListForm(true)} fullWidth color='success' variant="contained">New List</Button>
                    </Grid>
                    <Grid size={1.5}>
                        <Button fullWidth color='warning' variant="contained">Delete List</Button>
                    </Grid>
                </Grid>
            </Paper>
            <AnimatePresence>
                {listForm && <MotionBox
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
                            <ListForm onClose={() => setListForm(false)} />
                        </Paper>
                    </MotionBox>
                </MotionBox>}
            </AnimatePresence>
        </>
    );
}