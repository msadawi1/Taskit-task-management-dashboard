import { useState } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function ReflectionForm({ onSubmit, onClose }) {
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const value = text.trim();
        if (!value) return;
        if (onSubmit) onSubmit({ text: value, createdAt: new Date().toISOString() });
        setText("");
        if (onClose) onClose();
    };

    return (
        <form onSubmit={handleSubmit} autoComplete="off">
            <Grid container columnSpacing={1} rowSpacing={2} sx={{ width: "100%" }}>
                <Grid size='grow'>
                    <Typography variant="h5" fontWeight={500}>
                        Add New Reflection
                    </Typography>
                </Grid>

                <Grid size='auto' display="flex" justifyContent="flex-end">
                    <IconButton onClick={onClose} aria-label="close">
                        <CloseIcon color="primary" />
                    </IconButton>
                </Grid>

                <Grid size={12}>
                    <TextField
                        id="reflection"
                        name="reflection"
                        label="What have you achieved today"
                        placeholder="Write about your day"
                        multiline
                        rows={6}
                        fullWidth
                        variant="outlined"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
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
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

ReflectionForm.propTypes = {
    onSubmit: PropTypes.func,
    onClose: PropTypes.func,
};