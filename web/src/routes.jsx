import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AuthContextProvider } from "./contexts/AuthContext";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Foods } from "./pages/Foods";
import { Dashboard } from "./pages/Dashboard";

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
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/foods" element={
                        <PrivateRoute>
                                <Foods />
                        </PrivateRoute>
                    } />
                </Routes>
            </AuthContextProvider>
        </BrowserRouter>
    )
};
