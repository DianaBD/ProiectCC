const Router = require('express')();

const UsersController = require('../Users/controllers.js');

Router.use('/users', UsersController);

module.exports = Router;
