import React from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid"
import Divider from "@mui/material/Divider"


function Header({onMenuClick}) {
    const date = new Date();
        
    const formattedDate = date.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
    return (
        <>
            <Grid container component='section' sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Grid size="grow">
                    <Typography variant='h6' fontWeight={400} textAlign='left' color="secondary.dark">{formattedDate.split(' ')[0] + ', ' + formattedDate.split(' ').splice(1, 3).join(' ')}</Typography>
                </Grid>
                <Grid size="auto" sx={{display: { md: 'none' }}}>
                    <IconButton onClick={onMenuClick}>
                        <MenuIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <Divider />
        </>
    );
}

export default React.memo(Header);