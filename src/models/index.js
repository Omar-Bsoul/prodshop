module.exports = () => {
  const User = require('./user');
  const Product = require('./product');
  const Department = require('./department');

  return { User, Product, Department };
};
