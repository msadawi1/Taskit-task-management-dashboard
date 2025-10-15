import React from "react";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

export default function SidebarItem(props) {
    return (<ListItem disablePadding>
        <ListItemButton sx={{ display: 'flex', gap: 0.5, borderRadius: 5, px: 2, py: 1 }}>
            <ListItemIcon sx={{ color: 'primary.main' }}>
                {props.icon}
            </ListItemIcon>
            <ListItemText sx={{ color: 'primary.main' }} primary={props.title} />
        </ListItemButton>
    </ListItem>);
}