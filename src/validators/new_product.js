const { Joi, validator } = require('./validator');

module.exports = async product => {
  const schema = {
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    pictures: Joi.array()
      .items(Joi.string())
      .required()
  };

  return await validator(schema, product);
};
