const apiControllers = require('express').Router();

apiControllers.use('/users', require('./users'));
apiControllers.use('/secrets', require('./secretsController'));

module.exports = apiControllers;
