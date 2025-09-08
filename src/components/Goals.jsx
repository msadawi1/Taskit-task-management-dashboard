import React, { useState, useRef  } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import WeeklyGoal from "./WeeklyGoal";
import TextField from "@mui/material/TextField";

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
    return (
        <Grid container spacing={2}>
            <Grid size={12} sx={{ mb: 1 }}>
                <Typography variant='h4' fontSize={30} fontWeight={600} color="primary">Weekly Goals</Typography>
            </Grid>
            {props.goals.map(goal =>
                <Grid key={goal.id} size={12}>
                    <WeeklyGoal
                        {...goal}
                        onRemove={props.onRemove}
                        onClick={props.scrollToForm}
                    />
                </Grid>
            )}
            <Grid size={12}>
                <form onSubmit={addGoal}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '55%', gap: 1 }}>
                        <TextField id="standard-outlined" sx={{
                            "& .MuiInputBase-input": {
                                fontSize: 20
                            },
                        }} autoComplete="false" required={true} inputRef={inputRef} value={input} onChange={updateInput} label="Goal title" variant="standard" InputLabelProps={{ style: { fontSize: 18 } }} />
                        <Box sx={{ display: 'flex' }}>
                            <Button variant="contained" disableElevation color="primary" type="submit" sx={{ borderRadius: 0, flexGrow: 1 }}>Add Goal</Button>
                        </Box>
                    </Box>
                </form>
            </Grid>
        </Grid>
    );
}