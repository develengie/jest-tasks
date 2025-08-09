import { render } from "@testing-library/react";
import ue from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { App } from "src/App";
import { JestStoreProvider } from "../utils/JestStoreProvider";

const userEvent = ue.setup({
    advanceTimers: jest.advanceTimersByTime,
});

jest.useFakeTimers();

describe("Оповещение при выполнении задачи", () => {
    it("появляется и содержит заголовок задачи", async () => {
        const { getByRole, container, findByText } = render(<App />, {
            wrapper: JestStoreProvider,
        });

        const input = getByRole("textbox");
        const addButton = container.querySelector(
            '[data-alt="добавить задачу"]'
        );

        await userEvent.type(input, "Задача 1");
        await userEvent.click(addButton!);

        const task = getByRole("checkbox");

        await userEvent.click(task);

        const notifier = await findByText(/Задача "Задача 1" завершена/i);

        expect(notifier).toBeInTheDocument();

        act(() => jest.advanceTimersByTime(2000));

        expect(notifier).not.toBeInTheDocument();
    });

    it("одновременно может отображаться только одно", async () => {
        const { getByRole, container, getAllByRole, findByText, getAllByText } =
            render(<App />, {
                wrapper: JestStoreProvider,
            });

        const input = getByRole("textbox");
        const addButton = container.querySelector(
            '[data-alt="добавить задачу"]'
        );

        await userEvent.type(input, "Задача 2");
        await userEvent.click(addButton!);

        const allTasks = getAllByRole("checkbox");

        await userEvent.click(allTasks[0]);
        await userEvent.click(allTasks[0]);

        const notifier = await findByText(/Задача "Задача 1" завершена/i);

        expect(notifier).toBeInTheDocument();

        await userEvent.click(allTasks[1]);

        const allNotifiers = getAllByText(/Задача "/i);

        expect(allNotifiers).toHaveLength(1);
    });
});
