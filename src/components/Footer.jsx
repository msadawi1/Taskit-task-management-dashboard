import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                mt: "auto",
                pt: 8,
                pb: 2,
                px: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
            }}
        >
            <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton
                    component={Link}
                    href="https://github.com/msadawi1"
                    target="_blank"
                    rel="noopener"
                    aria-label="GitHub"
                >
                    <GitHubIcon sx={{ fontSize: 28 }} color="primary" />
                </IconButton>

                <IconButton
                    component={Link}
                    href="https://www.linkedin.com/in/mohammed-sadawi-13b176207/"
                    target="_blank"
                    rel="noopener"
                    aria-label="LinkedIn"
                >
                    <LinkedInIcon sx={{ fontSize: 28 }} color="primary" />
                </IconButton>

            </Box>

            <Typography variant="body2" color="primary">
                © {new Date().getFullYear()} Mohammed Sadawi
            </Typography>
        </Box>
    );
}

export default React.memo(Footer);