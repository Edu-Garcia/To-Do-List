import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { isAuthenticated } from './auth';

interface IPrivateRouteProps {
  children: JSX.Element;
  redirectTo: string;
}

const PrivateRoute = ({ children, redirectTo }: IPrivateRouteProps) => {
  return isAuthenticated() ? children : <Navigate to={redirectTo} />;
}

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={
          <PrivateRoute redirectTo="/">
            <Home />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}