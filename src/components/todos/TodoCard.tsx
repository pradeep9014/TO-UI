import {
  Eye,
  Pencil,
  Trash2,
} from 'lucide-react';
import type { Todo, TodoStatus, TodoPriority } from '../../types/todo.types';
import { STATUS_LABELS, PRIORITY_LABELS } from '../../types/todo.types';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';

interface TodoCardProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  onStatusChange: (todo: Todo, status: TodoStatus) => void;
  onPriorityChange: (todo: Todo, priority: TodoPriority) => void;
}

export default function TodoCard({
  todo,
  onEdit,
  onDelete,
  onStatusChange,
  onPriorityChange,
}: TodoCardProps) {
  const createdDate = new Date(todo.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="group rounded-xl border border-surface-200 bg-white p-5 transition-all hover:shadow-md hover:border-surface-300 dark:bg-surface-800 dark:border-surface-700 dark:hover:border-surface-600">
      {/* Top row: title + badges */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <a
            href={`/todo.html?id=${todo.id}`}
            className="text-base font-semibold text-surface-900 hover:text-primary-600 transition-colors line-clamp-1 dark:text-white dark:hover:text-primary-400"
          >
            {todo.title}
          </a>
          {todo.description && (
            <p className="mt-1 text-sm text-surface-500 line-clamp-2 dark:text-surface-400">
              {todo.description}
            </p>
          )}
        </div>
      </div>

      {/* Badges */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <StatusBadge status={todo.status} />
        <PriorityBadge priority={todo.priority} />
        <span className="text-xs text-surface-400 dark:text-surface-500">
          {createdDate}
        </span>
      </div>

      {/* Quick actions row */}
      <div className="mt-4 flex items-center justify-between border-t border-surface-100 pt-3 dark:border-surface-700">
        {/* Quick status update */}
        <div className="flex items-center gap-2">
          <select
            value={todo.status}
            onChange={(e) => onStatusChange(todo, e.target.value as TodoStatus)}
            className="rounded-md border border-surface-200 bg-surface-50 px-2 py-1 text-xs text-surface-600 focus:border-primary-500 focus:outline-none dark:bg-surface-700 dark:border-surface-600 dark:text-surface-300"
          >
            {Object.entries(STATUS_LABELS).map(([val, lab]) => (
              <option key={val} value={val}>
                {lab}
              </option>
            ))}
          </select>
          <select
            value={todo.priority}
            onChange={(e) => onPriorityChange(todo, e.target.value as TodoPriority)}
            className="rounded-md border border-surface-200 bg-surface-50 px-2 py-1 text-xs text-surface-600 focus:border-primary-500 focus:outline-none dark:bg-surface-700 dark:border-surface-600 dark:text-surface-300"
          >
            {Object.entries(PRIORITY_LABELS).map(([val, lab]) => (
              <option key={val} value={val}>
                {lab}
              </option>
            ))}
          </select>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <a
            href={`/todo.html?id=${todo.id}`}
            className="rounded-lg p-2 text-surface-400 hover:bg-surface-100 hover:text-primary-600 transition-colors dark:hover:bg-surface-700 dark:hover:text-primary-400"
            title="View details"
          >
            <Eye className="h-4 w-4" />
          </a>
          <button
            onClick={() => onEdit(todo)}
            className="rounded-lg p-2 text-surface-400 hover:bg-surface-100 hover:text-primary-600 transition-colors dark:hover:bg-surface-700 dark:hover:text-primary-400"
            title="Edit"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(todo)}
            className="rounded-lg p-2 text-surface-400 hover:bg-red-50 hover:text-red-600 transition-colors dark:hover:bg-red-900/20 dark:hover:text-red-400"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
