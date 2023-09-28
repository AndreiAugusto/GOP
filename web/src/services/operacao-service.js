import { api } from './api';

export async function getOperacoes(ord) {
    const accessToken = sessionStorage.getItem('token');
    let defaut = 'decrescente'
    if(ord) defaut = ord;
    const result = await api.get(`/operacoes?ordenacao=${defaut}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
};

export async function countOperacoes(){
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/countOperacoes/`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function somaCustoOperacoes(){
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/somaCustoOperacoes/`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function somaVeiculosOpereacoes(){
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/somaVeiculosOperacoes/`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function somaAgentesOperacoes(){
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/somaAgentesOperacoes/`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

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

export async function updateOperacao(id, data){
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/operacao/${id}`, {
        nome: data.nome,
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
    return result;
}
