import { useState } from 'react';
import TodoModal from '../../components/TodoModal';

interface Todo {
  id: number;
  text: string;
}

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Todo | null>(null);

  const handleAddClick = () => {
    setEditing(null);
    setOpen(true);
  };

  const handleSave = (text: string) => {
    if (editing) {
      setTodos(todos.map(t => (t.id === editing.id ? { ...t, text } : t)));
    } else {
      setTodos([...todos, { id: Date.now(), text }]);
    }
    setOpen(false);
    setEditing(null);
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const handleEdit = (todo: Todo) => {
    setEditing(todo);
    setOpen(true);
  };

  return (
    <div className="mx-auto max-w-md p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Todo List</h1>
        <button
          onClick={handleAddClick}
          className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
        >
          +
        </button>
      </div>
      <ul className="space-y-2">
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center justify-between rounded border p-2">
            <span>{todo.text}</span>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(todo)}
                className="rounded bg-green-500 px-2 py-1 text-white hover:bg-green-600"
              >
                수정
              </button>
              <button
                onClick={() => handleDelete(todo.id)}
                className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600"
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
        initialText={editing?.text}
      />
    </div>
  );
};

export default Todos;
