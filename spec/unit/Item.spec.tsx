import { render } from "@testing-library/react";
import ue from "@testing-library/user-event";
import { Item } from "src/components/Item";

const userEvent = ue.setup({
    advanceTimers: jest.advanceTimersByTime,
});

describe("Элемент списка задач", () => {
    it("название не должно быть больше 32 символов", () => {
        const item: Task = {
            id: "1",
            header: "Задача 1",
            done: false,
        };
        const onDelete = jest.fn();
        const onToggle = jest.fn();

        const { queryByText } = render(
            <Item {...item} onDelete={onDelete} onToggle={onToggle} />
        );

        const itemHeader = queryByText(item.header);
        const maxItemHeaderLength = 32;

        expect(itemHeader!.innerHTML).toBeShorterThan(maxItemHeaderLength);
    });

    it("название не должно быть пустым", () => {
        const item: Task = {
            id: "1",
            header: "Задача 1",
            done: false,
        };
        const onDelete = jest.fn();
        const onToggle = jest.fn();

        const { queryByText } = render(
            <Item {...item} onDelete={onDelete} onToggle={onToggle} />
        );

        const itemHeader = queryByText(item.header);

        expect(itemHeader!.innerHTML).not.toBe("");
    });

    it("нельзя удалять невыполненные задачи", () => {
        const item: Task = {
            id: "1",
            header: "Задача 1",
            done: false,
        };
        const onDelete = jest.fn();
        const onToggle = jest.fn();

        const { getByRole } = render(
            <Item {...item} onDelete={onDelete} onToggle={onToggle} />
        );

        const deleteButton = getByRole("button");

        expect(deleteButton).toBeDisabled();
    });

    it("при клике на checkbox выполняется задача; при клике на label отменяется выполнение задачи", async () => {
        const item: Task = {
            id: "1",
            header: "Задача 1",
            done: false,
        };
        const onDelete = jest.fn();
        const onToggle = jest.fn();

        const { getByRole, queryByText } = render(
            <Item {...item} onDelete={onDelete} onToggle={onToggle} />
        );

        const checkbox = getByRole("checkbox");
        const label = queryByText(item.header);

        await userEvent.click(checkbox);
        expect(checkbox).toBeChecked();

        await userEvent.click(label!);
        expect(checkbox).not.toBeChecked();
    });

    it("при клике на checkbox и label вызывается функция onToggle(); при клике на deleteButton вызывается функция onDelete()", async () => {
        const item = {
            id: "1",
            header: "Задача 1",
            done: true,
        };
        const onDelete = jest.fn();
        const onToggle = jest.fn();

        const { getByRole, queryByText } = render(
            <Item {...item} onDelete={onDelete} onToggle={onToggle} />
        );

        const checkbox = getByRole("checkbox");
        const label = queryByText(item.header);
        const deleteButton = getByRole("button");

        await userEvent.click(checkbox);
        expect(onToggle).toHaveBeenCalledWith(item.id);

        await userEvent.click(label!);
        expect(onToggle).toHaveBeenCalledWith(item.id);

        await userEvent.click(deleteButton);
        expect(onDelete).toHaveBeenCalledWith(item.id);
    });
});
