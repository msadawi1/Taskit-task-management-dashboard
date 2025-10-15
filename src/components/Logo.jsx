import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';

export default function Logo() {
    return (
        <ListItem disablePadding>
            <ListItemButton disabled={true} sx={{
                display: 'flex', justifyContent: 'center', p: 0, pr: 2,
                '&.Mui-disabled': {
                    opacity: 1,
                },
            }}>
                <Typography color="primary" fontSize={{xs: 24, md: 30}} fontWeight="600">
                    Taskit
                </Typography>
            </ListItemButton>
        </ListItem>
    );
}