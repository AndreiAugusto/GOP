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

export async function updateVeiculo(data){
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

export async function createVeiculo(data) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.post('/operacao/veiculo', {
        tipo: data.tipo,
        quantidade: data.quantidade,
        operacaoId: data.idOperacao,
    }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
};
