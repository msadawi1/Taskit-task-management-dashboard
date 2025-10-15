import Typography from "@mui/material/Typography";

export default function Caption({ text }) {
    return (
        <Typography variant='subtitle1' color="primary.light">{text}</Typography>
    );
}