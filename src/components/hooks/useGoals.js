import { useState } from 'react';
import { uid } from 'uid';

export default function useGoals() {
    // note: id set as integers for testing to match tasks' goal ids
    const [weeklyGoals, setWeeklyGoals] = useState([
        { id: 1, title: "Complete Project Report", status: false },
        { id: 2, title: "Improve Fitness", status: false },
        { id: 3, title: "Develop Coding Skills", status: true }
    ]);
    /**
* remove a goal.
* @param {string} id - id of the goal to be removed.
*/
    function removeGoal(id) {
        setWeeklyGoals(prevGoals => prevGoals.filter(goal => goal.id !== id));
    }
    /**
 * add a goal.
 * @param {string} title - goal title.
 */
    function addGoal(title) {
        setWeeklyGoals(prevValue => [...prevValue, {
            id: uid(),
            title: title,
            status: 'in-progress'
        }]);
    }
    return {
        weeklyGoals,
        setWeeklyGoals,
        removeGoal,
        addGoal
    }
}