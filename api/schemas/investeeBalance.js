const Joi = require('joi');
const moment = require('moment');

module.exports = {
  createSchema: {
    params: {
      userId: Joi.number().required().example('17'),
      investeeId: Joi.number().required().example('17')
    },
    payload: {
      year: Joi.number().max(parseInt(moment().subtract(1, 'year').format('YYYY'))).required()
        .label('year'),
      fixedAssets: Joi.number().max(parseInt(moment().subtract(1, 'year').format('YYYY'))).required()
        .label('fixed Assets'),
      currentAssets: Joi.number().positive().required().label('current Assets'),
      currentLiabilities: Joi.number().positive().required().label('current Liabilities'),
      longTermLiabilities: Joi.number().positive().required().label('long Term Liabilities')
    }
  },
  translateSchema: {
    params: {
      userId: Joi.number().required().example('17'),
      investeeId: Joi.number().required().example('17'),
      id: Joi.number().required().example('17'),
    },
    payload: {
      year: Joi.number().max(parseInt(moment().subtract(1, 'year').format('YYYY'))).required()
        .label('Year'),
      fixedAssets: Joi.number().max(parseInt(moment().subtract(1, 'year').format('YYYY')))
        .required().label('Fixed Assets'),
      currentAssets: Joi.number().positive().required().label('Current Assets'),
      currentLiabilities: Joi.number().positive().required().label('Current Liabilities'),
      longTermLiabilities: Joi.number().positive().required().label('Long Term Liabilities')
    }
  },
  updateSchema: {
    params: {
      userId: Joi.number().required().example('17'),
      investeeId: Joi.number().required().example('17'),
      id: Joi.number().required().example('17')
    },
    payload: {
      year: Joi.number().max(parseInt(moment().subtract(1, 'year').format('YYYY')))
        .label('Year'),
      fixedAssets: Joi.number().positive().label('Fixed Assets'),
      currentAssets: Joi.number().positive().label('Current Assets'),
      currentLiabilities: Joi.number().positive().label('Current Liabilities'),
      longTermLiabilities: Joi.number().positive().label('Long Term Liabilities')
    }
  }

};
