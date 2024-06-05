// CalendarComponent.jsx
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Localizer
const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
    const [events, setEvents] = useState([]);

    return (
        <div className="p-8 bg-white rounded-lg mb-4">
            <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" views={["month", "week", "day", "agenda"]} defaultView="month" style={{ height: 700 }} />
        </div>
    );
};

export default CalendarComponent;
