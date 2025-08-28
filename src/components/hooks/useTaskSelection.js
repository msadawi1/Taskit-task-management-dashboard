import { useState } from 'react';
import { useTasksContext } from '../context';

export default function useTaskSelection() {
    const [selectedTaskId, setSelectedTaskId] = useState('');
    const { tasks } = useTasksContext();
    const [finishedTaskId] = useState('');
    const [error] = useState(false);
    function handleChange(event) {
        setSelectedTaskId(Number(event.target.value));
    }
    function getSelectedTaskTitle() {
        return (tasks.filter(task => selectedTaskId === task.id))[0]?.title || '';
    }
    return {
        selectedTaskId,
        tasks,
        finishedTaskId,
        error,
        handleChange,
        getSelectedTaskTitle
    };
}