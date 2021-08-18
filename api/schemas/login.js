const Joi = require('joi');

module.exports = {
  payload: {
    email: Joi.string().required().email({ minDomainAtoms: 2 }),
    password: Joi.string().required(),
    stayLoggedIn: Joi.boolean().default(false),
    signature: Joi.string().optional()
  }
};
