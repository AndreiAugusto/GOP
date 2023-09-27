const { HttpHelper } = require("../utils/http-helper");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UsuarioModel } = require('../models/usuario-model');

class UsuarioController {
    async registrar(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { nome, email, senha } = request.body;
            if (!nome || !email || !senha) return httpHelper.badRequest('Nome, e-mail e senha são obrigatórios!');
            const userAlreadyExists = await UsuarioModel.findOne({ where: { email } });
            if (userAlreadyExists) return httpHelper.badRequest('E-mail de usuário já cadastrado!');
            const passwordHashed = await bcrypt.hash(
                senha,
                Number(process.env.SALT)
            );
            const usuario = await UsuarioModel.create({
                nome,
                email,
                senha: passwordHashed,
            });
            if (!usuario) return httpHelper.badRequest('Houve um erro ao criar usuário');
            const accessToken = jwt.sign(
                { id: usuario.id },
                process.env.TOKEN_SECRET,
                { expiresIn: process.env.TOKEN_EXPIRES_IN }
            );
            return httpHelper.created({ accessToken });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async login(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const { email, senha } = request.body;
            if (!email || !senha) return httpHelper.badRequest('E-mail e senha são obrigatórios!');
            const userExists = await UsuarioModel.findOne({ where: { email } });
            if (!userExists) return httpHelper.notFound('Usuário não encontrado!');
            const isPasswordValid = await bcrypt.compare(senha, userExists.senha);
            if (!isPasswordValid) return httpHelper.badRequest('Senha incorreta!');
            const accessToken = jwt.sign(
                { id: userExists.id },
                process.env.TOKEN_SECRET,
                { expiresIn: process.env.TOKEN_EXPIRES_IN }
            );
            return httpHelper.ok({ accessToken });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async update(request,response){
        const httpHelper = new HttpHelper(response);
        try {
            const { id } = request.params;
            const {
                nome,
                email,
                senha
            } = request.body;
            if( !id ) return httpHelper.badRequest('Parâmetros inválidos!');
            await UsuarioModel.update({
                nome,
                email,
                senha
            }, {
                where: { id }
            });
            return httpHelper.ok({
                message: 'Usuário atualizado com sucesso!'
            });
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getAll(request, response) {
        const httpHelper = new HttpHelper(response);
        try {
            const usuario = await UsuarioModel.findAll();
            return httpHelper.ok(usuario);
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }

    async getOne(request, response){
        const httpHelper = new HttpHelper(response);
        try {
            const { email } = request.body;
            if (!email) return httpHelper.badRequest('Parâmetros inválidos!');
            const usuario = await UsuarioModel.findOne(
                { where:{ email } }
            );
            if(!usuario) return httpHelper.notFound('Usuário não encontrado!');
            return httpHelper.ok(usuario.toJSON())
        } catch (error) {
            return httpHelper.internalError(error);
        }
    }
}

module.exports = { UsuarioController };
