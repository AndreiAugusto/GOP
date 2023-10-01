const { Router, request } = require('express');

const { authMiddleware } = require('../middleware/auth-middleware');
const { OperacoesController } = require('../controllers/operacoes');

const operacoesController = new OperacoesController();

const routesOperacoes = Router();

routesOperacoes.post('/operacao', authMiddleware, operacoesController.create);
routesOperacoes.get('/operacoes', authMiddleware, operacoesController.getAll);
routesOperacoes.get('/operacoes/:id', authMiddleware, operacoesController.getOne);
routesOperacoes.delete('/operacao/:id', authMiddleware, operacoesController.delete);
routesOperacoes.put('/operacao/:id', authMiddleware, operacoesController.update);

module.exports = { routesOperacoes };
