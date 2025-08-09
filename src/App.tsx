import { useSelector } from "react-redux";
import { tasksSelector } from "./store/taskSlice";
import { FilterButton } from "./components/FilterButton";
import { NewTaskBar } from "./modules/NewTaskBar";
import { TaskList } from "./modules/TaskList";
import { NotifierContainer } from "./modules/NotifierContainer";
import "./styles.css";

export const App = () => {
    const items = useSelector(tasksSelector);

    return (
        <div className="root-container">
            <h3>Список задач</h3>
            {items.length > 0 && <FilterButton />}
            <NewTaskBar />
            <TaskList />
            <NotifierContainer />
        </div>
    );
};
