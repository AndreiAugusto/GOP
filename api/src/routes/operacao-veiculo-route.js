const { Router, request } = require('express');

const { OperacaoVeiculoController } = require('../controllers/operacao_veiculo');
const { authMiddleware } = require('../middleware/auth-middleware');

const routesOperacaoVeiculo = Router();
const operacaoVeiculosController = new OperacaoVeiculoController();

routesOperacaoVeiculo.post('/link/veiculo', authMiddleware, operacaoVeiculosController.create);
routesOperacaoVeiculo.get('/get/link/veiculos', authMiddleware, operacaoVeiculosController.getAll);
routesOperacaoVeiculo.get('/get/soma/veiculos', authMiddleware, operacaoVeiculosController.getSomaVeiculos);
routesOperacaoVeiculo.get('/get/operacaoVeiculo/:operacaoId', authMiddleware, operacaoVeiculosController.getOperacaoVeiculo);
routesOperacaoVeiculo.put('/update/operacaoVeiculo/:id', authMiddleware, operacaoVeiculosController.updateOperacaoVeiculo);

module.exports = { routesOperacaoVeiculo };
