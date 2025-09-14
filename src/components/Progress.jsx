import TabTitle from "./mini_components/TabTitle";
import Header from "./Header";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button"

export default function Progress() {
    return (
        <Box component='section' sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 3 }}>
            <Header />
            <Grid container>
                <Grid size="grow">
                    <TabTitle title="Progress" />
                </Grid>
                <Grid size="auto">
                    <Button variant="contained" size="large">Add New Report</Button>
                </Grid>
            </Grid>
        </Box>
    );
}