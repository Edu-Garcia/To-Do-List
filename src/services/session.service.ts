import api from './api';
import { IUser } from '../interfaces/IUser';

interface ILoginResponse {
  user: IUser;
  token: string;
}

class SessionService {
  static async login(email: string, password: string): Promise<ILoginResponse> {
    const { data } = await api.post('/sessions', { email, password });
    return data;
  }
}

export default SessionService;