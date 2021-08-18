const Joi = require('joi');

module.exports = { payload: { email: Joi.string().required().email({ minDomainAtoms: 2 }) } };
