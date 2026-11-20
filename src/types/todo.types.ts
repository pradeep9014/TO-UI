export type TodoStatus = 'pending' | 'inprogress' | 'completed';

export type TodoPriority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  title: string;
  description: string | null;
  status: TodoStatus;
  priority: TodoPriority;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface CreateTodoDto {
  title: string;
  description?: string;
  priority?: TodoPriority;
}

export interface UpdateTodoDto {
  title?: string;
  description?: string;
  status?: TodoStatus;
  priority?: TodoPriority;
}

export interface TodoQueryParams {
  status?: TodoStatus;
  priority?: TodoPriority;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'updatedAt' | 'title' | 'priority' | 'status';
  sortOrder?: 'ASC' | 'DESC';
}

export interface TodoListResponse {
  success: boolean;
  data: Todo[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface TodoDetailResponse {
  message: string;
  task: Todo;
}

export interface DashboardStats {
  total: number;
  status: {
    pending: number;
    inProgress: number;
    completed: number;
  };
  priority: {
    high: number;
    medium: number;
    low: number;
  };
}

export const STATUS_LABELS: Record<TodoStatus, string> = {
  pending: 'Pending',
  inprogress: 'In Progress',
  completed: 'Completed',
};

export const PRIORITY_LABELS: Record<TodoPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};
