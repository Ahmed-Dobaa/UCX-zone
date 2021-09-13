const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);
const moment = require('moment');

module.exports = {
  createSchema: {
    params: {
      userId: Joi.string().required().label('user id').example('17'),
      investeeId: Joi.string().required().label('investee id').example('17')
    },
    payload: {
      email: Joi.string().allow('', null).email().optional().example('test@abc.com'),
      gender: Joi.string().valid('M', 'F').example('M'),
      ownershipTranslation: {
        shareholderName: Joi.string().label('shareholder name').example('Greg'),
        phoneNumber: Joi.string().allow('', null).optional().label('phone number').example(22765927),
        dob: Joi.date().format('YYYY-MM-DD')
          .label('date of birth'),
        ownedShares: Joi.number().positive().label('owned shares').example(1000),
        value: Joi.number().positive().label('value').example(1000),
        percent: Joi.number().positive().label('percent').example(50)
      }
    }
  },
  translateSchema: {
    payload: {
      ownershipTranslation: {
        shareholderName: Joi.string().required().label('shareholder name').example('Greg'),
        phoneNumber: Joi.string().allow('', null).optional().label('phone number').example(22765927),
        dob: Joi.date().format('YYYY-MM-DD').raw().max(moment().subtract(18, 'year').format('MM-DD-YYYY'))
          .label('date of birth').required().example(moment().subtract(18, 'year').format('MM-DD-YYYY')),
        ownedShares: Joi.number().positive().required().label('owned shares').example(1000),
        value: Joi.number().positive().required().label('value').example(1000),
        percent: Joi.number().positive().required().label('percent').example(50)
      }
    }
  },
  updateSchema: {
    params: {
      userId: Joi.string().required().label('user id').example('17'),
      investeeId: Joi.string().required().label('investee id').example('17'),
      id: Joi.number().required().label('investee id').example('17')
    },
    payload: {
      email: Joi.string().allow('', null).email().example('test@abc.com'),
      gender: Joi.string(),
      ownershipTranslation: {
        shareholderName: Joi.string().label('shareholder name').example('Greg'),
        phoneNumber: Joi.string().allow('', null).optional().label('phone number').example(22765927),
        dob: Joi.date().format('YYYY-MM-DD').raw()
        // .max(moment().subtract(18, 'year').format('MM-DD-YYYY'))
          .label('date of birth').example(moment().subtract(18, 'year').format('MM-DD-YYYY')),
        ownedShares: Joi.number().positive().label('owned shares').example(1000),
        value: Joi.number().positive().label('value').example(1000),
        percent: Joi.number().positive().label('percent').example(50),
      }
    }
  }
};

