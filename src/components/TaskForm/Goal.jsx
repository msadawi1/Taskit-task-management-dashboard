import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

export default function GoalSelect({ goals, value, onChange }) {
    return (
        <FormControl fullWidth required={true} size='medium'>
            <InputLabel id="goal-select-label">Goal</InputLabel>
            <Select
                name="goalId"
                labelId="goal-select-label"
                id="goal-select"
                value={value}
                label="Goal"
                onChange={onChange}
            >
                {goals.map(goal =>
                    <MenuItem key={goal.id} id={goal.id} value={goal.id}>{goal.title[0].toUpperCase() + goal.title.slice(1, goal.title.length)}</MenuItem>
                )}
            </Select>
        </FormControl>
    );
}