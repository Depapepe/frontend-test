import { useEffect, useState } from 'react';
import { Pencil1Icon, PlusIcon } from '@radix-ui/react-icons';
import TodoModal from '../../components/TodoModal';

import type { Todo, TodoStatus, ChecklistItem } from '../../types/Todo';

const API_URL = 'http://localhost:3000';

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Todo | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/todos`).then(res => res.json()).then(setTodos);
  }, []);

  const handleAddClick = () => {
    setEditing(null);
    setOpen(true);
  };

  const handleSave = async (data: {
    title: string;
    detail: string;
    dueDate: string;
    status: TodoStatus;
    checklist: ChecklistItem[];
  }) => {
    if (editing) {
      const res = await fetch(`${API_URL}/todos/${editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editing, ...data }),
      });
      const updated = await res.json();
      setTodos(todos.map(t => (t.id === updated.id ? updated : t)));
    } else {
      const newTodo = {
        createdAt: new Date().toISOString().split('T')[0],
        ...data,
      };
      const res = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      });
      const created = await res.json();
      setTodos([...todos, created]);
    }
    setOpen(false);
    setEditing(null);
  };

  const handleDelete = async (id: number) => {
    await fetch(`${API_URL}/todos/${id}`, { method: 'DELETE' });
    setTodos(todos.filter(t => t.id !== id));
  };

  const handleEdit = (todo: Todo) => {
    setEditing(todo);
    setOpen(true);
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Todo List</h1>
        <button
          onClick={handleAddClick}
          className="rounded bg-primary p-2 text-primary-foreground hover:bg-primary/90"
          aria-label="add todo"
        >
          <PlusIcon />
        </button>
      </div>
      <ul className="space-y-2">
        {todos.map(todo => (
          <li key={todo.id} className="flex flex-col gap-1 rounded border p-2">
            <div className="flex justify-between">
              <span className="font-semibold">{todo.title}</span>
              <span className="text-sm text-muted-foreground">{todo.status}</span>
            </div>
            <p className="text-sm text-muted-foreground">{todo.detail}</p>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Due: {todo.dueDate}</span>
              <span>Created: {todo.createdAt}</span>
            </div>
            <div className="mt-1 flex justify-end gap-2">
              <button
                onClick={() => handleEdit(todo)}
                className="rounded bg-secondary p-2 text-secondary-foreground hover:bg-secondary/80"
                aria-label="edit todo"
              >
                <Pencil1Icon />
              </button>
              <button
                onClick={() => handleDelete(todo.id)}
                className="rounded bg-destructive px-2 py-1 text-destructive-foreground hover:bg-destructive/90"
              >
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>
      <TodoModal
        open={open}
        onOpenChange={o => {
          setOpen(o);
          if (!o) setEditing(null);
        }}
        onSave={handleSave}
        initialTodo={editing ?? undefined}
      />
    </>
  );
};

export default Todos;
