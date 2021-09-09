const Joi = require('joi');

module.exports = {
  createSchema: {
    params: {
      userId: Joi.string().label('user id').example('17'),
      investeeId: Joi.string().label('investee id').example('17')
    },
    payload: {
      capitalCurrencyId: Joi.number().positive().label('capital currency id').example(89),
      issuedCapital: Joi.number().positive().label('issued capital').example(1000),
      paidInCapital: Joi.number().positive().label('paid in capital').example(1000),
      currentTotalShares: Joi.number().positive().label('current total shares').example(100),
      bookValue: Joi.number().positive().label('book Value').example(10),
      authorizedCapital: Joi.number().positive().label('authorized capital').example(1000)
    }
  },
  translateSchema: {
    payload: {
      issuedCapital: Joi.number().positive().required().label('issued capital').example(1000),
      paidInCapital: Joi.number().positive().required().label('paid in capital').example(1000),
      currentTotalShares: Joi.number().positive().required().label('current total shares').example(100),
      bookValue: Joi.number().positive().required().label('book Value').example(10),
      authorizedCapital: Joi.number().positive().label('authorized capital').example(1000)
    }
  },
  updateSchema: {
    params: {
      userId: Joi.string().required().label('user id').example('17'),
      investeeId: Joi.string().required().label('investee id').example('17'),
      id: Joi.string().required().label('capital id').example('17')
    },
    payload: {
      capitalCurrencyId: Joi.number().positive().label('capital currency id').example(89),
      issuedCapital: Joi.number().positive().label('issued capital').example(1000),
      paidInCapital: Joi.number().positive().label('paid in capital').example(1000),
      currentTotalShares: Joi.number().positive().label('current total shares').example(100),
      bookValue: Joi.number().positive().label('book Value').example(10),
      authorizedCapital: Joi.string().label('authorized capital').example(1000)
    }
  }

};

