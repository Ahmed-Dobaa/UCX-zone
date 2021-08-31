const Joi = require('joi');
const moment = require('moment');

module.exports = {
  createSchema: {
    params: {
      userId: Joi.number().required().example('17'),
      investeeId: Joi.number().required().example('17')
    },
    payload: {
      year: Joi.number().max(parseInt(moment().subtract(1, 'year').format('YYYY')))
        .label('financial data year'),
      Sales: Joi.number().positive().label('Sales'),
      COGS: Joi.number().positive().label('COGS'),
      GeneralAndAdministrativeExpense: Joi.number().positive().label('General And Administrative Expense'),
      SellingExpense: Joi.number().positive().label('Selling Expense'),
      Interest: Joi.number().positive().label('Interest'),
      Tax: Joi.number().positive().label('Tax'),
      depreciation: Joi.number().positive(),
      otherExpenses: Joi.number().positive().label('Other Expenses'),
      otherRevenues: Joi.number().positive().label('Other Revenues'),
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
        .label('financial data year'),
      Sales: Joi.number().positive().required().label('Sales'),
      COGS: Joi.number().positive().required().label('COGS'),
      GeneralAndAdministrativeExpense: Joi.number().positive().required().label('General And Administrative Expense'),
      SellingExpense: Joi.number().positive().required().label('Selling Expense'),
      Interest: Joi.number().positive().required().label('Interest'),
      Tax: Joi.number().positive().required().label('Tax'),
      depreciation: Joi.number().positive().required(),
      otherExpenses: Joi.number().positive().required().label('Other Expenses'),
      otherRevenues: Joi.number().positive().required().label('Other Revenues'),
    }
  },
  updateSchema: {
    params: {
      userId: Joi.string().required().example('17'),
      investeeId: Joi.string().required().example('17'),
      id: Joi.string().required().example('17')
    },
    payload: {
      year: Joi.number().max(parseInt(moment().subtract(1, 'year').format('YYYY'))).required()
        .label('financial data year'),
      Sales: Joi.number().positive().label('Sales'),
      COGS: Joi.number().positive().label('COGS'),
      GeneralAndAdministrativeExpense: Joi.number().positive().label('General And Administrative Expense'),
      SellingExpense: Joi.number().positive().label('Selling Expense'),
      Interest: Joi.number().positive(),
      Tax: Joi.number().positive(),
      depreciation: Joi.number().positive(),
      otherExpenses: Joi.number().positive().label('other Expenses'),
      otherRevenues: Joi.number().positive().label('other Revenues'),

    }
  }

};
