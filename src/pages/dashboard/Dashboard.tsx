import { useState, useEffect, useCallback } from 'react';
import { Plus, AlertCircle, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import MainLayout from '../../components/layout/MainLayout';
import TodoStats, { StatsSkeletons } from '../../components/todos/TodoStats';
import TodoFilters from '../../components/todos/TodoFilters';
import TodoCard from '../../components/todos/TodoCard';
import { TodoListSkeleton } from '../../components/todos/TodoSkeletons';
import Modal from '../../components/common/Modal';
import TodoForm from '../../components/todos/TodoForm';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import EmptyState from '../../components/common/EmptyState';
import Button from '../../components/common/Button';
import { todoService } from '../../services/todo.service';
import type {
  Todo,
  TodoStatus,
  TodoPriority,
  DashboardStats,
  CreateTodoDto,
  UpdateTodoDto,
} from '../../types/todo.types';
import type { SidebarFilter } from '../../components/layout/Sidebar';

export default function Dashboard() {
  // Data state
  const [todos, setTodos] = useState<Todo[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 12 });

  // Loading / error states
  const [isLoadingTodos, setIsLoadingTodos] = useState(true);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [todosError, setTodosError] = useState<string | null>(null);

  // Filter state
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<TodoStatus | ''>('');
  const [priorityFilter, setPriorityFilter] = useState<TodoPriority | ''>('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC');

  // Modal state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete confirm
  const [deletingTodo, setDeletingTodo] = useState<Todo | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Sidebar filter synchronization
  const [sidebarFilter, setSidebarFilter] = useState<SidebarFilter>('all');

  const fetchTodos = useCallback(async () => {
    setIsLoadingTodos(true);
    setTodosError(null);
    try {
      const effectiveStatus = sidebarFilter !== 'all' ? sidebarFilter : statusFilter || undefined;
      const res = await todoService.getAll({
        search: search || undefined,
        status: effectiveStatus as TodoStatus | undefined,
        priority: priorityFilter || undefined,
        sortBy: sortBy as CreateTodoDto extends unknown ? 'createdAt' | 'updatedAt' | 'title' | 'priority' | 'status' : never,
        sortOrder,
        page: pagination.page,
        limit: pagination.limit,
      });
      setTodos(res.data);
      setPagination(res.pagination);
    } catch {
      setTodosError('Failed to load tasks. Please try again.');
    } finally {
      setIsLoadingTodos(false);
    }
  }, [search, statusFilter, priorityFilter, sortBy, sortOrder, sidebarFilter, pagination.page, pagination.limit]);

  const fetchStats = useCallback(async () => {
    setIsLoadingStats(true);
    try {
      const data = await todoService.getStats();
      setStats(data);
    } catch {
      // Stats are non-critical; fail silently
    } finally {
      setIsLoadingStats(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Debounced search
  const [searchInput, setSearchInput] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPagination((prev) => ({ ...prev, page: 1 }));
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Handlers
  const handleCreateOrUpdate = async (formData: { title: string; description?: string; priority?: TodoPriority; status?: TodoStatus }) => {
    setIsSubmitting(true);
    try {
      if (editingTodo) {
        const updateDto: UpdateTodoDto = {
          title: formData.title,
          description: formData.description,
          status: formData.status,
          priority: formData.priority,
        };
        await todoService.update(editingTodo.id, updateDto);
        toast.success('Task updated!');
      } else {
        const createDto: CreateTodoDto = {
          title: formData.title,
          description: formData.description,
          priority: formData.priority,
        };
        await todoService.create(createDto);
        toast.success('Task created!');
      }
      setIsFormModalOpen(false);
      setEditingTodo(null);
      fetchTodos();
      fetchStats();
    } catch {
      toast.error(editingTodo ? 'Failed to update task.' : 'Failed to create task.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingTodo) return;
    setIsDeleting(true);
    try {
      await todoService.delete(deletingTodo.id);
      toast.success('Task deleted successfully.');
      setDeletingTodo(null);
      fetchTodos();
      fetchStats();
    } catch {
      toast.error('Failed to delete task.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStatusChange = async (todo: Todo, status: TodoStatus) => {
    try {
      await todoService.update(todo.id, { status });
      toast.success('Status updated!');
      fetchTodos();
      fetchStats();
    } catch {
      toast.error('Failed to update status.');
    }
  };

  const handlePriorityChange = async (todo: Todo, priority: TodoPriority) => {
    try {
      await todoService.update(todo.id, { priority });
      toast.success('Priority updated!');
      fetchTodos();
      fetchStats();
    } catch {
      toast.error('Failed to update priority.');
    }
  };

  const openCreate = () => {
    setEditingTodo(null);
    setIsFormModalOpen(true);
  };

  const openEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setIsFormModalOpen(true);
  };

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return (
    <MainLayout>
      {({ sidebarFilter: sf }) => {
        // Synchronize sidebar filter into state if changed
        if (sf !== sidebarFilter) {
          // Using a timeout to avoid setState-during-render
          setTimeout(() => {
            setSidebarFilter(sf);
            setPagination((prev) => ({ ...prev, page: 1 }));
          }, 0);
        }

        return (
          <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
                  Dashboard
                </h1>
                <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
                  Manage and track your tasks
                </p>
              </div>
              <Button icon={<Plus className="h-4 w-4" />} onClick={openCreate}>
                New Task
              </Button>
            </div>

            {/* Stats */}
            {isLoadingStats ? (
              <StatsSkeletons />
            ) : stats ? (
              <TodoStats
                stats={{
                  total: stats.total,
                  pending: stats.status.pending,
                  inProgress: stats.status.inProgress,
                  completed: stats.status.completed,
                }}
              />
            ) : null}

            {/* Filters */}
            <TodoFilters
              search={searchInput}
              onSearchChange={setSearchInput}
              statusFilter={sidebarFilter !== 'all' ? sidebarFilter : statusFilter}
              onStatusFilterChange={(val) => {
                setStatusFilter(val);
                setSidebarFilter('all');
                setPagination((prev) => ({ ...prev, page: 1 }));
              }}
              priorityFilter={priorityFilter}
              onPriorityFilterChange={(val) => {
                setPriorityFilter(val);
                setPagination((prev) => ({ ...prev, page: 1 }));
              }}
              sortBy={sortBy}
              onSortByChange={(val) => setSortBy(val)}
              sortOrder={sortOrder}
              onSortOrderChange={(val) => setSortOrder(val)}
            />

            {/* Todo list */}
            {isLoadingTodos ? (
              <TodoListSkeleton />
            ) : todosError ? (
              <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center dark:bg-red-900/20 dark:border-red-900/50">
                <AlertCircle className="mx-auto h-10 w-10 text-red-500 dark:text-red-400" />
                <p className="mt-3 text-sm font-medium text-red-700 dark:text-red-300">
                  {todosError}
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-4"
                  icon={<RefreshCw className="h-4 w-4" />}
                  onClick={fetchTodos}
                >
                  Retry
                </Button>
              </div>
            ) : todos.length === 0 ? (
              <EmptyState
                title="No tasks found"
                description={
                  search || statusFilter || priorityFilter
                    ? 'Try adjusting your search or filters.'
                    : 'Create your first task to get started.'
                }
                icon={
                  <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                }
                action={
                  !search && !statusFilter && !priorityFilter ? (
                    <Button icon={<Plus className="h-4 w-4" />} onClick={openCreate}>
                      Create Task
                    </Button>
                  ) : undefined
                }
              />
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {todos.map((todo) => (
                    <TodoCard
                      key={todo.id}
                      todo={todo}
                      onEdit={openEdit}
                      onDelete={setDeletingTodo}
                      onStatusChange={handleStatusChange}
                      onPriorityChange={handlePriorityChange}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      disabled={pagination.page <= 1}
                      onClick={() =>
                        setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
                      }
                    >
                      Previous
                    </Button>
                    <span className="px-3 text-sm text-surface-600 dark:text-surface-400">
                      Page {pagination.page} of {totalPages}
                    </span>
                    <Button
                      variant="secondary"
                      size="sm"
                      disabled={pagination.page >= totalPages}
                      onClick={() =>
                        setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
                      }
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}

            {/* Create/Edit Modal */}
            <Modal
              isOpen={isFormModalOpen}
              onClose={() => {
                setIsFormModalOpen(false);
                setEditingTodo(null);
              }}
              title={editingTodo ? 'Edit Task' : 'Create New Task'}
            >
              <TodoForm
                todo={editingTodo}
                onSubmit={handleCreateOrUpdate}
                onCancel={() => {
                  setIsFormModalOpen(false);
                  setEditingTodo(null);
                }}
                isLoading={isSubmitting}
              />
            </Modal>

            {/* Delete confirmation */}
            <ConfirmDialog
              isOpen={!!deletingTodo}
              title="Delete Task"
              message={`Are you sure you want to delete "${deletingTodo?.title}"? This action cannot be undone.`}
              confirmLabel="Delete"
              onConfirm={handleDelete}
              onCancel={() => setDeletingTodo(null)}
              isLoading={isDeleting}
            />
          </div>
        );
      }}
    </MainLayout>
  );
}
