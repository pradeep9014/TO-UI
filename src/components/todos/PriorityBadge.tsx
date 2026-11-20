import type { TodoPriority } from '../../types/todo.types';
import { PRIORITY_LABELS } from '../../types/todo.types';

const priorityStyles: Record<TodoPriority, string> = {
  high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  medium:
    'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  low: 'bg-surface-100 text-surface-600 dark:bg-surface-700 dark:text-surface-300',
};

export default function PriorityBadge({
  priority,
}: {
  priority: TodoPriority;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${priorityStyles[priority]}`}
    >
      {PRIORITY_LABELS[priority]}
    </span>
  );
}
