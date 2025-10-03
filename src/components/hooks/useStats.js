import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import useManager from './useManager';
import useLists from "./useLists";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export default function useStats(week) {
    const { tasks } = useManager();
    function filterTasksByWeek(tasks) {
        return tasks.filter(task => {
            const taskDate = dayjs(task.dueDate);
            return taskDate.isSameOrAfter(week.start, "day") &&
                taskDate.isSameOrBefore(week.end, "day");
        });
    }    
    const { lists } = useLists();
    function getStats() {
        let totalTime = 0;
        let completed = 0;
        let allDayCount = 0;
        // NOTE: categories are hardcoded here, to be fixed later.
        let timeByList = Object.fromEntries(
            lists.map(list => [list.name, 0])
        );
        const filterdTasks = filterTasksByWeek(tasks);
        filterdTasks.forEach(task => {
            const duration = Number(task.duration) || 0;
            totalTime += duration;
            if (task.status) {
                completed += 1;
            }
            if (task.allDay) {
                allDayCount += 1;
            }
            if (timeByList.hasOwnProperty(task.list)) {
                timeByList[task.list] += duration;
            }
        });
        return { totalTasks: filterdTasks.length, totalTime, completed, timeByList, allDayCount };
    }
    return {
        getStats
    }
}