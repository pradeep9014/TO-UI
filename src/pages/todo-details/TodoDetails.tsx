import { useState, useEffect, useCallback } from 'react';
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Calendar,
  Clock,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import ThemeToggle from '../../components/layout/ThemeToggle';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import TodoForm from '../../components/todos/TodoForm';
import StatusBadge from '../../components/todos/StatusBadge';
import PriorityBadge from '../../components/todos/PriorityBadge';
import Loader from '../../components/common/Loader';
import { todoService } from '../../services/todo.service';
import { useAuth } from '../../hooks/useAuth';
import { APP_NAME } from '../../utils/constants';
import type {
  Todo,
  TodoStatus,
  TodoPriority,
  UpdateTodoDto,
} from '../../types/todo.types';
import { STATUS_LABELS, PRIORITY_LABELS } from '../../types/todo.types';
import { CheckSquare, LogOut } from 'lucide-react';

export default function TodoDetails() {
  const { user, logout } = useAuth();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modals
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const todoId = new URLSearchParams(window.location.search).get('id');

  const fetchTodo = useCallback(async () => {
    if (!todoId) {
      setError('No task ID provided. Please go back to the dashboard.');
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const res = await todoService.getById(todoId);
      setTodo(res.task);
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const status = (err as { response?: { status?: number } }).response?.status;
        if (status === 404) {
          setError('Task not found. It may have been deleted.');
        } else if (status === 401) {
          setError('Unauthorized. Please sign in again.');
        } else {
          setError('Failed to load task details. Please try again.');
        }
      } else {
        setError('Failed to load task details. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [todoId]);

  useEffect(() => {
    fetchTodo();
  }, [fetchTodo]);

  const handleUpdate = async (formData: { title: string; description?: string; priority?: TodoPriority; status?: TodoStatus }) => {
    if (!todo) return;
    setIsSubmitting(true);
    try {
      const updateDto: UpdateTodoDto = {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        priority: formData.priority,
      };
      await todoService.update(todo.id, updateDto);
      toast.success('Task updated!');
      setIsEditModalOpen(false);
      fetchTodo();
    } catch {
      toast.error('Failed to update task.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!todo) return;
    setIsDeleting(true);
    try {
      await todoService.delete(todo.id);
      toast.success('Task deleted successfully.');
      setIsDeleteDialogOpen(false);
      setTimeout(() => {
        window.location.href = '/index.html';
      }, 500);
    } catch {
      toast.error('Failed to delete task.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStatusChange = async (status: TodoStatus) => {
    if (!todo) return;
    try {
      await todoService.update(todo.id, { status });
      toast.success('Status updated!');
      fetchTodo();
    } catch {
      toast.error('Failed to update status.');
    }
  };

  const handlePriorityChange = async (priority: TodoPriority) => {
    if (!todo) return;
    try {
      await todoService.update(todo.id, { priority });
      toast.success('Priority updated!');
      fetchTodo();
    } catch {
      toast.error('Failed to update priority.');
    }
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950">
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'text-sm',
          style: { background: '#1e293b', color: '#f1f5f9' },
        }}
      />

      {/* Top bar */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-surface-200 bg-white/80 backdrop-blur-md px-4 lg:px-6 dark:bg-surface-900/80 dark:border-surface-800">
        <div className="flex items-center gap-3">
          <a href="/index.html" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
              <CheckSquare className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold text-surface-900 dark:text-white hidden sm:inline">
              {APP_NAME}
            </span>
          </a>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden sm:flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-surface-700 dark:text-surface-300">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-semibold text-sm dark:bg-primary-900/40 dark:text-primary-300">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <span className="font-medium max-w-[120px] truncate">
              {user?.name || user?.username || 'User'}
            </span>
          </div>
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-surface-600 hover:bg-red-50 hover:text-red-600 transition-colors dark:text-surface-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl p-4 lg:p-8">
        {/* Back link */}
        <a
          href="/index.html"
          className="inline-flex items-center gap-2 text-sm font-medium text-surface-500 hover:text-primary-600 transition-colors mb-6 dark:text-surface-400 dark:hover:text-primary-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </a>

        {isLoading ? (
          <Loader text="Loading task details..." />
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center dark:bg-red-900/20 dark:border-red-900/50">
            <AlertCircle className="mx-auto h-10 w-10 text-red-500 dark:text-red-400" />
            <p className="mt-3 text-sm font-medium text-red-700 dark:text-red-300">
              {error}
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                icon={<ArrowLeft className="h-4 w-4" />}
                onClick={() => (window.location.href = '/index.html')}
              >
                Dashboard
              </Button>
              {todoId && (
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<RefreshCw className="h-4 w-4" />}
                  onClick={fetchTodo}
                >
                  Retry
                </Button>
              )}
            </div>
          </div>
        ) : todo ? (
          <div className="rounded-xl border border-surface-200 bg-white shadow-sm dark:bg-surface-800 dark:border-surface-700">
            {/* Task header */}
            <div className="border-b border-surface-200 p-6 dark:border-surface-700">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
                    {todo.title}
                  </h1>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <StatusBadge status={todo.status} />
                    <PriorityBadge priority={todo.priority} />
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={<Pencil className="h-4 w-4" />}
                    onClick={() => setIsEditModalOpen(true)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    icon={<Trash2 className="h-4 w-4" />}
                    onClick={() => setIsDeleteDialogOpen(true)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="border-b border-surface-200 p-6 dark:border-surface-700">
              <h2 className="text-sm font-semibold text-surface-500 uppercase tracking-wider dark:text-surface-400">
                Description
              </h2>
              <p className="mt-2 text-surface-700 dark:text-surface-300 whitespace-pre-wrap">
                {todo.description || 'No description provided.'}
              </p>
            </div>

            {/* Quick actions */}
            <div className="border-b border-surface-200 p-6 dark:border-surface-700">
              <h2 className="text-sm font-semibold text-surface-500 uppercase tracking-wider mb-3 dark:text-surface-400">
                Quick Update
              </h2>
              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="block text-xs font-medium text-surface-500 dark:text-surface-400 mb-1">
                    Status
                  </label>
                  <select
                    value={todo.status}
                    onChange={(e) => handleStatusChange(e.target.value as TodoStatus)}
                    className="rounded-lg border border-surface-300 bg-white px-3 py-2 text-sm text-surface-700 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:bg-surface-700 dark:border-surface-600 dark:text-surface-200"
                  >
                    {Object.entries(STATUS_LABELS).map(([val, lab]) => (
                      <option key={val} value={val}>{lab}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-surface-500 dark:text-surface-400 mb-1">
                    Priority
                  </label>
                  <select
                    value={todo.priority}
                    onChange={(e) => handlePriorityChange(e.target.value as TodoPriority)}
                    className="rounded-lg border border-surface-300 bg-white px-3 py-2 text-sm text-surface-700 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:bg-surface-700 dark:border-surface-600 dark:text-surface-200"
                  >
                    {Object.entries(PRIORITY_LABELS).map(([val, lab]) => (
                      <option key={val} value={val}>{lab}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Metadata */}
            <div className="p-6">
              <h2 className="text-sm font-semibold text-surface-500 uppercase tracking-wider mb-3 dark:text-surface-400">
                Details
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-surface-400" />
                  <div>
                    <p className="text-xs text-surface-400 dark:text-surface-500">Created</p>
                    <p className="text-surface-700 dark:text-surface-300">
                      {formatDate(todo.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-surface-400" />
                  <div>
                    <p className="text-xs text-surface-400 dark:text-surface-500">Last Updated</p>
                    <p className="text-surface-700 dark:text-surface-300">
                      {formatDate(todo.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Edit modal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Task"
        >
          <TodoForm
            todo={todo}
            onSubmit={handleUpdate}
            onCancel={() => setIsEditModalOpen(false)}
            isLoading={isSubmitting}
          />
        </Modal>

        {/* Delete confirmation */}
        <ConfirmDialog
          isOpen={isDeleteDialogOpen}
          title="Delete Task"
          message={`Are you sure you want to delete "${todo?.title}"? This action cannot be undone.`}
          confirmLabel="Delete"
          onConfirm={handleDelete}
          onCancel={() => setIsDeleteDialogOpen(false)}
          isLoading={isDeleting}
        />
      </main>
    </div>
  );
}
