import { useDispatch, useSelector } from "react-redux";
import { Empty } from "src/components/Empty";
import { List } from "src/components/List";
import {
    deleteTask,
    getFilter,
    tasksSelector,
    toggleTask,
} from "src/store/taskSlice";

export const TaskList = () => {
    const dispatch = useDispatch();
    const items = useSelector(tasksSelector);
    const filter = useSelector(getFilter);
    const filteredItems = filter ? items.filter((item) => !item.done) : items;

    const handleDelete = (id: Task["id"]) => {
        dispatch(deleteTask(id));
    };

    const handleToggle = (id: Task["id"]) => {
        dispatch(toggleTask(id));
    };

    return filteredItems.length > 0 ? (
        <List
            items={filteredItems}
            onDelete={handleDelete}
            onToggle={handleToggle}
        />
    ) : (
        <Empty />
    );
};
