import Typography from "@mui/material/Typography";
// TODO: find a way to get task title
export default function SessionSummary({elapsed}) {
    return (
        <Typography variant="h5">
            Well done! You have spent {(elapsed.hours * 60 || 0) + (elapsed.minutes || 0)} minutes focusing on <strong>whatever</strong>.
        </Typography>
    );
}