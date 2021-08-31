'use strict';
const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);

module.exports = { payload: { activationCode: Joi.string().example('Jxa#!?+1jB3*(6snF6~H') } };
