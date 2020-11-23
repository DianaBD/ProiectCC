const Router = require('express')();

const MessagesController = require('../Messages/controllers.js');
const RecipesController = require('../Recipes/controllers.js');
const UsersController = require('../Users/controllers.js');

Router.use('/messages', MessagesController);
Router.use('/recipes', RecipesController);
Router.use('/users', UsersController);

module.exports = Router;