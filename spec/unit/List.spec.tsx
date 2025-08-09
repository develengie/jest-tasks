import { render } from "@testing-library/react";
import { List } from "src/components/List";

it("отображение списка задач", () => {
    const onDelete = jest.fn();
    const onToggle = jest.fn();

    const items: Task[] = [
        {
            id: "1",
            header: "купить хлеб",
            done: false,
        },
        {
            id: "2",
            header: "купить молоко",
            done: false,
        },
        {
            id: "3",
            header: "выгулять собаку",
            done: true,
        },
    ];

    const { rerender, asFragment } = render(
        <List items={items} onDelete={onDelete} onToggle={onToggle} />
    );
    const firstRender = asFragment();

    items.pop();

    rerender(<List items={items} onDelete={onDelete} onToggle={onToggle} />);
    const secondRender = asFragment();

    expect(firstRender).toMatchDiffSnapshot(secondRender);
});

it("Список содержит не больше 10 невыполненных задач", () => {
    const onDelete = jest.fn();
    const onToggle = jest.fn();

    const items: Task[] = [
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
        {
            id: "4",
            header: "Задача 4",
            done: false,
        },
        {
            id: "5",
            header: "Задача 5",
            done: false,
        },
        {
            id: "6",
            header: "Задача 6",
            done: false,
        },
        {
            id: "7",
            header: "Задача 7",
            done: false,
        },
        {
            id: "8",
            header: "Задача 8",
            done: false,
        },
        {
            id: "9",
            header: "Задача 9",
            done: false,
        },
        {
            id: "10",
            header: "Задача 10",
            done: false,
        },
        {
            id: "11",
            header: "Задача 11",
            done: true,
        },
    ];

    const { container } = render(
        <List items={items} onDelete={onDelete} onToggle={onToggle} />
    );

    const uncompletedTasks = container.querySelectorAll(
        'input[type="checkbox"]:not(:checked)'
    );
    const disabledDeleteButtons = container.querySelectorAll(
        '[data-alt="Удалить"]:disabled'
    );

    const maxUncompletedTasksCount = 10;
    const uncompletedTasksCount = uncompletedTasks.length;
    const disabledDeleteButtonsCount = disabledDeleteButtons.length;

    expect(uncompletedTasksCount).toBeLessThanOrEqual(maxUncompletedTasksCount);
    expect(disabledDeleteButtonsCount).toBe(uncompletedTasksCount);
});
