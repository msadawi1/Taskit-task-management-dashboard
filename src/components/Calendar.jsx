import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import useLocalStorage from './hooks/useLocalStorage';
import dayjs from 'dayjs';
import { uid } from 'uid';

export default function Calendar() {
    const [currentEvents, setCurrentEvents] = useLocalStorage("events", []);

    function handleDateSelect(selectInfo) {
        let title = prompt('Please enter a new title for your event')
        let calendarApi = selectInfo.view.calendar

        calendarApi.unselect() // clear date selection

        if (title) {
            const newEvent = {
                id: uid(),
                title,
                start: dayjs(selectInfo.startStr),
                end: dayjs(selectInfo.endStr),
                allDay: selectInfo.allDay
            };
            setCurrentEvents([...currentEvents, newEvent]);
        }
    }
    function handleEventClick(clickInfo) {
        if (window.confirm(`Delete event '${clickInfo.event.title}'?`)) {
            setCurrentEvents(
                currentEvents.filter(event => event.id !== clickInfo.event.id)
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
            events={currentEvents.map(event => ({ // performance issue here: to be fixed
                ...event,
                start: event.start.toDate(),
                end: event.end?.toDate(),
            }))}
        />
    );
}