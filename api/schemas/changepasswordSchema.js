const Joi = require('joi');

module.exports = {
  payload: {
    password: Joi.string().min(6).max(20).required(),
    confirmationPassword: Joi.string().required().valid(Joi.ref('password')).options({ language: { any: { allowOnly: '!!Passwords do not match', } } }),
    logout: Joi.boolean().required()
  }
};
