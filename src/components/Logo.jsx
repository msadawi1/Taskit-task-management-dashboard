import React from "react";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

export default function Logo() {
    return (
        <ListItem disablePadding>
            <ListItemButton disabled={true} sx={{
                display: 'flex', justifyContent: 'center', p: 0, pr: 2,
                '&.Mui-disabled': {
                    opacity: 1,
                },
            }}>
                <ListItemIcon sx={{ color: 'primary.main', mr: '8px !important', minWidth: 0  }}>
                    <TaskAltIcon />
                </ListItemIcon>
                <Typography variant='h5' fontWeight="600">
                    Zikra
                </Typography>
            </ListItemButton>
        </ListItem>
    );
}