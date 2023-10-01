const { Router, request } = require('express');

const { VeiculosController } = require('../controllers/veiculos');
const { authMiddleware } = require('../middleware/auth-middleware');

const routesVeiculo = Router();
const veiculosController = new VeiculosController();

routesVeiculo.post('/create/veiculo', authMiddleware, veiculosController.create);
routesVeiculo.get('/operacao/veiculos', authMiddleware, veiculosController.getAll);
routesVeiculo.get('/operacao/veiculo/:id', authMiddleware, veiculosController.getOne);
routesVeiculo.delete('/operacao/veiculo/:id', authMiddleware, veiculosController.delete);
routesVeiculo.put('/operacao/veiculo/:id', authMiddleware, veiculosController.update);

module.exports = { routesVeiculo };
