'user strict';

const _ = require('lodash');
const Boom = require('boom');
const path = require('path');

const models = require(path.join(__dirname, '../','models/index'));

module.exports = {
  findAll: async function (request, reply) {
    try {

      const foundInvesteeAttachmentsTypes = await models.investeeAttachmentsTypes.findAll({ raw: true });
      return reply.response(foundInvesteeAttachmentsTypes).code(200);
    }
    catch (e) {
      console.log('error', e);
      return Boom.badImplementation('An internal server error occurred');
    }
  },
  findOne: async function (request, reply) {
    try {

      const foundInvesteeAttachmentsType = await models.investeeAttachmentsTypes.findOne({ where: { id: request.params.id }, raw: true });
      return reply.response(foundInvesteeAttachmentsType || {}).code(200);
    }
    catch (e) {
      console.log('error', e);
      return Boom.badImplementation('An internal server error occurred');
    }
  },
  create: async function (request, reply) {
    try {

      request.payload.createdBy = request.auth.decoded.id;
      const createdInvesteeAttachmentsType = await models.investeeAttachmentsTypes.create(request.payload);
      return reply.response(createdInvesteeAttachmentsType).code(201);
    }
    catch (e) {
      console.log('error', e);
      return Boom.badImplementation('An internal server error occurred');
    }
  },
  update: async function (request, reply) {
    try {

      const foundInvesteeAttachmentsType = await models.investeeAttachmentsTypes.findOne({ where: { id: request.params.id }, raw: true });
      if(_.isEmpty(foundInvesteeAttachmentsType)) {

        return Boom.notFound('Attachment Type You Try To Update does Not Exist');
      }

      await models.investeeAttachmentsTypes.update(request.payload, { where: { id: request.params.id } });
      return reply.response().code(200);
    }
    catch (e) {
      console.log('error', e);
      return Boom.badImplementation('An internal server error occurred');
    }
  },
  delete: async function (request, reply) {
    try {

      await models.investeeAttachmentsTypes.destroy({ where: { id: request.params.id } });
      return reply.response().code(204);
    }
    catch (e) {
      console.log('error', e);
      return Boom.badImplementation('An internal server error occurred');
    }
  }
};