import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import TodoModal from "./TodoModal";

describe("TodoModal", () => {
  it("renders correctly when open", () => {
    // given
    const onOpenChangeMock = vi.fn();
    const onSaveMock = vi.fn();

    // when
    render(
      <TodoModal
        open={true}
        onOpenChange={onOpenChangeMock}
        onSave={onSaveMock}
        initialTodo={{
          title: "Test Todo",
          detail: "",
          dueDate: "",
          status: "TODO",
          checklist: [],
        }}
      />
    );

    // when
    expect(screen.getByText("Todo")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("renders correctly when open with test-id", () => {
    // given
    const onOpenChangeMock = vi.fn();
    const onSaveMock = vi.fn();

    // when
    render(
      <TodoModal
        open={true}
        onOpenChange={onOpenChangeMock}
        onSave={onSaveMock}
        initialTodo={{
          title: "Test Todo",
          detail: "",
          dueDate: "2025-12-31",
          status: "TODO",
          checklist: [
            {
              id: 1,
              text: "Item 1",
              done: false,
            },
          ],
        }}
      />
    );

    // when
    expect(screen.getByTestId("todo-modal")).toBeInTheDocument();
    expect(screen.getByTestId("todo-modal-title")).toBeInTheDocument();
    expect(screen.getByTestId("todo-title-input")).toBeInTheDocument();
    expect(screen.getByTestId("todo-detail-input")).toBeInTheDocument();
    expect(screen.getByTestId("todo-checklist-item-1")).toBeInTheDocument();
    expect(screen.getByTestId("todo-save-button")).toBeInTheDocument();
    expect(screen.getByTestId("todo-cancel-button")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    // given
    const onOpenChangeMock = vi.fn();
    const onSaveMock = vi.fn();

    // when
    render(
      <TodoModal
        open={false}
        onOpenChange={onOpenChangeMock}
        onSave={onSaveMock}
      />
    );

    // then
    // expect(screen.getByTestId("todo-modal")).not.toBeInTheDocument();
    expect(screen.queryByTestId("todo-modal")).not.toBeInTheDocument();
  });

  it("closes when the overlay is clicked", () => {
    // given
    const onOpenChangeMock = vi.fn();
    const onSaveMock = vi.fn();

    render(
      <TodoModal
        open={true}
        onOpenChange={onOpenChangeMock}
        onSave={onSaveMock}
        initialTodo={{
          title: "Test Todo",
          detail: "",
          dueDate: "",
          status: "TODO",
          checklist: [],
        }}
      />
    );

    // when - 오버레이 클릭
    screen.getByTestId("todo-modal-overlay").click();

    // then - onOpenChange가 false로 호출되었는지 확인
    expect(onOpenChangeMock).toHaveBeenCalledWith(false);
  });

  it("calls onSave with correct data when save button is clicked", () => {
    // given
    const onOpenChangeMock = vi.fn();
    const onSaveMock = vi.fn();
    const initialTodo = {
      title: "Test Todo",
      detail: "Test Detail",
      dueDate: "2025-07-24",
      status: "TODO" as const,
      checklist: [{ id: 1, text: "Item 1", done: false }],
    };

    render(
      <TodoModal
        open={true}
        onOpenChange={onOpenChangeMock}
        onSave={onSaveMock}
        initialTodo={initialTodo}
      />
    );

    // when - detail 수정, checkbox 클릭, Save 버튼 클릭
    const detailInput = screen.getByTestId("todo-detail-input");
    fireEvent.change(detailInput, { target: { value: "Updated Detail Text" } });
    screen.getByTestId("todo-checklist-checkbox-1").click();

    screen.getByTestId("todo-save-button").click();

    // then - onSave가 올바른 데이터와 함께 호출되었는지 확인
    expect(onSaveMock).toHaveBeenCalledTimes(1);
    expect(onSaveMock).toHaveBeenCalledWith({
      title: "Test Todo",
      detail: "Updated Detail Text",
      dueDate: "2025-07-24",
      status: "TODO",
      checklist: [{ id: 1, text: "Item 1", done: true }],
    });
  });
});
