'use strict';

const Joi = require('joi');

module.exports = {
  createSchema: { payload: { name: Joi.string().min(3).max(50).required() } },
  updateSchema: {
    params: { id: Joi.number().required().description('the id of sector') },
    payload: { name: Joi.string().min(3).max(50) }
  }
};
