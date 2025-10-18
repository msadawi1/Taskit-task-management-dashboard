import React from "react";
import Alert from "@mui/material/Alert";

function SessionStatus({ isRunning }) {
    return (<Alert variant="outlined" icon={false} severity="primary">
        {isRunning ? "Timer started — time to make progress!" : "Break time — don’t lose your momentum!"}
    </Alert>);
}

export default React.memo(SessionStatus);