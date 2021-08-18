'use strict';

const Joi = require('joi');

module.exports = {
  createSchema: {
    params: {
      userId: Joi.number().positive().min(1).required().example('16').description('the id of the user'),
      investorId: Joi.number().positive().min(1).required().label('investor id').example('16').description('the id of the investor'),
      investeeId: Joi.number().positive().min(1).required().label('investee id').example('16').description('the id of the investee'),
      id: Joi.number().positive().min(1).required().example('16').description('the id of the proposal of investee company')
    },
    payload: Joi.object().keys({
      minTicketSize: Joi.number().positive().description('minimum The Ticket Size'),
      maxTicketSize: Joi.number().positive().description('maximum The Ticket Size'),
      servicesValue: Joi.string().description('the services value'),
      significantValue: Joi.string().description('the significant value'),
      clarifications: Joi.string().allow(null).description('the significant value')
    }).or('minTicketSize', 'maxTicketSize', 'servicesValue', 'significantValue').required()
  },
  updateSchema: {
    params: {
      userId: Joi.number().positive().min(1).required().example('16').description('the id of the user'),
      investorId: Joi.number().positive().min(1).required().label('investor id').example('16').description('the id of the investor'),
      investeeId: Joi.number().positive().min(1).required().label('investee id').example('16').description('the id of the investee'),
      proposalId: Joi.number().positive().min(1).required().label('proposal id').example('16').description('the id of the proposal'),
      id: Joi.number().positive().min(1).required().example('16').description('the id of the submitted interest')
    },
    payload: {
      minTicketSize: Joi.number().positive().description('minimum The Ticket Size'),
      maxTicketSize: Joi.number().positive().description('maximum The Ticket Size'),
      servicesValue: Joi.string().description('the services value'),
      significantValue: Joi.string().description('the significant value'),
      clarifications: Joi.string().allow(null).description('the significant value')
    }
  }
};
