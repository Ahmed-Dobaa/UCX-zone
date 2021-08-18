const Joi = require('joi');

module.exports = {
  create: {
    payload: {
      name: Joi.string().required().example('financial pdf'),
      description: Joi.string().allow('').optional().example('')
    }
  },
  update: {
    params: { id: Joi.string().required().example('17') },
    payload: {
      name: Joi.string().example('financial pdf'),
      description: Joi.string().example('Enter Description Here')
    }
  }

};
