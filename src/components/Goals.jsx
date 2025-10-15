import { useState, useCallback } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TabTitle from "./mini_components/TabTitle";
import TextField from "@mui/material/TextField";
import GoalList from "./GoalList";
import Feedback from "./mini_components/Feedback";
import CompletedGoalsDialog from "./Goals/CompletedGoalsDialog";
import FeedbackPopup from "./mini_components/FeedbackPopup";
import ClickAwayListener from "@mui/material/ClickAwayListener";

export default function GoalSection(props) {
    const [input, setInput] = useState('');
    const [goalsPopup, setGoalsPopup] = useState(false);
    const [feedbackPopup, setFeedbackPopup] = useState(false);

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

    const completed = [];
    const incomplete = [];

    for (const goal of props.goals) {
        if (goal.status) completed.push(goal);
        else incomplete.push(goal);
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid size={12}>
                    <TabTitle title="Goals" />
                </Grid>
                <Grid size={12} sx={{ mt: -1 }}>
                    <Button size='small' variant="contained" onClick={() => setGoalsPopup(true)}>
                        Completed Goals
                    </Button>
                </Grid>
                {incomplete.length > 0 ?
                    <GoalList goals={incomplete} onError={() => setFeedbackPopup(true)} onRemove={props.onRemove} onComplete={props.onComplete} onClick={handleClick} />
                    :
                    <Grid size={12}>
                        <Feedback text="You have no ongoing goals at the moment." />
                    </Grid>
                }
                <Grid size={{ xs: 12, md: 6 }}>
                    <form onSubmit={addGoal}>
                        <Box display='flex' rowGap={1} flexDirection='column'>
                            <TextField id="standard-outlined" sx={{
                                "& .MuiInputBase-input": {
                                    fontSize: 20,
                                },
                            }} autoComplete="off" value={input} onChange={updateInput} label="Goal title" variant="standard" InputLabelProps={{ style: { fontSize: 18 } }} />
                            <Button fullWidth variant="contained" disableElevation color="primary" type="submit" sx={{ borderRadius: 0, flexGrow: 1 }}>Add Goal</Button>
                        </Box>
                    </form>
                </Grid>
            </Grid>
            <ClickAwayListener onClickAway={() => setGoalsPopup(false)}>
                <CompletedGoalsDialog onGoalRemove={props.onRemove} open={goalsPopup} goals={completed} onClose={() => setGoalsPopup(false)} />
            </ClickAwayListener>
            <ClickAwayListener onClickAway={() => setFeedbackPopup(false)}>
                <FeedbackPopup open={feedbackPopup} onClose={() => setFeedbackPopup(false)}
                    title="Almost There!"
                    text="You have unfinished tasks for this goal. Complete your tasks to set this goal as complete."
                    />
            </ClickAwayListener>
        </>
    );
}