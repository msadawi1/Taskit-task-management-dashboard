import { useState } from 'react';
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

const MotionBox = motion.create(Box);

export default function Calendar() {
    const { tasks, addTask } = useManager();
    const [showForm, setShowForm] = useState(false);
    const [data, setData] = useState({
        title: "",
        goalId: '',
        category: '',
        priority: '',
        dueDate: null,
        allDay: false,
        start: '',
        end: '',
        location: '',
        duration: 0,
        durationError: null,
        dateError: null,
    });
    function handleDateSelect(selectInfo) {
        let calendarApi = selectInfo.view.calendar
        console.log(selectInfo);

        calendarApi.unselect() // clear date selection
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
                duration: !selectInfo.allDay ? diffInMinutes(start, end) : 0,
            };
        });
        setShowForm(true);
    }
    function handleEventClick(clickInfo) {
        if (window.confirm(`Delete event '${clickInfo.event.title}'?`)) {
            console.log("Task deletd.");
        }
    }
    function renderEventContent(eventInfo) {
        return (
            <>
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i><br />
                <i>{eventInfo.event.id}</i>
            </>
        )
    }
    return (
        <Box component='section' sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 3 }}>
            <TabTitle title="Calendar View"/>
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
                select={handleDateSelect}
                eventClick={handleEventClick}
                eventContent={renderEventContent}
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
                        transition={{ duration: 0.1, ease: "easeOut" }} sx={{ maxWidth: 'clamp(250px, 80vw, 500px)' }}>
                        <Paper elevation={10} sx={{ p: 3, borderRadius: 3 }}>
                            <TaskForm
                                data={data}
                                onAdd={addTask}
                                onClose={() => { setShowForm(false) }}
                            />
                        </Paper>
                    </MotionBox>
                </MotionBox>}
            </AnimatePresence>
        </Box>
    );
}