import { useState } from "react";
import { Button } from "../../components/Button";
import './styles.scss'

export const Register = () => {

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(name, email, password, confirmPassword);
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Cadastro</h1>
        <div className="form-group">
          <div className="input-container">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Informe seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="input-container">
            <label htmlFor="password">Confirmar Senha</label>
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              placeholder="Informe novamente sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
          Já possui conta? <a href="/">Login</a>
        </p>
      </form>
    </div >
  );
}