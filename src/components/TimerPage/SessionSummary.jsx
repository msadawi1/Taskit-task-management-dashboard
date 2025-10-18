import React from "react";
import Typography from "@mui/material/Typography";

function SessionSummary({ elapsed }) {
    const totalMinutes = Math.round(elapsed / 60);
    return (
        <Typography variant="h6" textAlign={'center'}>
            Time’s up! You stayed focused for {totalMinutes ?? 'error'} {totalMinutes === 1 ? 'minute' : 'minutes'} — awesome work!
        </Typography>
    );
}

export default React.memo(SessionSummary);