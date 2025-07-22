import { useEffect, useState } from 'react';
import { Dialog } from 'radix-ui';

interface TodoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (text: string) => void;
  initialText?: string;
}

const TodoModal = ({ open, onOpenChange, onSave, initialText = '' }: TodoModalProps) => {
  const [text, setText] = useState(initialText);

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  const handleSave = () => {
    if (text.trim()) {
      onSave(text.trim());
      setText('');
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-80 -translate-x-1/2 -translate-y-1/2 rounded bg-white p-4 shadow">
          <Dialog.Title className="mb-2 text-lg font-bold">Todo</Dialog.Title>
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            className="mb-4 w-full rounded border p-2"
            placeholder="Enter todo"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => onOpenChange(false)}
              className="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300"
            >
              취소
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
