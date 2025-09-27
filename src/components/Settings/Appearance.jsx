import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid"
import SubTitle from "../mini_components/SubTitle";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function Appearance({ theme, onChange }) {
    return (
        <Paper elevation={1} sx={{ width: '100%', p: 3, backgroundColor: "background.paper" }}>
            <Grid container rowSpacing={2}>
                <Grid size={12}>
                    <SubTitle title={"Appearance"} />
                </Grid>
                <Grid container size={12} columnSpacing={1}>
                    <Grid size="grow">
                        <Typography variant="body1" fontWeight={500}>
                            Theme
                        </Typography>
                        <Typography variant="body1" color="primary.light" fontWeight={400} fontSize={14}>
                            Choose your preferred color scheme
                        </Typography>
                    </Grid>
                    <Grid size="auto">
                        <FormControl>
                            <Select
                                id="mode-select"
                                value={theme}
                                onChange={onChange}
                            >
                                <MenuItem value='light'>
                                    <LightModeIcon color="primary" />
                                </MenuItem>
                                <MenuItem value='dark'>
                                    <DarkModeIcon color="primary" />
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}