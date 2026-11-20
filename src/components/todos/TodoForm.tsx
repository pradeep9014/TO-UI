import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../common/Input';
import Textarea from '../common/Textarea';
import Select from '../common/Select';
import Button from '../common/Button';
import type { Todo } from '../../types/todo.types';

const todoSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(150, 'Title must be 150 characters or less'),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  status: z.enum(['pending', 'inprogress', 'completed']).optional(),
});

type TodoFormData = z.infer<typeof todoSchema>;

interface TodoFormProps {
  todo?: Todo | null;
  onSubmit: (data: TodoFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function TodoForm({
  todo,
  onSubmit,
  onCancel,
  isLoading = false,
}: TodoFormProps) {
  const isEditing = !!todo;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: todo?.title || '',
      description: todo?.description || '',
      priority: todo?.priority || 'medium',
      status: todo?.status || 'pending',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Title"
        placeholder="What needs to be done?"
        error={errors.title?.message}
        {...register('title')}
      />

      <Textarea
        label="Description"
        placeholder="Add a description (optional)"
        rows={3}
        error={errors.description?.message}
        {...register('description')}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          label="Priority"
          error={errors.priority?.message}
          options={[
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
          ]}
          {...register('priority')}
        />

        {isEditing && (
          <Select
            label="Status"
            error={errors.status?.message}
            options={[
              { value: 'pending', label: 'Pending' },
              { value: 'inprogress', label: 'In Progress' },
              { value: 'completed', label: 'Completed' },
            ]}
            {...register('status')}
          />
        )}
      </div>

      <div className="flex justify-end gap-3 border-t border-surface-200 pt-4 dark:border-surface-700">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {isEditing ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
}
