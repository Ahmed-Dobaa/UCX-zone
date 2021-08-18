'use strict';

const Joi = require('joi');

module.exports = {
  createSchema: {
    payload: {
      code: Joi.string().max(50).required(),
      name: Joi.string().max(50).required()
    }
  },
  translateSchema: {
    params: { id: Joi.number().required().description('the id of country'), },
    payload: {
      name: Joi.string().max(50)
    }
  },
  updateSchema: {
    params: { id: Joi.number().required().description('the id of country'), },
    payload: {
      code: Joi.string().max(50),
      name: Joi.string().max(50)
    }
  }
};
