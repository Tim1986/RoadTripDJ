const apiControllers = require('express').Router();

apiControllers.use('/users', require('./usersController'));
apiControllers.use('/test', require('./test'));
apiControllers.use('/secrets', require('./secretsController'));

module.exports = apiControllers;
