import { createContext, useContext } from 'react';

export const TasksContext = createContext();
export const GoalSelectContext = createContext();

export function useTasksContext() {
    const tasks = useContext(TasksContext);
    if(!tasks)
        throw new Error("Error: tasks context is undefined, try wrapping element inside context provider.");
    return tasks;
}

export function useGoalSelectContext() {
    const selectedGoal = useContext(GoalSelectContext);
    if(!selectedGoal)
        throw new Error("Error: tasks context is undefined, try wrapping element inside context provider.");
    return selectedGoal; 
}