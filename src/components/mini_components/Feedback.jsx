import { Typography } from "@mui/material";

export default function Feedback({ text }) {
    return (
        <Typography
            variant="body1"
            color="primary"
                sx={{
                    fontSize: "clamp(0.9rem, 2vw, 1rem)", // min, preferred, max
                }}
        >
            {text}
        </Typography>
    );
}