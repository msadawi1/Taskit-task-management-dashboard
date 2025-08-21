import { createContext, useContext } from 'react';

export const TasksContext = createContext();
export const TaskFormRefContext = createContext();

export function useTasksContext() {
    const tasks = useContext(TasksContext);
    if(!tasks)
        throw new Error("Error: tasks context is undefined, try wrapping element inside context provider.");
    return tasks;
}

export function useTaskFormRefContext() {
    const taskFormRef = useContext(TaskFormRefContext);
    if (!taskFormRef)
        throw new Error("Error: task form context is undefined, try wrapping element inside context provider.");
    return taskFormRef;
}