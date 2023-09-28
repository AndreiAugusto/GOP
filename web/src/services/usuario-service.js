import { api } from './api';

export async function getUsuario(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/usuario/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
};

export async function autenticaOToken() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/aut`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }});
    return result;
};


export async function updateUsuario(data){
    const accessToken = sessionStorage.getItem('token');
    const id = await api.get(`/aut`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }});
    const result = await api.put(`/editarUsuario/${id.data}`,{
        nome: data.nome,
        email: data.email,
        senha: data.senha
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}
