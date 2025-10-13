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
    /**
* remove a goal and all of its tasks.
* @param {task} task task object 
*/
    function addTask(task) {
        setTasks(prevValue => [...prevValue, {
            id: uid(),
            ...task,
            status: false,
        }]);
    }
    /**
* complete a task
* @param {string} id - id of the task to be completed
*/
    function completeTask(id) {
        setTasks(prevValue => prevValue.map(task => task.id === id ? { ...task, status: !task.status } : task));
    }
    /**
* remove a task
* @param {string} id - id of the task to be removed
*/
    function removeTask(id) {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    }

    function removeListTasks(listName) {
        setTasks(prevTasks => prevTasks.filter(task => task.list !== listName));
    }

    function getGoalTitleById(goalId) {
        const goal = weeklyGoals.find(goal => goal.id === goalId) 
        if (goal) return goal.title; else return null;;
    }

    function completedGoal(goalId) {
        const goalTasks = tasks.filter(task => task.goalId === goalId);
        goalTasks.forEach(task => {
            if (!task.status) {
                return false;
            }
        });
        setWeeklyGoals(prevValue => prevValue.map(goal => goal.id === goalId ? { ...goal, status: true } : goal));
        return true;
    }
    return {
        tasks,
        addTask,
        completeTask,
        removeTask,
        removeListTasks,
        weeklyGoals,
        addGoal,
        removeGoalAndTasks,
        getGoalTitleById,
        completedGoal
    }
}