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
import useLists from "../hooks/useLists";
import Confirmation from "../mini_components/Confirmation";
import { useSnackbarContext } from "../contexts/SnackbarContext";

const MotionBox = motion.create(Box);

export default function TaskControls({ search, setSearch, list, setList, onRemove }) {
    const [listForm, setListForm] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [formError, setFormError] = useState('');
    const { lists, insertList, deleteList } = useLists(onRemove);

    const { showSnackbar } = useSnackbarContext();
    function handleDeleteClick() {
        if (list !== 0)
            setDeletePopup(true);
    }
    function handleAddClick() {
        setFormError('')
        setListForm(true);
    }
    function handleConfirmation() {
        setDeletePopup(false);
        // add delay to remove the list after animation finishes
        showSnackbar(`List ${list} successfully deleted.`);
        setTimeout(() => {
            setList(0);
            deleteList(list);
        }, 100);
    }
    function handleListSubmit(listName) {
        if (listName === "All") {
            setFormError("You can't use this name.");
            return false;
        }
        const list = lists.find(list => list.name === listName);
        if (list) {
            setFormError("List already exists.");
            return false;
        } else {
            insertList(listName);
            showSnackbar(`List ${listName} added.`)
            return true;
        }
    }
    return (
        <>
            <Paper elevation={1} sx={{ px: 2, py: 2.5 }}>
                <Grid container columnSpacing={1} rowSpacing={1.5}>
                    <Grid size={{xs: 12, sm: 10, lg: "grow"}}>
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
                    <Grid size={{ xs: 12, sm: 2, lg: 1.5 }}>
                        <ListFilter value={list} onChange={setList} lists={lists} />
                    </Grid>
                    <Grid size={{ xs: 6, lg: 1.5 }}>
                        <Button onClick={handleAddClick} fullWidth color='success' variant="contained">New List</Button>
                    </Grid>
                    <Grid size={{ xs: 6, lg: 1.5 }}>
                        <Button onClick={handleDeleteClick} fullWidth color='warning' variant="contained">Delete</Button>
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
                            <ListForm resetError={() => setFormError('')} error={formError}
                                onSubmit={handleListSubmit} onClose={() => setListForm(false)} />
                        </Paper>
                    </MotionBox>
                </MotionBox>}
            </AnimatePresence>
            <Confirmation onClose={() => setDeletePopup(false)} onConfirm={handleConfirmation} open={deletePopup}
                title={`Delete "${list}"?`} caption={"This will delete all tasks in that list."}
                confirmText={"Ok"} cancelText={"Cancel"}
            />
        </>
    );
}