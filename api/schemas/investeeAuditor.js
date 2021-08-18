const Joi = require('joi');

module.exports = {
  createSchema: {
    params: {
      userId: Joi.number().required().description('the id of the user'),
      companyId: Joi.number().required().description('the id of the company')
    },
    payload: {
      email: Joi.string().allow(null),
      auditorTranslation: Joi.object().keys({
        name: Joi.string().required().example('test company'),
        address: Joi.object().keys({
          streetNumber: Joi.string().required().example('102'),
          streetName: Joi.string().required().example('Abu El-Ella main road'),
          governorate: Joi.string().required().example('El-Zamalek'),
          city: Joi.string().required().example('Cairo'),
          country: Joi.string().required().example('Egypt')
        }).required(),
        phoneNumber: Joi.string().label('phone Number')
      }).required()
    }
  },
  translateSchema: {
    payload: {
      auditorTranslation: Joi.object().keys({
        name: Joi.string().required().example('test company'),
        address: Joi.object().keys({
          streetNumber: Joi.string().required().example('102'),
          streetName: Joi.string().required().example('Abu El-Ella main road'),
          governorate: Joi.string().required().example('El-Zamalek'),
          city: Joi.string().required().example('Cairo'),
          country: Joi.string().required().example('Egypt')
        }).required(),
        phoneNumber: Joi.string().label('phone Number')
      }).required()
    }
  },
  updateSchema: {
    params: {
      userId: Joi.number().required().description('the id of the user'),
      companyId: Joi.number().required().description('the id of the company'),
      auditorId: Joi.number().required().description('the id of the auditor')
    },
    payload: {
      email: Joi.string(),
      auditorTranslation: {
        id: Joi.number().required(),
        name: Joi.string().example('test company'),
        address: Joi.object().keys({
          streetNumber: Joi.string().required().example('102'),
          streetName: Joi.string().required().example('Abu El-Ella main road'),
          governorate: Joi.string().required().example('El-Zamalek'),
          city: Joi.string().required().example('Cairo'),
          country: Joi.string().required().example('Egypt')
        }),
        phoneNumber: Joi.string().label('phone Number')
      }
    }
  }
};
