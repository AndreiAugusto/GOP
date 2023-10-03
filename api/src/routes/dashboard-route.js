const { Router, request } = require('express');

const { OperacoesController } = require('../controllers/operacoes');
const { OperacaoVeiculoController } = require('../controllers/operacao_veiculo');
const { authMiddleware } = require('../middleware/auth-middleware');

const routesDashboard = Router();
const operacoesController = new OperacoesController();
const operacaoVeiculosController = new OperacaoVeiculoController()

routesDashboard.get('/countOperacoes', authMiddleware, operacoesController.countOperacoes);
routesDashboard.get('/somaCustoOperacoes', authMiddleware, operacoesController.somaCustoOperacoes);
routesDashboard.get('/somaAgentesOperacoes', authMiddleware, operacoesController.somaAgentesOperacoes);
routesDashboard.get('/somaTotalVeiculos', authMiddleware, operacaoVeiculosController.getSomaTodalVeiculos);

module.exports = { routesDashboard };
