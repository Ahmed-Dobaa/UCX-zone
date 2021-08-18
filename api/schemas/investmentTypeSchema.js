const Joi = require('joi');

module.exports = {
  createSchema: { payload: { name: Joi.string().required().label('name') } },
  translateSchema: { payload: { name: Joi.string().required().example('test company'), } },
  updateSchema: {
    params: { id: Joi.string().required().example('16') },
    payload: { name: Joi.string().example('test company'), }
  }
};