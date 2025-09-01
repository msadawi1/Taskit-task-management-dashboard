import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
// TODO: find a way to get task title
export default function SessionStatus({taskTitle}) {
    return ( <Alert variant="outlined" icon={false} severity="primary">
        <AlertTitle>Session Started</AlertTitle>
        <strong style={{ fontWeight: 500 }}>Task:</strong> {taskTitle}
    </Alert> );
}