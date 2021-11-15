'use strict';

const Boom = require('boom');
const models = require('../models/index');
const _ = require('lodash');

module.exports = {
  findAll: async function (request, reply) {
    try {

      const foundSubmittedInterests = await models.investor_interests_submits.findAll({ where: { investorId: request.params.investorId } });

      return reply.response(foundSubmittedInterests || {}).code(200);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  findOne: async (request, reply) => {
    try {

      const foundSubmittedInterests = await models.investor_interests_submits.findOne({ where: { id: request.params.id } });

      return reply.response(foundSubmittedInterests || {}).code(200);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  create: async (request, reply) => {
    try {
      const createdInterestSubmit = await models.investor_interests_submits.create({
        investorId: request.params.investorId,
        investeeId: request.params.investeeId,
        // minTicketSize: request.payload.minTicketSize,
        // maxTicketSize: request.payload.maxTicketSize,
        // servicesValue: request.payload.servicesValue,
        investment_amount: request.payload.investment_amount,
        clarifications: request.payload.clarifications,
      });

      return reply.response(createdInterestSubmit).code(200);

    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  update: async (request, reply) => {
    try {
      let foundInterestSubmit = await models.investor_interests_submits.findOne({ where: { id: request.params.id } });

      if(_.isEmpty(foundInterestSubmit)) {

        return Boom.notFound('Interest you\'re trying to update does not exist');
      }
      foundInterestSubmit = await models.investor_interests_submits.update(request.payload , { where: { id: request.params.id } });

      return reply.response(foundInterestSubmit).code(200);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  delete: async (request, reply) => {
    try {

      await models.investor_interests_submits.destroy({ where: { id: request.params.id } });

      return reply.response().code(204);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  }
};

