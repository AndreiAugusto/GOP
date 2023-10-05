const { HttpHelper } = require('../utils/http-helper');
const { VeiculoModel } = require('../models/veiculos-model');
const { OperacoesModel } = require('../models/operacoes-model');
const { OperacaoVeiculoModel } = require('../models/operacao-veiculo-model');

class VeiculosController {
    async create(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { tipoVeiculo } = request.body;
            if (!tipoVeiculo) return httpHelper.badRequest('Parâmetros inválidos!');
            const veiculo = await VeiculoModel.create({tipoVeiculo});
            const veiculoId = veiculo.id;
            const operacoes = await OperacoesModel.findAll();
            for(const operacao of operacoes){
                await OperacaoVeiculoModel.create({
                    operacaoId: operacao.id,
                    veiculoId: veiculoId,
                    quantidade: 0
                })
            }
            return httpHelper.created(veiculo);
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
            const operacao = await VeiculoModel.findAll({
                order: ordenacaoOpcoes
            });
            return httpHelper.ok(operacao);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }


    async getOne(request, response){
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const veiculo = await VeiculoModel.findOne(
                { where:{ id } }
            );
            if(!veiculo) return httpHelper.notFound('Veículos não encontrados!');
            return httpHelper.ok(veiculo.toJSON())
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async delete(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const veiculoExists = await VeiculoModel.findOne({ where: { id } });
            if (!veiculoExists) return httpHelper.notFound('Veiculos não encontrados!');
            await VeiculoModel.destroy({ where: { id } });
            return httpHelper.ok({
                message: 'Veiculo deletado com sucesso!'
            })
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async update(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            const { tipoVeiculo } = request.body;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const veiculoExists = await VeiculoModel.findByPk(id);
            if (!veiculoExists) return httpHelper.notFound('Veiculos não encontrados!');
            await VeiculoModel.update({ tipoVeiculo }, {
                where: { id }
            });
            return httpHelper.ok({
                message: 'Veiculos atualizados com sucesso!'
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

}

module.exports = { VeiculosController };
