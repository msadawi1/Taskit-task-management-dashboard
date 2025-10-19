import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid"
import SubTitle from "../mini_components/SubTitle";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import Alert from '@mui/material/Alert';

function Notifications({ enabled, onChange }) {
    return (
        <Paper elevation={1} sx={{ width: '100%', p: 3, backgroundColor: "background.paper" }}>
            <Grid container rowSpacing={2}>
                <Grid size={12}>
                    <SubTitle title={"Alerts"} />
                </Grid>
                <Grid container size={12} columnSpacing={1}>
                    <Grid size="grow">
                        <Typography variant="body1" fontWeight={500}>
                            Timer Alert
                        </Typography>
                        <Typography variant="body1" color="secondary.dark" fontWeight={400} fontSize={14}>
                            Get notified when focus sessions complete
                        </Typography>
                    </Grid>
                    <Grid size="auto">
                        <Switch checked={enabled} size="large" name="notifications" onChange={onChange} />
                    </Grid>
                    <Grid size={12}>
                        <Alert severity="success">
                            Make sure to allow sounds in your browser for the best experience.
                        </Alert>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default React.memo(Notifications);