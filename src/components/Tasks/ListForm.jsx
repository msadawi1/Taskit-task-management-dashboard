import { useState } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SubTitle from "../mini_components/SubTitle";

export default function ListForm({ onSubmit, onClose }) {
    const [name, setName] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        const value = name.trim();
        if (!value) return;
        if (onSubmit) onSubmit(value);
        setName("");
        if (onClose) onClose();
    };
    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <Grid container columnSpacing={1} rowSpacing={2} sx={{ width: "100%" }}>
                <Grid size='grow'>
                    <SubTitle title="Add New List" />
                </Grid>
                <Grid size='auto' display="flex" justifyContent="flex-end">
                    <IconButton onClick={onClose} aria-label="close">
                        <CloseIcon color="primary" />
                    </IconButton>
                </Grid>

                <Grid size={12}>
                    <TextField
                        id="list-name"
                        name="list-name"
                        label="List Name"
                        placeholder="Enter list name"
                        fullWidth
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Grid>

                <Grid size={12}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        disableElevation
                        sx={{ borderRadius: 0 }}
                    >
                        Add
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

ListForm.propTypes = {
    onSubmit: PropTypes.func,
    onClose: PropTypes.func,
};
