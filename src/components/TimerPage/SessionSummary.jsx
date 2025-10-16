import Typography from "@mui/material/Typography";

export default function SessionSummary({ elapsed }) {
    const totalMinutes = Math.round(((elapsed / 1000) / 60));
    return (
        <Typography variant="h6" textAlign={'center'}>
            Time’s up! You stayed focused for {totalMinutes ?? 'error'} {totalMinutes === 1 ? 'minute' : 'minutes'} — awesome work!
        </Typography>
    );
}