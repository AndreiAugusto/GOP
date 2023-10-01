const { HttpHelper } = require('../utils/http-helper');
const { OperacaoVeiculoModel } = require('../models/operacao-veiculo-model');
const database = require('../database/index')

class OperacaoVeiculoController {
    async create(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const {
                quantidade,
                operacaoId,
                veiculoId
            } = request.body;
            if (
                !operacaoId,
                !veiculoId
            ) return httpHelper.badRequest('Parâmetros inválidos!');
            const opVeiculo = await OperacaoVeiculoModel.create({
                quantidade,
                operacaoId,
                veiculoId
            });
            return httpHelper.created(opVeiculo);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getAll(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const ordenacao = request.query.ordenacao;
            let ordenacaoOpcoes = [['id', 'DESC']];

            if (ordenacao === 'crescente') {
              ordenacaoOpcoes = [['id', 'ASC']];
            } else if (ordenacao === 'decrescente') {
              ordenacaoOpcoes = [['id', 'DESC']];
            }
            const opVeiculo = await OperacaoVeiculoModel.findAll({
                order: ordenacaoOpcoes
            });
            return httpHelper.ok(opVeiculo);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getSomaVeiculos(request, response){
        const httpHelper = new HttpHelper(response);
        try {
            OperacaoVeiculoModel.findAll({
                attributes: [
                    'veiculoId',
                    [database.fn('SUM', database.col('quantidade')), 'soma_quantidade']
                ],
                group: ['veiculoId']
            })
            .then(result => {
                return httpHelper.ok(result);
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

}

module.exports = { OperacaoVeiculoController };
