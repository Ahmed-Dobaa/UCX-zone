'use strict';

const Joi = require('joi');

module.exports = {
  createSchema: {
    params: {
      userId: Joi.number().positive().min(1).required().example('16').description('the id of the user'),
      id: Joi.number().positive().min(1).required().label('investee id').example('16').description('the id of the investee')
    },
    payload: { serviceName: Joi.string().description('the services value').required() }
  },
  updateSchema: {
    params: {
      userId: Joi.number().positive().min(1).required().example('16').description('the id of the user'),
      investeeId: Joi.number().positive().min(1).required().label('investee id').example('16').description('the id of the investee'),
      id: Joi.number().positive().min(1).required().example('16').description('the id of the service request')
    },
    payload: { serviceName: Joi.string().description('the services value') }
  }
};
