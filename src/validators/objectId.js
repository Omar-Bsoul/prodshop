const { Joi } = require('./validator');

module.exports = objectId => {
  return /^[0-9a-fA-F]{24}$/.test(objectId);
};
