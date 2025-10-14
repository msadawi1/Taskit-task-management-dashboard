import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

export default function Reflection({ id, date, content, onDelete }) {
    return (
        <Paper elevation={1} sx={{ p: 2 }}>
            <Grid container columnSpacing={5} display='flex' alignItems='center'>
                <Grid size="grow" container rowSpacing={0.5}>
                    <Grid size={12}>
                        <Typography variant='subtitle1' fontWeight={500} sx={{ lineHeight: 1.2 }}>
                            {date}
                        </Typography>
                    </Grid>
                    <Grid size={12}>
                        <Typography variant='body1' color='secondary.dark'>
                            {content}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid size="auto">
                    <IconButton onClick={() => onDelete(id)} color='primary.light'>
                        <DeleteIcon />
                    </IconButton >
                </Grid>
            </Grid>
        </Paper>
    );
}