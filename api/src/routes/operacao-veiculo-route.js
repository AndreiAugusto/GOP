const { Router, request } = require('express');

const { OperacaoVeiculoController } = require('../controllers/operacao_veiculo');
const { authMiddleware } = require('../middleware/auth-middleware');

const routesOperacaoVeiculo = Router();
const operacaoVeiculosController = new OperacaoVeiculoController();

routesOperacaoVeiculo.post('/link/veiculo', authMiddleware, operacaoVeiculosController.create);
routesOperacaoVeiculo.get('/get/link/veiculos', authMiddleware, operacaoVeiculosController.getAll);

module.exports = { routesOperacaoVeiculo };
