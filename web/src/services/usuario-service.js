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


// export async function updateUsuario(data){
//     const accessToken = sessionStorage.getItem('token');
//     const result = await api.put(`/operacao/${data.id}`, {
//         nome: data.nomeOperacao,
//         undadeMedida: data.cidade
//     }, {
//         headers: {
//             'Authorization': `Bearer ${JSON.parse(accessToken)}`
//         }
//     });
//     return result;
// }
