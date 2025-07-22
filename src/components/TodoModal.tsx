import { useEffect, useState } from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Dialog } from 'radix-ui';
import type { TodoStatus } from '../types/Todo';

interface TodoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: {
    title: string;
    detail: string;
    dueDate: string;
    status: TodoStatus;
  }) => void;
  initialTodo?: {
    title?: string;
    detail?: string;
    dueDate?: string;
    status?: TodoStatus;
  };
}

const TodoModal = ({ open, onOpenChange, onSave, initialTodo }: TodoModalProps) => {
  const [title, setTitle] = useState(initialTodo?.title ?? '');
  const [detail, setDetail] = useState(initialTodo?.detail ?? '');
  const [dueDate, setDueDate] = useState(initialTodo?.dueDate ?? '');
  const [status, setStatus] = useState<TodoStatus>(initialTodo?.status ?? 'TODO');

  useEffect(() => {
    setTitle(initialTodo?.title ?? '');
    setDetail(initialTodo?.detail ?? '');
    setDueDate(initialTodo?.dueDate ?? '');
    setStatus(initialTodo?.status ?? 'TODO');
  }, [initialTodo]);

  const handleSave = () => {
    if (title.trim()) {
      onSave({ title: title.trim(), detail: detail.trim(), dueDate, status });
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-96 -translate-x-1/2 -translate-y-1/2 rounded bg-white p-4 shadow">
          <Dialog.Title className="mb-2 text-lg font-bold">Todo</Dialog.Title>
          <div className="mb-2">
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full rounded border p-2"
              placeholder="Title"
            />
          </div>
          <div className="mb-2">
            <textarea
              value={detail}
              onChange={e => setDetail(e.target.value)}
              className="w-full rounded border p-2"
              placeholder="Detail"
            />
          </div>
          <div className="mb-2 flex gap-2">
            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className="flex-1 rounded border p-2"
            />
            <select
              value={status}
              onChange={e => setStatus(e.target.value as TodoStatus)}
              className="flex-1 rounded border p-2"
            >
              <option value="TODO">TODO</option>
              <option value="PROGRESS">PROGRESS</option>
              <option value="DONE">DONE</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => onOpenChange(false)}
              className="rounded bg-gray-200 p-2 hover:bg-gray-300"
              aria-label="cancel"
            >
              <Cross2Icon />
            </button>
            <button
              onClick={handleSave}
              className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
            >
              저장
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default TodoModal;
