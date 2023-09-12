const { Sequelize } = require('sequelize');
const configDatabase = require('./config');

const { OperacoesModel } = require('../models/operacoes-model');
const { UsuarioModel } = require('../models/usuario-model');
const { VeiculoModel } = require('../models/veiculos-model');

const database = new Sequelize(configDatabase);

OperacoesModel.init(database);
UsuarioModel.init(database);
VeiculoModel.init(database);

module.exports = database;
