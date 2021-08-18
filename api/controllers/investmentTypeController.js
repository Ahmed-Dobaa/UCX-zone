'use strict';

const Boom = require('boom');
const _ = require('lodash');
const path = require('path');
const models = require(path.join(__dirname, '../models/index'));
const useragent = require('useragent');
useragent(true);

module.exports = {
  findAll: async function (request, reply) {
    try {
      const foundInvestmentTypes = await models.investmentTypes.findAll({
        include: [
          {
            association: 'investmentTypesTranslation',
            required: true,
            where: { languageId: request.pre.languageId }
          }
        ]
      });

      return reply.response(foundInvestmentTypes).code(200);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  findOne: async function (request, reply) {
    try {
      const foundInvestmentType = await models.investmentTypes.findOne({
        where: { id: request.params.id },
        include: [
          {
            association: 'investmentTypesTranslation',
            required: true,
            where: { languageId: request.pre.languageId }
          }
        ]
      });

      return reply.response(foundInvestmentType|| {}).code(200);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  create: async function (request, reply) {
    let transaction;
    try {
      const foundCountry = await models.investmentTypes.findOne({
        include: [
          {
            association: 'investmentTypesTranslation',
            required: true,
            where: { languageId: request.pre.languageId, name: { $like: request.payload.name } }
          }
        ]
      });

      if(!_.isEmpty(foundCountry)) {
        return Boom.badRequest('The Investment Type Already Exists');
      }

      transaction = await models.sequelize.transaction();
      const createdInvestmentType = await models.investmentTypes.create({},{ transaction });
      await models.investmentTypesTranslation.create({
        createdBy: request.auth.decoded.id,
        investmentTypeId: createdInvestmentType.id,
        languageId: request.pre.languageId,
        name: request.payload.name
      }, { transaction });

      await transaction.commit();

      return reply.response(request.payload).code(201);
    }
    catch (e) {
      console.log('error', e);

      if(transaction) {
        await transaction.rollback();
      }

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  update: async function (request, reply) {
    try {
      const foundInvestmentType = await models.investmentTypes.findOne({
        where: { id: request.params.id },
        include: [
          {
            association: 'investmentTypesTranslation',
            where: { languageId: request.pre.languageId }
          }
        ]
      });

      if(_.isEmpty(foundInvestmentType)) {
        return Boom.notFound('Investment Type You Try To Update does Not Exist');
      }

      if(!_.isEmpty(foundInvestmentType.investmentTypesTranslation)) {
        return Boom.badRequest('Investment Type Not Translated To This Language before To Be Able To Update');
      }

      await models.investmentTypesTranslation.update(request.payload, { where: { investmentTypeId: request.params.id } });

      return reply.response().code(204);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  translate: async function (request, reply) {
    try {
      const foundInvestmentType = await models.investmentTypes.findOne({
        where: { id: request.params.id },
        include: [
          {
            association: 'investmentTypesTranslation',
            required: true,
            where: { languageId: request.pre.languageId }
          }
        ]
      });

      if(_.isEmpty(foundInvestmentType)) {
        return Boom.notFound('Country You Try To Update Not Exist');
      }

      if(!_.isEmpty(foundInvestmentType.investmentTypesTranslation)) {
        return Boom.badRequest('Investment Type Has Translated To This Language before');
      }

      await models.investmentTypesTranslation.create({
        investmentTypeId: request.params.id,
        languageId: request.pre.languageId,
        name: request.payload.name
      });

      return reply.response(request.payload).code(201);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  delete: async function (request, reply) {
    try {
      console.log(' request.params.id', request.params.id);
      await models.investmentTypes.destroy({ where: { id: request.params.id } });

      return reply.response().code(204);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  }
};
