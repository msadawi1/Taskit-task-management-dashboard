import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import useManager from './hooks/useManager';
import dayjs from 'dayjs';
import { uid } from 'uid';

export default function Calendar() {
    const {tasks, setTasks} = useManager();

    function handleDateSelect(selectInfo) {
        console.log(selectInfo);
        let title = prompt('Please enter a new title for your event')
        let calendarApi = selectInfo.view.calendar
        calendarApi.unselect() // clear date selection

        if (title) {
            const newTask = {
                id: uid(),
                dueDate: dayjs(),
                priority: 2,
                status: false,
                title: title, 
                goalId: "b4fcc22e66e",
            };
            setTasks(prev => [...prev, newTask]);
        }
    }
    function handleEventClick(clickInfo) {
        if (window.confirm(`Delete event '${clickInfo.event.title}'?`)) {
            setTasks( 
                prev => prev.filter(event => event.id !== clickInfo.event.id)
            );
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
        <FullCalendar
            plugins={[timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
                left: 'prev,next',
                center: 'title',
                right: 'timeGridWeek,timeGridDay',
            }}
            selectable={true}
            selectMirror={true}
            select={handleDateSelect}
            eventClick={handleEventClick}
            eventContent={renderEventContent}
            events={tasks}
        />
    );
    // currentEvents.map(event => ({ // performance issue here: to be fixed
    //     ...event,
    //     start: event.start.toDate(),
    //     end: event.end?.toDate(),
    // }))
}