function diffInMinutes(start, end) {
    if (!start || !end) return 0;

    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);

    const startMinutes = sh * 60 + sm;
    const endMinutes = eh * 60 + em;

    let diff = endMinutes - startMinutes;

    return diff;
}

function parseTimeToDate(timeStr, dueDate) {
    const [hours, minutes] = timeStr.split(":").map(Number);

    // Clone the dueDate (so we don't mutate the original)
    const date = new Date(dueDate);

    date.setHours(hours, minutes, 0, 0); // hours, minutes, seconds, ms = 0

    return date; // native Date in local time
}

const priorityObj = {
    0: "High",
    1: "Medium",
    2: "Low"
}

const priorityColors = {
    0: 'warning',
    1: 'info',
    2: 'success',
};

export { diffInMinutes, parseTimeToDate, priorityObj, priorityColors };
