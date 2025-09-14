import TabTitle from "./mini_components/TabTitle";
import Header from "./Header";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button"
import SubTitle from "./mini_components/SubTitle";
import ReportsList from "./Progress/ReflectionList";

export default function Progress() {
    return (
        <Box component='section' sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 3 }}>
            <Header />
            <Grid container rowSpacing={3}>
                <Grid size={12}>
                    <TabTitle title="Progress" />
                </Grid>
                <Grid container size={12}>
                    <Grid size="grow">
                        <SubTitle title="Daily Reflections" />
                    </Grid>
                    <Grid size="auto">
                        <Button variant="contained" size="medium">Add New Reflection</Button>
                    </Grid>
                </Grid>
            </Grid>
            <ReportsList />
        </Box>
    );
}