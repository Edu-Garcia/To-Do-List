import api from './api';
import { IUser } from '../interfaces/IUser';

class UserService {
  static async getUser(): Promise<IUser> {
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
    userid: string,
    name: string,
    email: string,
    password: string
  ): Promise<{ data: string, status: number }> {

    const response = await api.put(`/users/${userid}`, {
      name,
      email,
      password,
    });
    return response;
  }

  static async delete(userid: string): Promise<{ data: string, status: number }> {

    const { data, status } = await api.delete(`/users/${userid}`);
    return { data, status };
  }
}

export default UserService;