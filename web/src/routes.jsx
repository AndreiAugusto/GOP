import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AuthContextProvider } from "./contexts/AuthContext";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Perfil } from "./pages/Perfil";
import { Operacoes } from "./pages/Operacoes";
import { PageOperacao } from "./pages/Operacao";

export const isAuthenticated = () => {
    const token = sessionStorage.getItem('token');
    return token !== null;
};

export function PrivateRoute({ children }) {
    if(!isAuthenticated()){
        return <Navigate to='/' replace />
    }
    return children;
};

export function Navigations() {

    return (
        <BrowserRouter>
            <AuthContextProvider>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/perfil" element={
                        <PrivateRoute>
                            <Perfil />
                        </PrivateRoute>
                    } />
                    <Route path="/operacoes" element={
                        <PrivateRoute>
                            <Operacoes />
                        </PrivateRoute>} 
                    />
                    <Route path="/operacao/:id" element={<PageOperacao />} />
                    <Route path="/dashboard" element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    } />
                </Routes>
            </AuthContextProvider>
        </BrowserRouter>
    )
};
