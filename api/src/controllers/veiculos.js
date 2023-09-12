const { HttpHelper } = require('../utils/http-helper');
const { VeiculoModel } = require('../models/veiculos-model');
const { Validates } = require('../utils/validates');

class VeiculosController {
    async create(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const {
                operacaoId,
                tipo,
                quantidade
            } = request.body;
            if (
                !operacaoId,
                !tipo,
                !quantidade
                ) return httpHelper.badRequest('Parâmetros inválidos!');
            const operacao = await VeiculoModel.create({
                operacaoId,
                tipo,
                quantidade
            });
            return httpHelper.created(operacao);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getAll(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const operacao = await VeiculoModel.findAll();
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
                message: 'Veiculos deletados com sucesso!'
            })
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async update(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            const {
                operacaoId,
                tipo,
                quantidade
             } = request.body;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const veiculoExists = await VeiculoModel.findByPk(id);
            if (!veiculoExists) return httpHelper.notFound('Veiculos não encontrados!');
            await VeiculoModel.update({
                operacaoId,
                tipo,
                quantidade
            }, {
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
