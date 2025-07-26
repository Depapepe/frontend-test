import { describe, it, expect, vi } from "vitest";
import {
  render,
  screen,
  within,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Todos from "./Todos";
import { server } from "../../mocks/server";

vi.mock("../../components/TodoModal", () => ({
  default: ({ open }: { open: boolean }) =>
    open ? <div>Modal Open</div> : null,
}));

describe("Todos", () => {
  it("renders the todo list header", () => {
    // given

    // when
    render(<Todos />);

    //then
    expect(screen.getByText("Todo List")).toBeInTheDocument();
  });

  it("fetches and displays todos", async () => {
    // given

    // when
    render(<Todos />);

    // then
    expect(await screen.findByText("Test Todo")).toBeInTheDocument();
    expect(screen.getByText("Detail text")).toBeInTheDocument();
    expect(screen.getByText("Due: 2025-12-31")).toBeInTheDocument();
    expect(screen.getByText("Created: 2025-06-01")).toBeInTheDocument();
  });

  it("removes a todo when clicking delete button", async () => {
    //given
    const requestSpy = vi.fn();
    server.events.on("request:start", requestSpy);

    // when
    render(<Todos />);

    const listItem = await screen.findByTestId("todo-item-1");

    const deleteButton = within(listItem).getByTestId("delete-todo-1");
    await userEvent.click(deleteButton);

    // then
    // item dom 이 사라질 때까지 기다리기
    await waitFor(() => {
      expect(screen.queryByTestId("todo-item-1")).toBeNull();
    });

    // DELETE 요청이 있었는지 확인
    const deleteRequestCall = requestSpy.mock.calls.find(
      (call) => call[0].request.method === "DELETE"
    );

    // DELETE 요청이 있었는지, URL이 올바른지 확인
    expect(deleteRequestCall).toBeDefined();
    if (!deleteRequestCall) {
      throw new Error("DELETE request was not made");
    }
    expect(deleteRequestCall[0].request.url).toMatch(/\/todos\/1$/);

    server.events.removeListener("request:start", requestSpy);
  });
});
