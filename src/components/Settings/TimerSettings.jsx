import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid"
import SubTitle from "../mini_components/SubTitle";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function TimerSettings({ defaultDuration, onChange }) {
    return (
        <Paper elevation={1} sx={{ width: '100%', p: 3, backgroundColor: "background.paper" }}>
            <Grid container rowSpacing={2}>
                <Grid size={12}>
                    <SubTitle title={"Timer Settings"} />
                </Grid>
                <Grid container size={12} columnSpacing={1}>
                    <Grid size="grow">
                        <Typography variant="body1" fontWeight={500}>
                            Default Timer Duration
                        </Typography>
                        <Typography variant="body1" color="primary.light" fontWeight={400} fontSize={14}>
                            Set the default focus session length (minutes)
                        </Typography>
                    </Grid>
                    <Grid size="auto">
                        <FormControl>
                            <Select
                                id="mode-select"
                                value={defaultDuration}
                                onChange={(event) => onChange(event.target.value)}
                            >
                                <MenuItem value={25}>
                                    25m
                                </MenuItem>
                                <MenuItem value={30}>
                                    30m
                                </MenuItem>
                                <MenuItem value={45}>
                                    45m
                                </MenuItem>
                                <MenuItem value={60}>
                                    60m
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}