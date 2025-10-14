import { Typography } from "@mui/material";

export default function SubTitle({ title, color = "primary" }) {
    return (
        <Typography
            variant="h5"
            fontWeight={600}
            color={color}
            sx={{
                fontSize: "clamp(1.3rem, 2vw, 1.5rem)", // min, preferred, max
            }}
        >
            {title}
        </Typography>
    );
}