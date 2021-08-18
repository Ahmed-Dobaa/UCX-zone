'use strict';

const moment = require('moment');
const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);


module.exports = {
  create: {
    params: { id: Joi.number().required().description('the id of user') },
    payload: {
      name: Joi.string().min(3, 'utf8').optional().label('user name').example('test user'),
      email: Joi.string().email().required().example('test@abc.com'),
      gender: Joi.string().valid(['M', 'F']).example('M').required().description('sub user gender'),
      role: Joi.number().required().label('role id').example(1),
      companyId: Joi.number().required().description('the id of company which sub user will be added to it'),
      companyType: Joi.string().valid(['IE', 'IR', 'S']).example('C').required().description('the company type which sub user will be added to it'),
      companyName: Joi.string().required().description('the name of company which sub user will be added to it'),
    }
  },
  update: {
    params: { userId: Joi.number().required().description('the id of user'), id: Joi.number().required().description('the id of sub user') },
    payload: {
      role: Joi.number().required().label('role id').example(1),
      companyId: Joi.number().required().description('the id of company which sub user will be added to it'),
      companyType: Joi.string().valid(['IE', 'IR', 'S']).example('C').required().description('the company type which sub user will be added to it'),
    }
  }
};
