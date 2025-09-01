import { useState } from 'react';
import { useTasksContext } from '../context';

export default function useTaskSelection() {
    const [input, setInput] = useState('');
    const [error, setError] = useState(false);
    const { tasks } = useTasksContext();
    const [selectedTaskId, setSelectedTaskId] = useState('');
    function handleChange(event) {
        const value = event.target.value;
        setInput(value);
        setError(false);
    }
    function clearSelection() {
        setInput('');
    }
    function getSelectedTaskTitle() {
        return (tasks.filter(task => selectedTaskId === task.id))[0]?.title ?? '';
    }
    return {
        input,
        selectedTaskId,
        tasks,
        setSelectedTaskId,
        getSelectedTaskTitle,
        handleChange,
        clearSelection,
        error,
        setError
    };
}