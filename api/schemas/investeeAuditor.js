const Joi = require('joi');

module.exports = {
  createSchema: {
    params: {
      userId: Joi.number().description('the id of the user'),
      investeeId: Joi.number().description('the id of the company') // companyId
    },
    payload: {
      email: Joi.string().allow(null),
      auditorTranslation: Joi.object().keys({
        name: Joi.string().example('test company'),
        address: Joi.string(),
        //keys({
        //   streetNumber: Joi.string().example('102'),
        //   streetName: Joi.string().example('Abu El-Ella main road'),
        //   governorate: Joi.string().example('El-Zamalek'),
        //   city: Joi.string().example('Cairo'),
        //   country: Joi.string().example('Egypt')
        // }),
        phoneNumber: Joi.string().label('phone Number')
      })
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
      investeeId: Joi.number().required().description('the id of the company'), // companyId
      auditorId: Joi.number().required().description('the id of the auditor'),
      auditorTranslationId: Joi.number().required().description('the id of the auditor translation')

    },
    payload: {
      email: Joi.string(),
      auditorTranslation: {
        // id: Joi.number().required(),
        name: Joi.string().example('test company'),
        address: Joi.string(),
        // .keys({
        //   streetNumber: Joi.string().optional().example('102'),
        //   streetName: Joi.string().optional().example('Abu El-Ella main road'),
        //   governorate: Joi.string().optional().example('El-Zamalek'),
        //   city: Joi.string().optional().example('Cairo'),
        //   country: Joi.string().optional().example('Egypt')
        // }),
        phoneNumber: Joi.number().label('phone Number')
      }
    }
  }
};
