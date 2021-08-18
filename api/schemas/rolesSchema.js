const Joi = require('joi');

module.exports = {
  createSchema: {
    payload: {
      name: Joi.string().min(3).max(50).required(),
      description: Joi.string().optional(),
      permissions: Joi.array().items(Joi.number()).unique().optional()
      // category: Joi.string().required(),
    }
  },
  updateSchema: {
    params: { id: Joi.number().required().description('the id of role'), },
    payload: {
      name: Joi.string().min(3).max(50),
      description: Joi.string().optional(),
      permissions: Joi.array().items(Joi.number()).unique().optional(),
    }
  }
};
