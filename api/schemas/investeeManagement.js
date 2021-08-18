const Joi = require('joi');

module.exports = {
  createSchema: {
    params: {
      userId: Joi.number().required().description('the id of the user'),
      companyId: Joi.number().required().description('the id of the company')
    },
    payload: {
      positionId: Joi.number().positive().required().label('Position').example(2).description('Position id.'),
      email: Joi.string().allow('', null).email().optional().example('test@abc.com'),
      managementTranslation: Joi.object().keys({
        name: Joi.string().required().example('test user'),
        representativeFor: Joi.string().required().label('representative For').example('Cairo office'),
        phoneNumber: Joi.string().allow('', null).optional().label('phone number').example(22765927)
      })
    }
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
      companyId: Joi.number().required().description('the id of the company'),
      managementId: Joi.number().required().description('the id of the company')
    },
    payload: {
      positionId: Joi.number().positive().label('Position').example(2).description('Position id.'),
      email: Joi.string().allow('', null).email().optional().example('test@abc.com'),
      managementTranslation: {
        // id: Joi.number().required(),
        name: Joi.string().example('test user'),
        representativeFor: Joi.string().label('representative For').example('Cairo office'),
        phoneNumber: Joi.string().allow('', null).optional().label('phone number').example(22765927)
      }
    }
  }
};
