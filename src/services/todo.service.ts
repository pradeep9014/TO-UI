import api from './api';
import type {
  CreateTodoDto,
  UpdateTodoDto,
  TodoQueryParams,
  TodoListResponse,
  TodoDetailResponse,
  DashboardStats,
  Todo,
} from '../types/todo.types';

export const todoService = {
  async getAll(params?: TodoQueryParams): Promise<TodoListResponse> {
    const { data } = await api.get<TodoListResponse>('/tasks', { params });
    return data;
  },

  async getById(id: string): Promise<TodoDetailResponse> {
    const { data } = await api.get<TodoDetailResponse>(`/tasks/${id}`);
    return data;
  },

  async create(dto: CreateTodoDto): Promise<Todo> {
    const { data } = await api.post<Todo>('/tasks', dto);
    return data;
  },

  async update(id: string, dto: UpdateTodoDto): Promise<{ message: string }> {
    const { data } = await api.patch<{ message: string }>(`/tasks/${id}`, dto);
    return data;
  },

  async delete(id: string): Promise<{ message: string }> {
    const { data } = await api.delete<{ message: string }>(`/tasks/${id}`);
    return data;
  },

  async getStats(): Promise<DashboardStats> {
    const { data } = await api.get<DashboardStats>('/tasks/dashboard/stats');
    return data;
  },
};
