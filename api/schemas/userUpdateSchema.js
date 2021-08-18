'use strict';

const moment = require('moment');
const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);

module.exports = {
  params: { id: Joi.number().required().description('the id of user') },
  payload: {
    name: Joi.string().min(3, 'utf8').optional().label('user name').example('test user'),
    email: Joi.string().email().optional().example('test@abc.com'),
    phoneNumber: Joi.string().optional().label('phone number').example(22765927),
    dob: Joi.date().format('YYYY-MM-DD').raw().max(moment().subtract(18, 'year').format('MM-DD-YYYY'))
      .label('date of birth').optional().example(moment().subtract(18, 'year').format('MM-DD-YYYY')),
    country: Joi.string().optional(),
    socials: Joi.object().keys({
      facebook: Joi.string().optional(),
      instagram: Joi.string().optional(),
      twitter: Joi.string().optional(),
      linkedIn: Joi.string().optional(),
    }).optional()
  }
};
