import { Typography } from "@mui/material";

export default function Feedback({ text, color = "primary" }) {
    return (
        <Typography
            variant="body1"
            color={color}
            sx={{
                fontSize: "clamp(0.9rem, 2vw, 1rem)", // min, preferred, max
            }}
        >
            {text}
        </Typography>
    );
}