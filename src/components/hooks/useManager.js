import { uid } from 'uid';
import useLocalStorage from './useLocalStorage';

export default function useManager() {
    // note: id set as integers for testing to match tasks' goal ids
    const [weeklyGoals, setWeeklyGoals] = useLocalStorage("goals", []);
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
            status: 0
        }]);
    }
    const [tasks, setTasks] = useLocalStorage("tasks", []);
    /**
* remove all goal's tasks.
* @param {string} goalId - id of the goal to be removed.
*/
    function removeGoalTasks(goalId) {
        setTasks(prevValue => prevValue.filter(task => task.goalId !== goalId));
    }
    /**
* remove a goal and all of its tasks.
* @param {string} id - id of the goal to be removed (along with its tasks).
*/
    function removeGoalAndTasks(id) {
        removeGoal(id);
        removeGoalTasks(id);
    }
    return {
        tasks,
        setTasks,
        removeGoalTasks,
        weeklyGoals,
        setWeeklyGoals,
        removeGoal,
        addGoal,
        removeGoalAndTasks
    }
}