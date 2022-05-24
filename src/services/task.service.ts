import api from './api';
import { ITask } from '../interfaces/ITask';

class TaskService {
  static async tasks(): Promise<ITask[]> {
    const { data } = await api.get<ITask[]>('/tasks');
    return data;
  }

  static async create(title: string, description: string): Promise<ITask> {
    const { data } = await api.post('/tasks', { title, description });
    return data;
  }

  static async update(
    taskId: string,
    title: string,
    description: string
  ): Promise<{ data: string, status: number }> {
    const response = await api.put(`/tasks/${taskId}`, { title, description });
    return response;
  }

  static async complete(taskId: string): Promise<number> {
    const { status } = await api.patch(`/tasks/${taskId}`);
    return status;
  }

  static async delete(taskId: string): Promise<{ data: string, status: number }> {
    const { data, status } = await api.delete(`/tasks/${taskId}`);
    return { data, status };
  }

  static async deleteAll(): Promise<{ data: string, status: number }> {
    const { data, status } = await api.delete(`/tasks`);
    return { data, status };
  }
}

export default TaskService;