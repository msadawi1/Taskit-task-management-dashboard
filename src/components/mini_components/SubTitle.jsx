import { Typography } from "@mui/material";

export default function SubTitle({ title }) {
    return (
        <Typography
            variant="h5"
            fontWeight={500}
            color="primary"
            sx={{
                fontSize: "clamp(1.2rem, 2vw, 1.5rem)", // min, preferred, max
            }}
        >
            {title}
        </Typography>
    );
}