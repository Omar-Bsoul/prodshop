const express = require('express');

module.exports = () => {
  const router = express.Router();

  const users = require('./users');
  const login = require('./login');
  const departments = require('./departments');
  const products = require('./products');

  router.use('/users', users());
  router.use('/login', login());
  router.use('/departments', departments());
  router.use('/products', products());

  return router;
};
