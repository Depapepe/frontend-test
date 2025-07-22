export type TodoStatus = 'TODO' | 'PROGRESS' | 'DONE';

export interface Todo {
  id: number;
  title: string;
  detail: string;
  dueDate: string;
  createdAt: string;
  status: TodoStatus;
}
