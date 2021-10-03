'use strict';

const Boom = require('boom');
const _ = require('lodash');
const path = require('path');
const useragent = require('useragent');
useragent(true);

const models = require(path.join(__dirname, '../models/index'));
const errorService = require(path.join(__dirname, '../','services/errorService'))

module.exports = {
  find: async function (request, reply) {
    try {

      const language = 1; //request.pre.languageId;
      const foundInvesteeCapital = await models.investeeCapital.findOne({
        where: { investeeId: request.params.investeeId, languageId: language },
        raw: true
      });

      return reply.response(foundInvesteeCapital|| {}).code(200);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },
  findOne: async function (request, reply) {
    try {
      const language = 1; //request.pre.languageId;
      const foundInvesteeCapital = await models.investeeCapital.findOne({
        where: {
          id: request.params.id,
          languageId: language
        },
        raw: true
      });

      return reply.response(foundInvesteeCapital|| {}).code(200);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },
  create: async function (request, reply) {
    try {
      const language = 1; //request.pre.languageId;
      const { payload } = request;
      payload.investeeId = request.params.investeeId;
      payload.createdBy = request.params.userId, //15, //request.auth.decoded.id;
      payload.languageId = language;
      const foundInvesteeCompany = await models.investee.findOne({ where: { id: request.params.investeeId } });

      if(_.isEmpty(foundInvesteeCompany)) {

        return Boom.notFound('The Investee Company Is Not Found');
      }

      const foundInvesteeCapital = await models.investeeCapital.findOne({
        where: {
          investeeId: payload.investeeId,
          languageId: language
        }
      });

      if(!_.isEmpty(foundInvesteeCapital)) {

        return Boom.badRequest('Investee company capital already created before, it can be updated only.');
      }

      const createdInvesteeCapital = await models.investeeCapital.create(payload);

      return reply.response(createdInvesteeCapital).code(201);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },
  translate: async function (request, reply) {
    try {
      const language = 1; //request.pre.languageId;

      const foundInvesteeCompany = await models.investee.findOne({
        where: { id: request.params.investeeId },
        include: [
          {
            association: 'capital',
            where: { languageId: language },
            required: false
          }
        ]
      });

      if(_.isEmpty(foundInvesteeCompany)) {

        return Boom.notFound('The Investee Company Is Not Found, You Have to Create It First');
      }

      if(!_.isEmpty(foundInvesteeCompany.capital)) {

        return Boom.notFound('Investee capital already translated to that language before.');
      }

      const { payload } = request;
      payload.investeeId = request.params.investeeId;
      payload.createdBy = request.auth.decoded.id;
      payload.languageId = language;

      const createdInvesteeCapital = await models.investeeCapital.create(payload);

      return reply.response(createdInvesteeCapital).code(201);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },
  update: async function (request, reply) {
    try {

      const language = 1; //request.pre.languageId;
      const { payload } = request;
      payload.languageId = language;

      const foundInvesteeCapital = await models.investeeCapital.findOne({
        where: {
          id: request.params.id ,
          investeeId: request.params.investeeId,
          languageId: language
        }
      });

      if(_.isEmpty(foundInvesteeCapital)) {

        return Boom.notFound('Capital You Try To Update does Not Exist');
      }

      await models.investeeCapital.update(payload, {
        where: {
          id: request.params.id ,
          investeeId: request.params.investeeId
        }
      });

      return reply.response({status: 200, message: "updated successfully"}).code(200);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },
  delete: async function (request, reply) {
    try {

      await models.investeeCapital.destroy({ where: { id: request.params.id } });

      return reply.response().code(204);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  }
};
