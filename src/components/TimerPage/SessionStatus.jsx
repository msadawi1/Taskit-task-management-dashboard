import Alert from "@mui/material/Alert";

export default function SessionStatus({ isPaused }) {
    return (<Alert variant="outlined" icon={false} severity="primary">
        {!isPaused ? "Timer started — time to make progress!" : "Break time — don’t lose your momentum!"}
    </Alert>);
}