import useLocalStorage from './useLocalStorage';
import { uid } from 'uid';
import { useCallback, useMemo } from 'react';

export default function useReflections() {
    const [reflections, setReflections] = useLocalStorage("reflections", []);
    /**
    * add a reflection.
    * @param {string} content - string of content
    */
    const addReflection = useCallback((content, date) => {
        setReflections(prev => [...prev, {
            id: uid(),
            date: date,
            content: content,
        }]);
    }, [setReflections]);

    /**
    * remove a reflection.
    * @param {string} id - id of the reflection to be removed
    */
    const removeReflection = useCallback((id) => {
        setReflections(prev => prev.filter(prev => prev.id !== id));
    }, [setReflections]);
    
    const value = useMemo(() => ({
        reflections,
        addReflection,
        removeReflection
    }), [reflections, addReflection, removeReflection]);

    return value;
}
