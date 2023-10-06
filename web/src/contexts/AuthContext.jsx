import { createContext, useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export const AuthContext = createContext(null);

export function AuthContextProvider ({ children }) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const login = async (data) => {
        try {
            setLoading(true);
            const result = await api.post('/login', data);
            sessionStorage.setItem(
                'token',
                JSON.stringify(result.data.accessToken)
            );
            navigate('/dashboard');
        } catch (error) {
            toast.error(`Houve um erro no Login: ${error.response.data.error}`);
        } finally{
            setLoading(false);
        }
    }

    const createUser = async (data) => {
        try {
            setLoading(true);
            const result = await api.post('/registrar', data);
            sessionStorage.setItem(
                'token',
                JSON.stringify(result.data.accessToken)
            );
            navigate('/dashboard')
        } catch (error) {
            toast.error(`Houve um erro ao cadastrar: ${error.response.data.error}`);
        } finally{
            setLoading(false);
        }
    };

    const logout = () =>{
        sessionStorage.removeItem('token');
        navigate('/');
    }

    return(
        <AuthContext.Provider value={
            {login, createUser, logout, loading}
        }>
            {children}
        </AuthContext.Provider>
    )
};
