const { Router, request } = require('express');
const { authMiddleware } = require('../middleware/auth-middleware');
const { UsuarioController } = require('../controllers/usuario');

const routesUsuario = Router();

const usuarioController = new UsuarioController();


routesUsuario.post('/registrar', usuarioController.registrar);
routesUsuario.post('/login', usuarioController.login);

routesUsuario.get('/usuarios', authMiddleware, usuarioController.getAll);
routesUsuario.get('/usuario/:id', authMiddleware, usuarioController.getOne);
routesUsuario.put('/editarUsuario/:id', authMiddleware, usuarioController.update);

routesUsuario.get('/aut', authMiddleware, usuarioController.autenticaToken)

module.exports = { routesUsuario };
