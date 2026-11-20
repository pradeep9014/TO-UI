import type { TodoStatus } from '../../types/todo.types';
import { STATUS_LABELS } from '../../types/todo.types';

const statusStyles: Record<TodoStatus, string> = {
  pending:
    'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  inprogress:
    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  completed:
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
};

export default function StatusBadge({ status }: { status: TodoStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
