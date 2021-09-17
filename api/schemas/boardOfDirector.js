'use strict';

const Joi = require('joi');

module.exports = {
  createSchema: {
    params: {
      investeeId: Joi.number().description('the id of the investee'),
      userId: Joi.number().description('the id of the user')
    },
    payload: {
      email: Joi.string().allow('', null).email().optional().example('test@abc.com'),
      boardOfDirectorTranslation: Joi.object().keys({
        name: Joi.string().min(3).max(50).example('Abu El-Ella').description('Director name.'),
        position: Joi.string().example('manager'),
        phoneNumber: Joi.number().allow('', null).optional().label('phone number').example(22765927)
      })
    }
  },
  translateSchema: {
    payload: {
      email: Joi.string().allow('', null).email().optional().example('test@abc.com'),
      boardOfDirectorTranslation: Joi.object().keys({
        name: Joi.string().min(3).max(50).required().example('Abu El-Ella').description('Director name.'),
        position: Joi.string().required().example('manager'),
        phoneNumber: Joi.string().allow('', null).optional().label('phone number').example(22765927)
      }).required()
    }
  },
  updateSchema: {
    params: {
      investeeId: Joi.number().required().description('the id of the investee'),
      userId: Joi.number().required().description('the id of the user'),
      id: Joi.number().required().description('the id of the auditor'),
    },
    payload: {
      email: Joi.string().allow('', null).email().optional().example('test@abc.com'),
      boardOfDirectorTranslation: {
        // id: Joi.number().required(),
        name: Joi.string().min(3).max(50).example('Abu El-Ella').description('Director name.'),
        position: Joi.string().example('manager'),
        phoneNumber: Joi.number().allow('', null).label('phone number').example(22765927)
      }
    }
  }
};
