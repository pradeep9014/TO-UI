import { Search, ArrowUpDown } from 'lucide-react';
import type { TodoPriority, TodoStatus } from '../../types/todo.types';
import { SORT_OPTIONS } from '../../utils/constants';

interface TodoFiltersProps {
  search: string;
  onSearchChange: (val: string) => void;
  statusFilter: TodoStatus | '';
  onStatusFilterChange: (val: TodoStatus | '') => void;
  priorityFilter: TodoPriority | '';
  onPriorityFilterChange: (val: TodoPriority | '') => void;
  sortBy: string;
  onSortByChange: (val: string) => void;
  sortOrder: 'ASC' | 'DESC';
  onSortOrderChange: (val: 'ASC' | 'DESC') => void;
}

export default function TodoFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
}: TodoFiltersProps) {
  return (
    <div className="rounded-xl border border-surface-200 bg-white p-4 dark:bg-surface-800 dark:border-surface-700">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks..."
            className="w-full rounded-lg border border-surface-300 bg-white py-2.5 pl-10 pr-4 text-sm text-surface-900 placeholder-surface-400 transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:bg-surface-800 dark:border-surface-600 dark:text-surface-100 dark:placeholder-surface-500"
          />
        </div>

        {/* Filters row */}
        <div className="flex flex-wrap gap-2">
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value as TodoStatus | '')}
            className="rounded-lg border border-surface-300 bg-white px-3 py-2.5 text-sm text-surface-700 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:bg-surface-800 dark:border-surface-600 dark:text-surface-200"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          {/* Priority filter */}
          <select
            value={priorityFilter}
            onChange={(e) => onPriorityFilterChange(e.target.value as TodoPriority | '')}
            className="rounded-lg border border-surface-300 bg-white px-3 py-2.5 text-sm text-surface-700 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:bg-surface-800 dark:border-surface-600 dark:text-surface-200"
          >
            <option value="">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {/* Sort by */}
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="rounded-lg border border-surface-300 bg-white px-3 py-2.5 text-sm text-surface-700 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:bg-surface-800 dark:border-surface-600 dark:text-surface-200"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Sort order toggle */}
          <button
            onClick={() => onSortOrderChange(sortOrder === 'ASC' ? 'DESC' : 'ASC')}
            className="inline-flex items-center gap-1.5 rounded-lg border border-surface-300 bg-white px-3 py-2.5 text-sm font-medium text-surface-700 hover:bg-surface-50 transition-colors dark:bg-surface-800 dark:border-surface-600 dark:text-surface-200 dark:hover:bg-surface-700"
            title={sortOrder === 'ASC' ? 'Ascending' : 'Descending'}
          >
            <ArrowUpDown className="h-4 w-4" />
            {sortOrder === 'ASC' ? 'Asc' : 'Desc'}
          </button>
        </div>
      </div>
    </div>
  );
}
