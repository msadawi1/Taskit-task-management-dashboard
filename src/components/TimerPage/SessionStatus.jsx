import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import useTaskSelection from "../hooks/useTaskSelection.js";
// TODO: find a way to get task title
export default function SessionStatus() {
    const taskTitle = useTaskSelection().getSelectedTaskTitle();
    return ( <Alert variant="outlined" icon={false} severity="primary">
        <AlertTitle>Session Started</AlertTitle>
        <strong style={{ fontWeight: 500 }}>Task:</strong> {taskTitle}
    </Alert> );
}