const Joi = require('joi');

module.exports = {
  createSchema: {
    params: {
      userId: Joi.number().required().description('the id of the user'),
      investorId: Joi.number().required().description('the id of the Investor')
    },
    payload: [{
      email: Joi.string().allow('', null).email().optional(),
      managementTranslation: Joi.object().keys({
        name: Joi.string().required(),
        position: Joi.string().required().label('Position'),
        // representativeFor: Joi.string().required().label('representative For'),
        phoneNumber: Joi.string().allow('', null).optional().label('phone number')
      })
    }]
  },
  translateSchema: {
    payload: {
      managementTranslation: {
        name: Joi.string().required().example('test user'),
        representativeFor: Joi.string().required().label('representative For').example('Cairo office'),
        phoneNumber: Joi.string().allow('', null).optional().label('phone number').example(22765927)
      }
    }
  },
  updateSchema: {
    params: {
      userId: Joi.number().required().description('the id of the user'),
      investorId: Joi.number().required().description('the id of the Investor'),
      managementId: Joi.number().required().description('the id of the Investor Management')
    },
    payload: [{
      email: Joi.string().allow('', null).email().optional(),
      managementTranslation: {
        id: Joi.number().required(),
        name: Joi.string(),
        position: Joi.string().label('Position'),
        // representativeFor: Joi.string().label('representative For'),
        phoneNumber: Joi.string().allow('', null).optional().label('phone number')
      }
    }]
  }
};
