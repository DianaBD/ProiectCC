const Router = require('express')();

const RecipesController = require('../Recipes/controllers.js');

Router.use('/recipes', RecipesController);

module.exports = Router;
