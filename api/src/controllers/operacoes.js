const { HttpHelper } = require('../utils/http-helper');
const { OperacoesModel } = require('../models/operacoes-model');
const { Validates } = require('../utils/validates');

class OperacoesController {
    async create(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const {
                nome,
                custo,
                nAgentes,
                qtdVeiculos,
                cidade,
                data,
                duracao,
                comandante
            } = request.body;
            if (
                !nome,
                !custo,
                !nAgentes,
                !qtdVeiculos,
                !cidade,
                !data,
                !duracao,
                !comandante
                ) return httpHelper.badRequest('Parâmetros inválidos!');
            const operacao = await OperacoesModel.create({
                nome,
                custo,
                nAgentes,
                qtdVeiculos,
                cidade,
                data,
                duracao,
                comandante
            });
            return httpHelper.created(operacao);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getAll(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const operacao = await OperacoesModel.findAll();
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
            const operacao = await OperacoesModel.findOne(
                { where:{ id } }
            );
            if(!operacao) return httpHelper.notFound('Operacão não encontrada!');
            return httpHelper.ok(operacao.toJSON())
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async delete(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const operacaoExists = await OperacoesModel.findOne({ where: { id } });
            if (!operacaoExists) return httpHelper.notFound('Operacão não encontrada!');
            await OperacoesModel.destroy({ where: { id } });
            return httpHelper.ok({
                message: 'Operação deletada com sucesso!'
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
                nome,
                custo,
                nAgentes,
                qtdVeiculos,
                cidade,
                data,
                duracao,
                comandante
             } = request.body;
            if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
            const operacaoExists = await OperacoesModel.findByPk(id);
            if (!operacaoExists) return httpHelper.notFound('Operação não encontrada!');
            await OperacoesModel.update({
                nome,
                custo,
                nAgentes,
                qtdVeiculos,
                cidade,
                data,
                duracao,
                comandante
            }, {
                where: { id }
            });
            return httpHelper.ok({
                message: 'Operação atualizada com sucesso!'
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = { OperacoesController };
