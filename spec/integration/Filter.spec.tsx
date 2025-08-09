import { render } from "@testing-library/react";
import ue from "@testing-library/user-event";
import * as taskSliceModule from "src/store/taskSlice";
import { App } from "src/App";
import { JestStoreProvider } from "../utils/JestStoreProvider";

const userEvent = ue.setup({
    advanceTimers: jest.advanceTimersByTime,
});

describe("Список задач", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    // не содержит выполненные задачи
    // после нажатия на кнопку фильтрации
    it("с включенным фильтром", async () => {
        const mockTaskList: Task[] = [
            {
                id: "1",
                header: "Задача 1",
                done: false,
            },
            {
                id: "2",
                header: "Задача 2",
                done: false,
            },
            {
                id: "3",
                header: "Задача 3",
                done: false,
            },
        ];

        jest.spyOn(taskSliceModule, "tasksSelector").mockReturnValue(
            mockTaskList
        );

        const { getByTestId, getAllByRole } = render(<App />, {
            wrapper: JestStoreProvider,
        });

        const filterButton = getByTestId("filter-button");
        const allTasks = getAllByRole("checkbox");

        await userEvent.click(filterButton);

        expect(filterButton).toHaveTextContent("Показать все задачи");
        allTasks.forEach((task) => {
            expect(task).not.toBeChecked();
        });
    });

    // показывает как выполненные, так и не выполненные задачи
    // после повторного нажатия на кнопку фильтрации
    it("с выключенным фильтром", async () => {
        const mockTaskList: Task[] = [
            {
                id: "1",
                header: "Задача 1",
                done: true,
            },
            {
                id: "2",
                header: "Задача 2",
                done: false,
            },
            {
                id: "3",
                header: "Задача 3",
                done: true,
            },
        ];

        jest.spyOn(taskSliceModule, "tasksSelector").mockReturnValue(
            mockTaskList
        );

        const { getByTestId, getAllByRole } = render(<App />, {
            wrapper: JestStoreProvider,
        });

        const filterButton = getByTestId("filter-button");
        const allTasks = getAllByRole("checkbox");

        await userEvent.dblClick(filterButton);

        expect(filterButton).toHaveTextContent("Показать невыполненные задачи");
        expect(allTasks).toHaveLength(mockTaskList.length);
    });

    // отображает кнопку фильтрации после добавления первой задачи
    // скрывает кнопку фильтрации после удаления последней задачи
    it("с кнопкой фильтрации", async () => {
        const { getByRole, container, getByTestId } = render(<App />, {
            wrapper: JestStoreProvider,
        });

        const input = getByRole("textbox");
        const addButton = container.querySelector(
            '[data-alt="добавить задачу"]'
        );

        await userEvent.type(input, "Задача 1");
        await userEvent.click(addButton!);

        const filterButton = getByTestId("filter-button");

        expect(filterButton).toBeInTheDocument();

        const task = getByRole("checkbox");
        const deleteButton = container.querySelector('[data-alt="Удалить"]');

        await userEvent.click(task);
        await userEvent.click(deleteButton!);

        expect(filterButton).not.toBeInTheDocument();
    });
});
