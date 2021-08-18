'use strict';

const Joi = require('joi');

module.exports = {
  payload: {
    name: Joi.string().min(3).max(50).required().example('vice president').description('Director position name.')
  }
};