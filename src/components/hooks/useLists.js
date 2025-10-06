import useLocalStorage from './useLocalStorage';
// Note: removeListTasks is passed from Tasks instead  of using useManager to only have a single source of truth for useManager 
// This will help in removing tasks from UI on list deletion without having to refresh the page
export default function useLists(removeListTasks) {
    const [lists, setLists] = useLocalStorage("lists", []);
    function insertList(name) {
        setLists(prev => [...prev, {
            name
        }]);
    }
    function deleteList(name) {
        removeListTasks(name);
        setLists(lists.filter(list => list.name !== name));
    }
    return {
        lists,
        insertList,
        deleteList,
    }
}