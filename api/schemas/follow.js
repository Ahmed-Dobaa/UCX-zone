'use strict';

const Joi = require('joi');

module.exports = {
  params: {
    userId: Joi.number().positive().min(1).required().example('16').description('the id of the user'),
    investorId: Joi.number().positive().min(1).required().example('16').description('the id of the investor'),
    id: Joi.number().positive().min(1).required().example('16').description('the id of investee company')
  }
};
