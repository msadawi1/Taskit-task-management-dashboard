import TabTitle from "./mini_components/TabTitle";
import WeekControls from "./Progress/WeekControls";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button"
import SubTitle from "./mini_components/SubTitle";
import ProgressCaption from "./Progress/ProgressCaption";
import ReportsList from "./Progress/ReflectionList";
import StatsCard from "./Progress/StatsCard";
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckIcon from '@mui/icons-material/Check';
import TimeByCategory from "./Progress/TimeByCategoryCard"

export default function Progress() {
    return (
        <Box component='section' sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 3 }}>
            <Grid container rowSpacing={3}>
                <Grid container size={12} rowSpacing={0}>
                    <Grid size={12}>
                        <TabTitle title="Progress" />
                    </Grid>
                    <Grid container size={12}>
                        <Grid size="grow" display='flex' flexWrap="wrap" gap={1}>
                            <ProgressCaption startDate='' endDate='' />
                        </Grid>
                        <Grid size="auto">
                            <WeekControls />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container size={12} spacing={{ xs: 1, sm: 1.5, lg: 2, xl: 3 }}>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <StatsCard title="Total Tasks" color="blue" number={20} icon={<AssignmentIcon />} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <StatsCard title="Completed" color="success" number={14} icon={<CheckIcon />} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <StatsCard title="Total Time" color="info" number={'23h 30m'} icon={<AccessTimeIcon />} />
                    </Grid>
                </Grid>
                <Grid size={12}>
                    <TimeByCategory />
                </Grid>
                <Grid container size={12}>
                    <Grid size={{ xs: 12, sm: "grow" }}>
                        <SubTitle title="Daily Reflections" />
                    </Grid>
                    <Grid size={{ xs: 12, sm: "auto" }}>
                        <Button variant="contained" size="medium">Add New Reflection</Button>
                    </Grid>
                </Grid>
            </Grid>
            <ReportsList />
        </Box>
    );
}