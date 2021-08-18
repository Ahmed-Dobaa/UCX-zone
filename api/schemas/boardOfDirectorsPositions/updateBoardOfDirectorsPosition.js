'use strict';

const Joi = require('joi');

module.exports = {
  params: { id: Joi.number().required().description('the id of the Director position')},
  payload: {
    name: Joi.string().min(3).max(50).required().example('vice president').description('Director position name.')
  }
};