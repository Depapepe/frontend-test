export type TodoStatus = "TODO" | "PROGRESS" | "DONE";

export interface ChecklistItem {
  id: number;
  text: string;
  done: boolean;
}

export interface Todo {
  id: number;
  title: string;
  detail: string;
  dueDate: string;
  createdAt: string;
  status: TodoStatus;
  checklist: ChecklistItem[];
}
