import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography";

export default function StatsCard({ title, icon, color, value }) {
    return (
        <Paper elevation={1} sx={{width: '100%', p: 3, backgroundColor: "background.paper"}}>
            <Grid container columnSpacing={2} alignItems='center'>
                <Grid size='auto' sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: `${color}.light`,
                    borderRadius: "0.5rem", // circle background
                    width: 40,
                    height: 40,
                    color: `${color}.contrastText`
                }}>
                    {icon}
                </Grid>
                <Grid size='grow' container direction='column'>
                    <Grid>
                        <Typography variant="body1" fontWeight={300} color="primary.light" sx={{textWrap: 'wrap', wordBreak: 'break-word'}}>{title}</Typography>
                    </Grid>
                    <Grid>
                        <Typography variant="h6" color="primary.light">{value}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}