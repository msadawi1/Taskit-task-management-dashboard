import React from "react";
import Typography from "@mui/material/Typography";

function Caption({ text }) {
    return (
        <Typography variant='subtitle1' color="primary.light">{text}</Typography>
    );
}

export default React.memo(Caption);