import { api } from './api';

export async function getOperacaoVeiculo(operacaoId){
    const accessToken = sessionStorage.getItem('token');
    const result = api.get(`/get/operacaoVeiculo/${operacaoId}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function getSomaVeiculos(){
    const accessToken = sessionStorage.getItem('token');
    const result = api.get('/get/soma/veiculos', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function getSomaTotalVeiculos(){
    const accessToken = sessionStorage.getItem('token');
    const result = api.get('/somaTotalVeiculos', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}

export async function getOpVeiculos(ord) {
    const accessToken = sessionStorage.getItem('token');
    let defaut = 'decrescente'
    if(ord) defaut = ord;
    const result = await api.get(`/get/link/veiculos?ordenacao=${defaut}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
};

export async function createOperacaoVeiculo(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/link/veiculo', {
        quantidade: data.quantidade,
        operacaoId: data.operacaoId,
        veiculoId: data.veiculoId
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
};

export async function updateOperacaoVeiculo(id, data){
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/update/operacaoVeiculo/${id}`, {
        quantidade: data.quantidade
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
}
