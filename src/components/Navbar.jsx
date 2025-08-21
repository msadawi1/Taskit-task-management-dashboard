import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Divider from '@mui/material/Divider'
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Box from '@mui/material/Box';
import Logo from './Logo';

export default function Navbar({ value, onChange, index }) {
    return (
        <Box>
            <Box sx={{px: 0, py: 2}}>
                <Logo />
            </Box>
            <Tabs
                value={value}
                onChange={(event, newValue) => onChange(newValue)}
                orientation="vertical"
                variant="scrollable"
                slotProps={{
                    indicator: {
                        sx: {
                            left: 0,          
                            width: 4,          
                        },
                    },
                }}
                indicatorColor='primary'
                sx={{
                    "& .MuiTab-root": {
                        justifyContent: "flex-start",
                        textAlign: "left",
                        minHeight: 48,
                        fontSize: 16,
                        width: "100%",
                        px: 2,
                    },
                    "& .Mui-selected": {
                        fontWeight: "bold",
                        bgcolor: "action.selected",
                    },
                }}>
                <Tab label="Dashboard" icon={<DashboardIcon />} iconPosition="start" value={index.dashboard} />
                <Tab label="Timer" icon={<AccessAlarmIcon />} iconPosition="start" value={index.timer} />
                <Tab label="Calendar" icon={<CalendarTodayIcon />} iconPosition="start" value={index.calendar} />
                <Tab label="Summaries" icon={<LibraryBooksIcon />} iconPosition="start" value={index.summaries} />
                <Divider />
                <Tab label="Settings" icon={<SettingsIcon />} iconPosition="start" value={index.settings} />
            </Tabs>
        </Box>
    );
}
