import { useState } from 'react';
import dayjs from 'dayjs';
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
import TodayIcon from '@mui/icons-material/Today';
import CheckIcon from '@mui/icons-material/Check';
import TimeByCategory from "./Progress/TimeByCategoryCard";
import useProgress from './hooks/useProgress';
import { shiftWeek, getFormattedDate, getWeekOffset } from './utils/ProgressUtils';

export default function Progress() {
    const [week, setWeek] = useState({
        start: dayjs().startOf('week'),
        end: dayjs().endOf('week'),
    });
    console.log("Week: ", week);
    const { getStats } = useProgress(week);
    const stats = getStats();
    const totalHours = Math.floor(stats.totalTime / 60);
    const totalMins = stats.totalTime % 60;
    const totalTimeString = stats.totalTime === 0 ? '0' : `${totalHours === 0 ? '' : totalHours + 'h'} ${totalMins === 0 ? '' : totalMins + 'm'}`
    return (
        <Box component='section' sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 3 }}>
            <Grid container rowSpacing={3}>
                <Grid container size={12} rowSpacing={0}>
                    <Grid size={12}>
                        <TabTitle title="Progress" />
                    </Grid>
                    <Grid container size={12}>
                        <Grid size="grow" display='flex' flexWrap="wrap" gap={1}>
                            <ProgressCaption startDate={getFormattedDate(week.start)} endDate={getFormattedDate(week.end)}
                                offset={getWeekOffset(dayjs(), week)} />
                        </Grid>
                        <Grid size="auto">
                            <WeekControls onNext={() => setWeek(prevWeek => shiftWeek(prevWeek, 'next'))} onPrev={() => setWeek(prevWeek => shiftWeek(prevWeek, 'prev'))} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container size={12} spacing={{ xs: 1, sm: 1.5, lg: 2, xl: 3 }}>
                    <Grid size={{ xs: 12, sm: 3 }}>
                        <StatsCard title="Total Tasks" color="blue" value={stats.totalTasks} icon={<AssignmentIcon />} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 3 }}>
                        <StatsCard title="Completed" color="success" value={stats.completed} icon={<CheckIcon />} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 3 }}>
                        <StatsCard title="All Day" color="primary" value={stats.allDayCount} icon={<TodayIcon />} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 3 }}>
                        <StatsCard title="Total Time" color="info" value={totalTimeString} icon={<AccessTimeIcon />} />
                    </Grid>
                </Grid>
                <Grid size={12}>
                    <TimeByCategory timeByCategory={stats.timeByCategory} totalTime={stats.totalTime} />
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