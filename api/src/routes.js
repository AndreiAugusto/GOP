const { Router, request } = require('express');

const { OperacoesController } = require('./controllers/operacoes');
const { UsuarioController } = require('./controllers/usuario');
const { VeiculosController } = require('./controllers/veiculos')
const { authMiddleware } = require('./middleware/auth-middleware');

const routes = Router();

const operacoesController = new OperacoesController();
const usuarioController = new UsuarioController();
const veiculosController = new VeiculosController();

routes.get('/aut', authMiddleware, usuarioController.autenticaToken)

routes.post('/operacao', authMiddleware, operacoesController.create);
routes.get('/operacoes', authMiddleware, operacoesController.getAll);
routes.get('/operacoes/:id', authMiddleware, operacoesController.getOne);
routes.delete('/operacao/:id', authMiddleware, operacoesController.delete);
routes.put('/operacao/:id', authMiddleware, operacoesController.update);
routes.get('/countOperacoes', authMiddleware, operacoesController.countOperacoes);
routes.get('/somaCustoOperacoes', authMiddleware, operacoesController.somaCustoOperacoes);
routes.get('/somaVeiculosOperacoes', authMiddleware, operacoesController.somaVeiculos);
routes.get('/somaAgentesOperacoes', authMiddleware, operacoesController.somaAgentesOperacoes);

routes.post('/registrar', usuarioController.registrar);
routes.post('/login', usuarioController.login);
routes.get('/usuarios', authMiddleware, usuarioController.getAll);
routes.get('/usuario/:id', authMiddleware, usuarioController.getOne);
routes.put('/editarUsuario/:id', authMiddleware, usuarioController.update);

routes.post('/operacao/veiculo', authMiddleware, veiculosController.create);
routes.get('/operacao/veiculos', authMiddleware, veiculosController.getAll);
routes.get('/operacao/veiculo/:id', authMiddleware, veiculosController.getOne);
routes.delete('/operacao/veiculo/:id', authMiddleware, veiculosController.delete);
routes.put('/operacao/veiculo/:id', authMiddleware, veiculosController.update);

module.exports = { routes };
