const { Router, request } = require('express');

const { OperacoesController } = require('./controllers/operacoes');
const { UsuarioController } = require('./controllers/usuario');
const { authMiddleware } = require('./middleware/auth-middleware');

const routes = Router();

const operacoesController = new OperacoesController();
const usuarioController = new UsuarioController();

routes.post('/operacao', authMiddleware, operacoesController.create);
routes.get('/operacoes', authMiddleware, operacoesController.getAll);
routes.get('/operacoes/:id', authMiddleware, operacoesController.getOne);
routes.delete('/operacao/:id', authMiddleware, operacoesController.delete);
routes.put('/operacao/:id', authMiddleware, operacoesController.update);

routes.post('/registrar', usuarioController.registrar);
routes.post('/login', usuarioController.login);

module.exports = { routes };
