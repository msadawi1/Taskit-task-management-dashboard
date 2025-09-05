import { useState } from 'react';
import { uid } from 'uid';
import dayjs from "dayjs";

export default function useTasks() {
    const [tasks, setTasks] = useState([
        {
            id: uid(),
            title: "Write Introduction & Methodology",
            priority: 0,
            weeklyGoalId: 1,
            dueDate: dayjs("2025-08-19T10:00:00"),
            status: true
        },
        {
            id: uid(),
            title: "Analyze Results & Create Charts",
            priority: 1,
            weeklyGoalId: 1,
            dueDate: dayjs("2025-08-20T14:00:00"),
            status: false
        },
        {
            id: uid(),
            title: "Run 10km",
            priority: 0,
            weeklyGoalId: 2,
            dueDate: dayjs("2025-08-21T07:30:00"),
            status: false
        },
        {
            id: uid(),
            title: "Do strength training (upper body)",
            priority: 2,
            weeklyGoalId: 2,
            dueDate: dayjs("2025-08-19T18:30:00"),
            status: true
        },
        {
            id: uid(),
            title: "Solve 5 coding challenges",
            priority: 0,
            weeklyGoalId: 3,
            dueDate: dayjs("2025-08-17T20:00:00"),
            status: true
        }
    ]);
    /**
* remove all goal's tasks.
* @param {string} goalId - id of the goal to be removed.
*/
    function removeGoalTasks(goalId) {
        setTasks(prevValue => prevValue.filter(task => task.weeklyGoalId !== goalId));
    }
    return {
        tasks,
        setTasks,
        removeGoalTasks
    }
}