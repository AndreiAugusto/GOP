const { Sequelize } = require('sequelize');
const configDatabase = require('./config');

const { FoodModel } = require('../models/food-model');
const { UserModel } = require('../models/user-model');

const database = new Sequelize(configDatabase);

FoodModel.init(database);
UserModel.init(database);

module.exports = database;
