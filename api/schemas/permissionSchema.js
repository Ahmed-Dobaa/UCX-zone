const Joi = require('joi');

module.exports = {
  createSchema: {
    payload: {
      resource: Joi.string().min(3).max(50).required(),
      action: Joi.string().min(3).max(50).required(),
      attributes: Joi.array().items(Joi.string()),
    }
  },
  updateSchema: {
    payload: {
      resource: Joi.string().min(3).max(50),
      action: Joi.string().min(3).max(50),
      attributes: Joi.array().items(Joi.string()),
    }
  }
};
