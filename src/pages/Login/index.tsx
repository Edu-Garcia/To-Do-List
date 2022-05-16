import { useState } from "react";
import { Button } from "../../components/Button";
import './styles.scss'

export const Login = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
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