import React, { useState, useEffect, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import useManager from './hooks/useManager';
import TaskForm from './TaskForm';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { motion, AnimatePresence } from "framer-motion";
import dayjs from 'dayjs';
import { diffInMinutes } from './utils/TaskFormUtils';
import TabTitle from './mini_components/TabTitle';
import EventItem from './Calendar/EventItem';
import EventDialog from './Calendar/EventDialog';
import Caption from './mini_components/Caption';

const MotionBox = motion.create(Box);

function Calendar() {
    const { tasks, getGoalTitleById, addTask } = useManager();
    const [showForm, setShowForm] = useState(false);
    // When the calendar selection is tapped on mobile, the same touch can
    // immediately activate controls inside the newly opened modal. We
    // temporarily disable pointer events on the modal inner content for a
    // short timeout when it opens to ignore that original tap.
    const [modalInnerDisabled, setModalInnerDisabled] = useState(false);
    const [dialogEvent, setDialogEvent] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleClose = useCallback(() => { setShowForm(false) }, [setShowForm]);

    // Briefly disable pointer events on the inner modal when it first
    // appears so the tapping finger that opened the modal doesn't also
    // activate buttons/inputs inside it.
    useEffect(() => {
        let t;
        if (showForm) {
            setModalInnerDisabled(true);
            // 350ms is enough to outlive the tap
            t = setTimeout(() => setModalInnerDisabled(false), 350);
        }
        return () => clearTimeout(t);
    }, [showForm]);
    const [data, setData] = useState({
        title: "",
        goalId: '',
        list: '',
        priority: '',
        dueDate: null,
        allDay: false,
        start: '',
        end: '',
        location: '',
        taskDuration: 0,
        durationError: null,
        dateError: null,
    });
    function handleDateSelect(selectInfo) {
        setData(prevValue => {
            // store as HH:MM string to display in the form
            const start = selectInfo.start.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
            const end = selectInfo.end.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
            return {
                ...prevValue,
                start,
                end,
                dueDate: dayjs(selectInfo.start).startOf('day'),
                allDay: selectInfo.allDay,
                taskDuration: !selectInfo.allDay ? diffInMinutes(start, end) : 0,
            };
        });
        // Show the form and let the useEffect turn on the short tap-guard.
        setShowForm(true);
    }
    function handleEventClick(clickInfo) {
        const event = tasks.find(task => task.id === clickInfo.event.id);
        setDialogEvent(event);
        setDialogOpen(true);
    }
    return (
        <Box component='section' sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 3 }}>
            <Box display={'flex'} flexDirection={'column'}>
                <TabTitle title="Calendar View" />
                <Caption text={"Stay organized, manage every event in one place"} />
            </Box>
            <FullCalendar
                plugins={[timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                headerToolbar={{
                    left: 'prev,next',
                    center: 'title',
                    right: 'timeGridWeek,timeGridDay',
                }}
                selectable={true}
                selectAllow={(selectInfo) => {
                    let start = selectInfo.start;
                    let end = selectInfo.end;

                    // For all-day events, end is exclusive → subtract 1ms
                    if (selectInfo.allDay) end = new Date(end.getTime() - 1);

                    // Allow selection only if start and end are on the same day
                    return start.toDateString() === end.toDateString();
                }}
                selectMirror={true}
                longPressDelay={50}
                select={handleDateSelect}
                eventClick={handleEventClick}
                eventContent={(eventInfo) => (
                    <EventItem eventInfo={eventInfo} />
                )}
                
                events={tasks}
                dayHeaderContent={(args) => {
                    const dayName = args.date.toLocaleDateString('en-US', { weekday: 'short' });
                    const dayNumber = args.date.getDate();
                    return {
                        html: `
        <div class="fc-day-header">
          <div class="fc-day-name">${dayName}</div>
          <div class="fc-day-number">${dayNumber}</div>
        </div>
      `
                    };
                }}
            />
            <EventDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                event={dialogEvent}
                goalTitle={getGoalTitleById(dialogEvent?.goalId)}
            />
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
                        transition={{ duration: 0.1, ease: "easeOut" }}
                        sx={{
                            maxWidth: 'clamp(250px, 80vw, 500px)',
                            // Block pointer events for a short moment when the
                            // modal first appears so the originating touch/click
                            // doesn't activate controls inside the form.
                            pointerEvents: modalInnerDisabled ? 'none' : 'auto'
                        }}>
                        <Paper elevation={10} sx={{ p: 3, borderRadius: 3 }}>
                            <TaskForm
                                data={data}
                                onAdd={addTask}
                                onClose={handleClose}
                            />
                        </Paper>
                    </MotionBox>
                </MotionBox>}
            </AnimatePresence>
        </Box>
    );
}

export default React.memo(Calendar);