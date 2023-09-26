import { api } from './api';

export async function getOperacoes() {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get('/operacoes', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
};

export async function getOperacao(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/operacoes/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
};

export async function deleteOperacao(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.delete(`/operacao/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
};

export async function createOperacao(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/operacao', {
        nome: data.nomeOperacao,
        custo: data.custo,
        nAgentes: data.nAgentes,
        qtdVeiculos: data.qtdVeiculos,
        cidade: data.cidade,
        data: data.data,
        duracao: data.duracao,
        comandante: data.comandante
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
};

export async function updateOperacao(data){
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/operacao/${data.id}`, {
        nome: data.nomeOperacao,
        undadeMedida: data.cidade
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}
