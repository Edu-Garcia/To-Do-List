import api from './api';
import { ITask } from '../interfaces/ITask'

class TodoService {
  static async todos(): Promise<ITask[]> {
    const { data } = await api.get<ITask[]>('/todos');
    return data;
  }

  static async create(title: string, description: string): Promise<ITask> {
    const { data } = await api.post('todos', { title, description });
    return data;
  }

  static async update(taskId: string): Promise<number> {
    const { status } = await api.put(`todos/${taskId}`, { complete: true })

    return status
  }

  static async delete(taskId: string): Promise<number> {
    const { status } = await api.delete(`todos/${taskId}`)

    return status
  }
}

export default TodoService;