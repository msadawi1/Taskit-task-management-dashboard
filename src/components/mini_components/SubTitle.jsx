import { Typography } from "@mui/material";

export default function SubTitle({ title }) {
    return (
        <Typography
            variant="h5"
            fontWeight={600}
            color="primary"
            sx={{
                fontSize: "clamp(1.3rem, 2vw, 1.5rem)", // min, preferred, max
            }}
        >
            {title}
        </Typography>
    );
}