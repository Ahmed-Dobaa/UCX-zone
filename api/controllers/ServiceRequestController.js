'use strict';

const Boom = require('boom');
const path = require('path');
const _ = require('lodash');

const models = require(path.join(__dirname, '../models/index'));
const qsToSequelizeQuery = require(path.join(__dirname, '../','services/qsToSequelizeQuery'));


module.exports = {
  findAll: async function (request, reply) {
    try {
      const sequelizeQuery = qsToSequelizeQuery(request.query, models.investee.attributes);
      const foundServicesRequests = await models.investeeServiceRequest.findAndCountAll(sequelizeQuery);

      return reply.response(foundServicesRequests).code(200);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  findOne: async (request, reply) => {
    try {
      const foundServiceRequest = await models.investeeServiceRequest.findOne({ where: { id: request.params.id, investeeId: request.params.investeeId } });

      return reply.response(foundServiceRequest || {}).code(200);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  create: async (request, reply) => {
    try {
      const foundInvesteeCompanies = await models.investee.findOne({ where: { id: request.params.id } });

      if(_.isEmpty(foundInvesteeCompanies)) {
        return Boom.notFound('The Investee Company Is Not Found, You have to create It First');
      }

      const createdServiceRequest = await models.investeeServiceRequest.create({ investeeId: request.params.id, serviceName: request.payload.serviceName });

      return reply.response(createdServiceRequest).code(201);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  update: async (request, reply) => {
    try {
      const foundServiceRequest = await models.investeeServiceRequest.findOne({ where: { id: request.params.id } });

      if(_.isEmpty(foundServiceRequest)) {
        return Boom.notFound('Service request you\'re trying to update does not exist');
      }

      await models.investeeServiceRequest.update(request.payload , { where: { id: request.params.id } });

      return reply.response().code(204);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  delete: async (request, reply) => {
    try {
      await models.investeeServiceRequest.destroy({ where: { id: request.params.id } });

      return reply.response().code(204);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  findAllServicesRequests: async function (request, reply) {
    try {
      const { languageId } = request.pre;
      const sequelizeQuery = qsToSequelizeQuery(request.query, models.investee.attributes);
      sequelizeQuery.include = [
        {
          association: 'investee', required: true,
          include: [
            { association: 'investeeTranslation', required: true, where: { languageId: languageId } },
            {
              association: 'basicData', required: true,
              include: [{ association: 'companiesBasicDataTranslation', required: true, where: { languageId: languageId } }]
            }
          ]
        }
      ];
      const foundServicesRequests = await models.investeeServiceRequest.findAndCountAll(sequelizeQuery);

      return reply.response(foundServicesRequests).code(200);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  }
};

