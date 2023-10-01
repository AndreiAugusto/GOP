const { Router, request } = require('express');

const { OperacoesController } = require('../controllers/operacoes');
const { authMiddleware } = require('../middleware/auth-middleware');

const routesDashboard = Router();
const operacoesController = new OperacoesController();

routesDashboard.get('/countOperacoes', authMiddleware, operacoesController.countOperacoes);
routesDashboard.get('/somaCustoOperacoes', authMiddleware, operacoesController.somaCustoOperacoes);
routesDashboard.get('/somaVeiculosOperacoes', authMiddleware, operacoesController.somaVeiculos);
routesDashboard.get('/somaAgentesOperacoes', authMiddleware, operacoesController.somaAgentesOperacoes);

module.exports = { routesDashboard };
