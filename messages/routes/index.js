const Router = require('express')();

const MessagesController = require('../Messages/controllers.js');

Router.use('/messages', MessagesController);

module.exports = Router;
