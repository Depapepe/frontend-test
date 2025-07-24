import { useEffect, useState } from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Dialog } from 'radix-ui';
import type { ChecklistItem, TodoStatus } from '../types/Todo';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Select } from './ui/Select';
import { Button } from './ui/Button';

interface TodoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: {
    title: string;
    detail: string;
    dueDate: string;
    status: TodoStatus;
    checklist: ChecklistItem[];
  }) => void;
  initialTodo?: {
    title?: string;
    detail?: string;
    dueDate?: string;
    status?: TodoStatus;
    checklist?: ChecklistItem[];
  };
}

const TodoModal = ({
  open,
  onOpenChange,
  onSave,
  initialTodo,
}: TodoModalProps) => {
  const [title, setTitle] = useState(initialTodo?.title ?? "");
  const [detail, setDetail] = useState(initialTodo?.detail ?? "");
  const [dueDate, setDueDate] = useState(initialTodo?.dueDate ?? "");
  const [status, setStatus] = useState<TodoStatus>(
    initialTodo?.status ?? "TODO",
  );
  const [checklist, setChecklist] = useState<ChecklistItem[]>(
    initialTodo?.checklist ?? [],
  );
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    if (open) {
      setTitle(initialTodo?.title ?? "");
      setDetail(initialTodo?.detail ?? "");
      setDueDate(initialTodo?.dueDate ?? "");
      setStatus(initialTodo?.status ?? "TODO");
      setChecklist(initialTodo?.checklist ?? []);
      setEditingId(null);
    }
  }, [initialTodo, open]);

  const handleSave = () => {
    if (title.trim()) {
      onSave({
        title: title.trim(),
        detail: detail.trim(),
        dueDate,
        status,
        checklist,
      });
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-96 -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background p-4 shadow-2xl">
          <Dialog.Title className="mb-2 text-lg font-bold">Todo</Dialog.Title>
          <div className="mb-2">
            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
          </div>
          <div className="mb-2">
            <Textarea value={detail} onChange={e => setDetail(e.target.value)} placeholder="Detail" />
          </div>
          <div className="mb-2 space-y-1">
            <div className="text-sm font-medium">
              {checklist.filter((c) => c.done).length}/{checklist.length}
            </div>
            {checklist.map((item) => {
              return (
                <div key={item.id} className="group flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={(e) =>
                      setChecklist((prev) =>
                        prev.map((ci) =>
                          ci.id === item.id
                            ? { ...ci, done: e.target.checked }
                            : ci,
                        ),
                      )
                    }
                  />
                  {editingId === item.id ? (
                    <Input
                      autoFocus
                      value={item.text}
                      onChange={e =>
                        setChecklist(prev =>
                          prev.map(ci =>
                            ci.id === item.id ? { ...ci, text: e.target.value } : ci,
                          ),
                        )
                      }
                      onBlur={() => setEditingId(null)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          setEditingId(null);
                        }
                      }}
                      className="flex-1 p-1"
                    />
                  ) : (
                    <span
                      onDoubleClick={(e) => {
                        e.preventDefault();
                        setEditingId(item.id);
                      }}
                      className={`flex-1 touch-manipulation ${
                        item.done ? "line-through text-muted-foreground" : ""
                      }`}
                    >
                      {item.text || "새 항목"}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      setChecklist((prev) => prev.filter((ci) => ci.id !== item.id))
                    }
                    className="ml-auto invisible text-muted-foreground hover:text-destructive group-hover:visible"
                    aria-label="delete checklist item"
                  >
                    <Cross2Icon />
                  </button>
                </div>
              );
            })}
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                setChecklist(prev =>
                  prev.length < 10
                    ? [...prev, { id: Date.now(), text: '', done: false }]
                    : prev,
                )
              }
              disabled={checklist.length >= 10}
              className="px-2 py-1 text-sm"
            >
              +
            </Button>
          </div>
          <div className="mb-2 flex gap-2">
            <Input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className="flex-1"
            />
            <Select
              value={status}
              onChange={e => setStatus(e.target.value as TodoStatus)}
              className="flex-1"
            >
              <option value="TODO">TODO</option>
              <option value="PROGRESS">PROGRESS</option>
              <option value="DONE">DONE</option>
            </Select>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => onOpenChange(false)}
              className="p-2"
              aria-label="cancel"
            >
              <Cross2Icon />
            </Button>
            <Button onClick={handleSave} className="px-3 py-1">
              저장
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default TodoModal;
