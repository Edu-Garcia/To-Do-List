import api from './api';
import { IUser } from '../interfaces/IUser';

class UserService {
  static async getUser(token: string): Promise<IUser> {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
    const { data } = await api.get<IUser>('/users');
    return data;
  }

  static async create(
    name: string,
    email: string,
    password: string,
  ): Promise<IUser> {
    const { data } = await api.post('/users', {
      name,
      email,
      password,
    });
    return data;
  }

  static async update(
    token: string | null,
    userid: string,
    name: string,
    email: string,
    password: string
  ): Promise<{ data: string, status: number }> {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
    const response = await api.put(`/users/${userid}`, {
      name,
      email,
      password,
    });
    return response;
  }

  static async delete(
    token: string | null,
    userid: string
  ): Promise<{ data: string, status: number }> {
    api.defaults.headers.common.Authorization = `Bearer ${token}`
    const { data, status } = await api.delete(`/users/${userid}`);
    return { data, status };
  }
}

export default UserService;