import { api } from './api';

export async function getAllVeiculos(ord) {
    const accessToken = sessionStorage.getItem('token');
    let defaut = 'decrescente'
    if(ord) defaut = ord;
    const result = await api.get(`/operacao/veiculos?ordenacao=${defaut}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
};

export async function getVeiculo(id) {
    const accessToken = sessionStorage.getItem('token');
    const result = await api.get(`/operacao/veiculo/${id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
        }
    });
    return result;
};

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
