import React, { useState, useCallback } from 'react';
import dayjs from 'dayjs';
import TabTitle from "./mini_components/TabTitle";
import WeekControls from "./Progress/WeekControls";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import ProgressCaption from "./Progress/ProgressCaption";
import StatsCard from "./Progress/StatsCard";
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TodayIcon from '@mui/icons-material/Today';
import CheckIcon from '@mui/icons-material/Check';
import TimeByList from "./Progress/TimeByList";
import useStats from './hooks/useStats';
import useReflections from './hooks/useReflections';
import { shiftWeek, getFormattedDate, getWeekOffset } from './utils/ProgressUtils';
import { motion, AnimatePresence } from "framer-motion";
import ReflectionForm from './Progress/ReflectionForm';
import ReflectionSection from './Progress/ReflectionSection';
import { useSnackbarContext } from './contexts/SnackbarContext';

const MotionBox = motion.create(Box);

function Progress() {
    const [week, setWeek] = useState({
        start: dayjs().startOf('week'),
        end: dayjs().endOf('week'),
    });
    const [showForm, setShowForm] = useState(false);
    const { getStats } = useStats(week);
    const { reflections, addReflection, removeReflection } = useReflections();

    const { showSnackbar } = useSnackbarContext();

    function handleReflectionSubmit(content, date) {
        addReflection(content, date);
        showSnackbar("New reflection added.");
    }

    function handleReflectionRemove(id) {
        removeReflection(id);
        showSnackbar("Reflection successfully deleted.");
    }
    const stats = getStats();
    const totalHours = Math.floor(stats.totalTime / 60);
    const totalMins = stats.totalTime % 60;
    const totalTimeString = stats.totalTime === 0 ? '0' : `${totalHours === 0 ? '' : totalHours + 'h'} ${totalMins === 0 ? '' : totalMins + 'm'}`
    return (
        <>
            <Box component='section' sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 2 }}>
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
                        <TimeByList timeByList={stats.timeByList} totalTime={stats.totalTime} />
                    </Grid>
                    <Grid size={12}>
                        <ReflectionSection reflections={reflections} onDelete={handleReflectionRemove} onClick={useCallback(() => setShowForm(true), [])}/>
                    </Grid>
                </Grid>
            </Box>
            <AnimatePresence>
                {showForm && <MotionBox
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        minWidth: '100vw',
                        minHeight: '100vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        backdropFilter: 'blur(3px)',
                        zIndex: 100,
                    }}
                >
                    <MotionBox
                        initial={{ opacity: 0, scale: 0.9, y: -30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -30 }}
                        transition={{ duration: 0.1, ease: "easeOut" }} sx={{ width: 'clamp(250px, 80vw, 500px)' }}>
                        <Paper elevation={10} sx={{ p: 3, borderRadius: 3 }}>
                            <ReflectionForm
                                onSubmit={handleReflectionSubmit}
                                onClose={() => { setShowForm(false) }}
                            />
                        </Paper>
                    </MotionBox>
                </MotionBox>}
            </AnimatePresence>
        </>
    );
}

export default React.memo(Progress);