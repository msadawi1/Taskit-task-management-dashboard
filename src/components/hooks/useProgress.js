import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { uid } from 'uid';
import useLocalStorage from './useLocalStorage';
import useManager from './useManager';
import { getFormattedDate } from "../utils/ProgressUtils";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export default function useProgress(week) {
    const [reflections, setReflections] = useLocalStorage("reflections", []);
    const { tasks } = useManager();
    function filterTasksByWeek(tasks) {
        return tasks.filter(task => {
            const taskDate = dayjs(task.dueDate);
            return taskDate.isSameOrAfter(week.start, "day") &&
                taskDate.isSameOrBefore(week.end, "day");
        });
    }
    const categories = [{ id: 1, title: 'Ibadah' }, { id: 2, title: 'Career' }, { id: 3, title: 'Relationships' }, { id: 4, title: 'Health' }];
    function getStats() {
        let totalTime = 0;
        let completed = 0;
        let allDayCount = 0;
        // NOTE: categories are hardcoded here, to be fixed later.
        let timeByCategory = Object.fromEntries(
            categories.map(c => [c.id, 0])
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
            if (timeByCategory.hasOwnProperty(task.category)) {
                timeByCategory[task.category] += duration;
            }
        });
        return { totalTasks: filterdTasks.length, totalTime, completed, timeByCategory, allDayCount };
    }
    /**
* add a reflection.
* @param {string} content - string of content
*/
    function addReflection(content) {
        setReflections(prev => [...prev, {
            id: uid(),
            date: getFormattedDate(),
            content: content,
        }]);
    }
    /**
* add a reflection.
* @param {string} id - id of the reflection to be removed
*/
    function removeReflection(id) {
        setReflections(prev => prev.filter(prev => prev.id !== id));
    }
    return {
        reflections,
        addReflection,
        removeReflection,
        getStats
    }
}