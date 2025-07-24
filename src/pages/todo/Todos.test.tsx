import { describe, it, expect, vi } from "vitest";
import {
  render,
  screen,
  fireEvent,
  within,
  waitFor,
} from "@testing-library/react";
import Todos from "./Todos";
import { server } from "../../mocks/server";

vi.mock("../../components/TodoModal", () => ({
  default: ({ open }: { open: boolean }) =>
    open ? <div>Modal Open</div> : null,
}));

describe("Todos", () => {
  it("renders the todo list header", () => {
    render(<Todos />);
    expect(screen.getByText("Todo List")).toBeInTheDocument();
  });

  it("fetches and displays todos", async () => {
    render(<Todos />);
    expect(await screen.findByText("Test Todo")).toBeInTheDocument();
    expect(screen.getByText("Detail text")).toBeInTheDocument();
    expect(screen.getByText("Due: 2024-01-01")).toBeInTheDocument();
    expect(screen.getByText("Created: 2023-01-01")).toBeInTheDocument();
  });

  it("removes a todo when clicking delete button", async () => {
    const requestSpy = vi.fn();
    server.events.on("request:start", requestSpy);

    render(<Todos />);

    // 1. data-testid를 사용하여 특정 todo 항목을 찾습니다.
    const listItem = await screen.findByTestId("todo-item-1");

    // 2. 해당 항목 내에서 삭제 버튼을 찾습니다.
    const deleteButton = within(listItem).getByTestId("delete-todo-1");
    fireEvent.click(deleteButton);

    // 3. 항목이 DOM에서 사라질 때까지 기다립니다.
    await waitFor(() => {
      expect(screen.queryByTestId("todo-item-1")).toBeNull();
    });

    // 4. 호출된 요청 목록에서 DELETE 요청을 직접 찾습니다.
    const deleteRequestCall = requestSpy.mock.calls.find(
      (call) => call[0].request.method === "DELETE"
    );

    // 5. DELETE 요청이 있었는지, URL이 올바른지 확인합니다.
    expect(deleteRequestCall).toBeDefined();
    if (!deleteRequestCall) {
      throw new Error("DELETE request was not made");
    }
    expect(deleteRequestCall[0].request.url).toMatch(/\/todos\/1$/);

    server.events.removeListener("request:start", requestSpy);
  });
});
