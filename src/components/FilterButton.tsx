import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "src/store/taskSlice";
import "./styles.css";

export const FilterButton = () => {
    const dispatch = useDispatch();
    const [isFilter, setIsFilter] = useState(false);

    const handleToggleFilter = () => {
        setIsFilter((prevState) => !prevState);
    };

    useEffect(() => {
        dispatch(setFilter(isFilter));
    }, [isFilter]);

    return (
        <button
            className="filter-button"
            onClick={handleToggleFilter}
            data-testid="filter-button"
        >
            {isFilter ? "Показать все задачи" : "Показать невыполненные задачи"}
        </button>
    );
};
