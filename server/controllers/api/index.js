const apiControllers = require('express').Router();

apiControllers.use('/users', require('./users'));
apiControllers.use('/test', require('./test'));
apiControllers.use('/secrets', require('./secretsController'));

module.exports = apiControllers;
