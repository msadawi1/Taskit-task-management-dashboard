import Typography from "@mui/material/Typography";

export default function Caption({ text }) {
    return (
        <Typography variant='subtitle1' color="secondary.dark">{text}</Typography>
    );
}