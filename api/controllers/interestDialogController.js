'use strict';

const Boom = require('boom');
const models = require('../models/index');
const _ = require('lodash');

module.exports = {
  findAll: async function (request, reply) {
    try {

      const foundDialog = await models.interest_dialog.findAll({ where: { interest_id: request.params.interestId } });

      return reply.response(foundDialog || {}).code(200);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  },

  create: async (request, reply) => {
    try {
      const createdInterestDialog = await models.interest_dialog.create({
        interest_id: request.payload.interest_id,
        dialog: request.payload.dialog,
        sender_type: request.payload.sender_type,
      });

      return reply.response(createdInterestDialog).code(200);

    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  };

