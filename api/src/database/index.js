const { Sequelize } = require('sequelize');
const configDatabase = require('./config');

const database = new Sequelize(configDatabase);

const { OperacoesModel } = require('../models/operacoes-model');
const { UsuarioModel } = require('../models/usuario-model');
const { VeiculoModel } = require('../models/veiculos-model');
const { OperacaoVeiculoModel } = require('../models/operacao-veiculo-model');

OperacoesModel.init(database);
UsuarioModel.init(database);
VeiculoModel.init(database);
OperacaoVeiculoModel.init(database);

OperacoesModel.associate(database.models);
VeiculoModel.associate(database.models);
OperacaoVeiculoModel.associate(database.models);

module.exports = database;
