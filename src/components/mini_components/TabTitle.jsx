import React from "react";
import Typography from "@mui/material/Typography";

function TabTitle({ title }) {
    console.log("TabTitle rendered: ", title);
    
    return <Typography
        variant="h4"
        fontWeight={600}
        color="primary"
        sx={{
            fontSize: "clamp(1.5rem, 2vw, 2.25rem)", // min, preferred, max
        }}
    >
        {title}
    </Typography>
}

export default React.memo(TabTitle);