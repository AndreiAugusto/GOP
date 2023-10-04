const { HttpHelper } = require('../utils/http-helper');
const { OperacaoVeiculoModel } = require('../models/operacao-veiculo-model');
const database = require('../database/index');
const { VeiculoModel } = require('../models/veiculos-model');

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

    async getOperacaoVeiculo(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { operacaoId } = request.params;

            // Consulta no banco de dados usando o Sequelize
            const quantidadeVeiculos = await OperacaoVeiculoModel.findAll({
              where: {
                operacaoId: operacaoId,
              },
              attributes: ['id','veiculoId', 'quantidade'], // Seleciona apenas as colunas que você deseja retornar
              include: [
                {
                  model: VeiculoModel, // Inclui o modelo VeiculoModel para obter informações sobre o veículo
                  attributes: ['tipoVeiculo'], // Seleciona as colunas que deseja retornar do modelo VeiculoModel
                },
              ],
            });

            return httpHelper.ok(quantidadeVeiculos);
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

    async getSomaTodalVeiculos(request, response){
        const httpHelper = new HttpHelper(response);
        try {
            OperacaoVeiculoModel.findAll({
                attributes: [
                    [database.fn('SUM', database.col('quantidade')), 'soma_quantidade']
                ]
            })
            .then(result => {
                return httpHelper.ok(result);
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async updateOperacaoVeiculo(request, response){
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            const { quantidade } = request.body;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            await OperacaoVeiculoModel.update({
                quantidade
            }, {
                where: {id}
            });
            return httpHelper.ok({
                message: 'Operação atualizada com sucesso!'
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

}

module.exports = { OperacaoVeiculoController };
