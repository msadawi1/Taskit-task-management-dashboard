import Typography from "@mui/material/Typography";

export default function SessionSummary({ elapsed, taskTitle }) {
    const totalMinutes = Math.round(((elapsed / 1000) / 60));
    return (
        <Typography variant="h5">
            Well done! You have spent {totalMinutes ?? 'error'} {totalMinutes === 1 ? 'minute' : 'minutes'} focusing on <strong>{taskTitle}</strong>.
        </Typography>
    );
}