import type { ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'max-w-lg',
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Dialog */}
      <div
        className={`relative w-full ${maxWidth} rounded-xl bg-white shadow-2xl dark:bg-surface-800 dark:border dark:border-surface-700`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-surface-200 px-6 py-4 dark:border-surface-700">
          <h2 className="text-lg font-semibold text-surface-900 dark:text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-surface-400 hover:bg-surface-100 hover:text-surface-600 transition-colors dark:hover:bg-surface-700 dark:hover:text-surface-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
}
