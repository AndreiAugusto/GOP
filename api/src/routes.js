const { Router, request } = require('express');

const { FoodController } = require('./controllers/food');
const { UserController } = require('./controllers/user');
const { authMiddleware } = require('./middleware/auth-middleware');

const routes = Router();

const foodController = new FoodController();
const userController = new UserController();

routes.post('/food', authMiddleware, foodController.create);
routes.get('/foods', authMiddleware, foodController.getAll);
routes.delete('/food/:id', authMiddleware, foodController.delete);
routes.put('/food/:id', authMiddleware, foodController.update);

routes.post('/register', userController.register);
routes.post('/login', userController.login);

module.exports = { routes };
