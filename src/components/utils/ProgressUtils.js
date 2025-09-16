import dayjs from "dayjs";

function getWeeksInMonth(date) {
    const startOfMonth = dayjs(date).startOf("month").startOf("week");
    const endOfMonth = dayjs(date).endOf("month").endOf("week");

    let current = startOfMonth;
    const weeks = [];

    while (current.isBefore(endOfMonth)) {
        const start = current;
        const end = current.endOf("week");
        weeks.push({ start, end });
        current = current.add(1, "week");
    }

    return weeks;
}