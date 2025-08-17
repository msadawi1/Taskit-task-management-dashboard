import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider'
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Box from '@mui/material/Box';
import SidebarItem from './SidebarItem';
import Logo from './Logo';

export default function Sidebar(props) {
    return (
        <Drawer sx={{
            width: props.width,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: props.width,
                boxSizing: 'border-box',
                border: 'none',
                backgroundColor: 'primary.contrastText'
            },
            '& .MuiListItemIcon-root': {
                minWidth: 'auto',
                mr: 0.5,
            }
        }} variant='permanent'>
            <Box sx={{ pt: 2, px: 2, mb: 2 }}>
                <Logo />
            </Box>
            <List sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
                px: 2,
            }}>
                <SidebarItem title="Dashboard" icon={<DashboardIcon />} />
                <SidebarItem title="Timer" icon={<AccessAlarmIcon />} />
                <SidebarItem title="Calendar" icon={<CalendarTodayIcon />} />
                <SidebarItem title="Summaries" icon={<LibraryBooksIcon />} />
                <Divider />
                <SidebarItem title="Settings" icon={<SettingsIcon />} />
            </List>
        </Drawer>
    );
}
