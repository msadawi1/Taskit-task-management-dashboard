import useTasks from './useTasks';
import useGoals from './useGoals';

export default function useGoalTasks() {
    const { weeklyGoals, addGoal, removeGoal } = useGoals();
    const { tasks, setTasks, removeGoalTasks } = useTasks(weeklyGoals);
    /**
* remove a goal and all of its tasks.
* @param {string} id - id of the goal to be removed (along with its tasks).
*/
    function removeGoalAndTasks(id) {
        removeGoal(id);
        removeGoalTasks(id);
    }
    return {
        removeGoalAndTasks,
        weeklyGoals,
        addGoal,
        tasks,
        setTasks,
    }
}