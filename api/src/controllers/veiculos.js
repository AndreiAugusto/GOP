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
}

module.exports = { VeiculosController };
