const Joi = require('@hapi/joi');

module.exports = {
  Joi,
  validator: async (schema, object) => {
    try {
      return await Joi.validate(object, schema, { abortEarly: false });
    } catch (error) {
      const message = `${error.message}`;
      error.message = message.split('. ');
      throw error;
    }
  }
};
