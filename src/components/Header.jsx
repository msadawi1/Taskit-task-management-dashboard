import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box"


export default function Header() {
    const date = new Date();

    const formattedDate = date.toLocaleDateString("en-GB", {
        weekday: "long", 
        day: "numeric",
        month: "long",    
        year: "numeric"
    });
    return (
        <Box component='section' sx={{ display: 'flex', justifyContent: 'space-between', mr: 2 }}>
            <Typography variant='h6' fontWeight={400} textAlign='left' color="primary">{formattedDate.split(' ')[0] + ', ' + formattedDate.split(' ').splice(1, 3).join(' ')}</Typography>
        </Box>
    );
}