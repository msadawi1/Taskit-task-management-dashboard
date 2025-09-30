import useLocalStorage from './useLocalStorage';

export default function useLists() {
    const [lists, setLists] = useLocalStorage("lists", []);
    function insertList(name) {
        setLists(prev => [...prev, {
            name
        }]);
    }
    function deleteList(name) {
        setLists(lists.filter(list => list.name !== name));
    }
    return {
        lists,
        insertList,
        deleteList,
    }
}