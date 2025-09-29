import { uid } from 'uid';
import useLocalStorage from './useLocalStorage';

export default function useLists() {
    const [lists, setLists] = useLocalStorage("lists", []);
    function insertList(name) {
        setLists(prev => [...prev, {
            id: uid(),
            name
        }]);
    }
    function deleteList(id) {
        setLists(lists.filter(list => list.id !== id));
    }
    return {
        lists,
        insertList,
        deleteList,
    }
}