import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function ListLine({ label, mins, percentage, color }) {
    return (
        <Grid container alignItems='center' columnSpacing={1} sx={{ width: '100%' }}>
            <Grid size={12}>
                <Typography fontSize={16} sx={{ color: 'text.secondary' }}>
                    {label}
                </Typography>
            </Grid>
            <Grid size='grow'>
                <LinearProgress sx={{ p: 0.7, borderRadius: 1 }} variant="determinate" color={color} value={percentage} />
            </Grid>
            <Grid size='auto' sx={{ minWidth: 40 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {mins}m
                </Typography>
            </Grid>
        </Grid>
    );
}
