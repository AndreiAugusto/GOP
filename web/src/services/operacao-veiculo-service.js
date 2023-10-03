import { api } from './api';

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

export async function updateOperacaoVeiculo(data){
    const accessToken = sessionStorage.getItem('token');
    const result = await api.put(`/operacao/veiculo/${data.id}`,{
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
