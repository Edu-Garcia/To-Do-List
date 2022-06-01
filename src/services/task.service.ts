import api from './api';
import { ITask } from '../interfaces/ITask';

class TaskService {
  static async tasks(token: string | null): Promise<ITask[]> {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const { data } = await api.get<ITask[]>('/tasks');
    return data;
  }

  static async create(token: string | null, title: string, description: string): Promise<ITask> {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const { data } = await api.post('/tasks', { title, description });
    return data;
  }

  static async update(
    token: string | null,
    taskId: string,
    title: string,
    description: string
  ): Promise<{ data: string, status: number }> {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const response = await api.put(`/tasks/${taskId}`, { title, description });
    return response;
  }

  static async complete(token: string | null, taskId: string): Promise<number> {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const { status } = await api.patch(`/tasks/${taskId}`);
    return status;
  }

  static async delete(token: string | null, taskId: string): Promise<{ data: string, status: number }> {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const { data, status } = await api.delete(`/tasks/${taskId}`);
    return { data, status };
  }

  static async deleteAll(token: string | null): Promise<{ data: string, status: number }> {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const { data, status } = await api.delete(`/tasks`);
    return { data, status };
  }
}

export default TaskService;