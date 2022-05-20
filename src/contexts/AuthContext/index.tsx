import { useState, createContext } from "react";
import { IAuthContext, IAuthProvider, IContextUser } from "./types";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import SessionService from "../../services/session.service";

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<IContextUser>({} as IContextUser);

  const signOut = () => {
    setToken(null);
    setUser({ id: null, name: null });

    localStorage.removeItem("userToken");
  }

  const signIn = async (email: string, password: string) => {
    try {
      const data = await SessionService.login(email, password);

      const { token, user } = data;

      setToken(token);
      setUser({ id: user.id, name: user.name });

      localStorage.setItem("userToken", token);
      return token;
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || 'Ocorreu um erro ao realizar login!');
      }
    }
  }

  return (
    <AuthContext.Provider value={{
      token,
      user,
      signIn,
      signOut,
      signed: !!token
    }}>
      {children}
    </AuthContext.Provider>
  )
}