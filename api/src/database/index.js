const { Sequelize } = require('sequelize');
const configDatabase = require('./config');

const { OperacoesModel } = require('../models/operacoes-model');
const { UsuarioModel } = require('../models/usuario-model');

const database = new Sequelize(configDatabase);

OperacoesModel.init(database);
UsuarioModel.init(database);

module.exports = database;
