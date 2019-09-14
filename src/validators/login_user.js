const { Joi, validator } = require('./validator');

module.exports = async user => {
  const schema = {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  };

  return await validator(schema, user);
};
