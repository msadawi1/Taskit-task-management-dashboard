import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import useTaskSelection from "../hooks/useTaskSelection";
import MenuItem from "@mui/material/MenuItem";

export default function TaskSelector() {
    const { tasks, selectedTaskId, error, handleChange } = useTaskSelection();
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return (
        <FormControl fullWidth size='medium'>
            <InputLabel id="task-select-label">Choose a task to focus on</InputLabel>
            <Select
                name="task"
                labelId="task-select-label"
                id="task-select"
                label="Choose a task to focus on"
                value={selectedTaskId}
                onChange={handleChange}
                required
            >
                {tasks.filter(task => !task.status).map(task =>
                    <MenuItem key={task.id} id={task.id} value={task.id}>{capitalize(task.title)}</MenuItem>
                )}
            </Select>
            {error && <FormHelperText sx={{ color: theme => theme.palette.warning.main }}>Please select an option</FormHelperText>}
        </FormControl>
    );
}