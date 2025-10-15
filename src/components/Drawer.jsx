import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FlagIcon from '@mui/icons-material/Flag';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Box from '@mui/material/Box';
import Logo from './Logo';

const navItems = [
    { label: 'Dashboard', icon: <DashboardIcon />, valueKey: 'dashboard' },
    { label: 'Timer', icon: <AccessAlarmIcon />, valueKey: 'timer' },
    { label: 'Calendar', icon: <CalendarTodayIcon />, valueKey: 'calendar' },
    { label: 'Progress', icon: <FlagIcon />, valueKey: 'progress' },
];

export default function Drawer({ value, onChange, index, open, variant = 'permanent', onClose }) {
    return (
        <MuiDrawer
            variant={variant}
            open={open}
            onClose={onClose}
            sx={{
                width: 260,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 260,
                    boxSizing: 'border-box',
                    position: 'relative',
                },
            }}
        >
            <Box sx={{ px: 0, py: 2 }}>
                <Logo />
            </Box>
            <List disablePadding>
                {navItems.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton
                            selected={value === index[item.valueKey]}
                            onClick={() => onChange(index[item.valueKey])}
                            sx={{ display: 'flex', gap: 1.5 }}
                        >
                            <ListItemIcon sx={{ minWidth: 'auto' }}>{item.icon}</ListItemIcon>
                            <ListItemText sx={{ '& .MuiListItemText-primary': { fontWeight: value === index[item.valueKey] ? 600 : 400 } }} primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List disablePadding>
                <ListItem disablePadding>
                    <ListItemButton
                        selected={value === index.settings}
                        onClick={() => onChange(index.settings)}
                        sx={{ display: 'flex', gap: 1.5 }}
                    >
                        <ListItemIcon sx={{ minWidth: 'auto' }} ><SettingsIcon /></ListItemIcon>
                        <ListItemText sx={{ '& .MuiListItemText-primary': { fontWeight: value === index.settings ? 600 : 400 } }} primary="Settings" />
                    </ListItemButton>
                </ListItem>
            </List>
        </MuiDrawer>
    );
}
