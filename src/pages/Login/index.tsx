import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { useAuth } from "../../contexts/AuthContext/useAuth";
import './styles.scss'

export const Login = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { signIn } = useAuth()
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = await signIn(email, password);

    if (token) {
      navigate('/home');
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="form-group">
          <div className="input-container">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Informe seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Informe sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            type="submit"
          // disabled={isLoading}
          >
            {/* {!isLoading ? 'Enviar' : 'Carregando...'} */}
            Entrar
          </Button>
        </div>
        <p className="registerText">
          Não possui conta? <a href="/register">Cadastro</a>
        </p>
      </form>
    </div >
  );
}