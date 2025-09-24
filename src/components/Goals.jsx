import React, { useState, useRef, useCallback } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TabTitle from "./mini_components/TabTitle";
import TextField from "@mui/material/TextField";
import GoalList from "./GoalList";

export default function GoalSection(props) {
    const [input, setInput] = useState('');
    const inputRef = useRef(null);
    function updateInput(event) {
        const newValue = event.target.value;
        setInput(newValue);
    }
    const addGoal = (event) => {
        props.onAdd(input)
        event.preventDefault();
        setInput('');
    }
    const handleClick = useCallback((goalId) => {
        props.setFormVisible(true);
        props.onClick(goalId);
    }, [props]);
    return (
        <Grid container spacing={2}>
            <Grid size={12} sx={{ mb: 1 }}>
                <TabTitle title="Weekly Goals" />
            </Grid>
            <GoalList goals={props.goals} onRemove={props.onRemove} onClick={handleClick} />
            <Grid size={{ xs: 12, md: 6 }}>
                <form onSubmit={addGoal}>
                    <Box display='flex' rowGap={1} flexDirection='column'>
                        <TextField id="standard-outlined" sx={{
                            "& .MuiInputBase-input": {
                                fontSize: 20
                            },
                        }} autoComplete="false" required={true} inputRef={inputRef} value={input} onChange={updateInput} label="Goal title" variant="standard" InputLabelProps={{ style: { fontSize: 18 } }} />
                        <Button fullWidth variant="contained" disableElevation color="primary" type="submit" sx={{ borderRadius: 0, flexGrow: 1 }}>Add Goal</Button>
                    </Box>
                </form>
            </Grid>
        </Grid>
    );
}