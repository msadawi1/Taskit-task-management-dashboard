function shiftWeek(week, direction = "next") {
    const delta = direction === "next" ? 1 : -1;

    const newStart = week.start.add(delta, "week");
    const newEnd = week.end.add(delta, "week");

    return { start: newStart, end: newEnd };
}

function getFormattedDate(dayjsObj) {
    return dayjsObj.format("DD/MM/YYYY");
}

function getWeekOffset(date, week) {
    const weekStart = date.startOf("week");
    const diff = week.start.startOf("week").diff(weekStart, "week");
    return diff;
}


export { shiftWeek, getFormattedDate, getWeekOffset };