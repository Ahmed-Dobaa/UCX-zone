'use strict';

const Boom = require('boom');
const _ = require('lodash');
const path = require('path');
const models = require(path.join(__dirname, '../models/index'));
const useragent = require('useragent');
useragent(true);

module.exports = {
  find: async function (request, reply) {
    try {
      const foundCountries = await models.countries.findAll({
        include: [
          {
            association: 'countriesTranslation',
            required: true,
            // where: { languageId: request.pre.languageId }
          }
        ]
      });

      return reply.response(foundCountries).code(200);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  findOne: async function (request, reply) {
    try {
      const foundCountry = await models.countries.findOne({
        where: { id: request.params.id },
        include: [{ association: 'countriesTranslation', required: true, where: { languageId: request.pre.languageId } }]
      });

      return reply.response(foundCountry|| {}).code(200);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  create: async function (request, reply) {
    let transaction;
    try {
      const foundCountry = await models.countries.findOne({
        where: { code: request.payload.code },
        include: [{ association: 'countriesTranslation', required: true, where: { languageId: request.pre.languageId } }]
      });

      if(!_.isEmpty(foundCountry)) {
        return Boom.notFound('The Country Already Exists');
      }
      transaction = await models.sequelize.transaction();
      const createdCountry = await models.countries.create(request.payload,{ transaction });
      await models.countriesTranslation.create({ countryId: createdCountry.id,languageId: request.pre.languageId,name: request.payload.name }, { transaction });
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
    let transaction;
    try {
      const foundCountry = await models.countries.findOne({
        where: { id: request.params.id },
        include: [{ association: 'countriesTranslation', required: true, where: { languageId: request.pre.languageId } }]
      });

      if(_.isEmpty(foundCountry)) {
        return Boom.notFound('Country You Try To Update does Not Exist');
      }
      transaction = await models.sequelize.transaction();
      await models.countries.update(request.payload, { where: { id: request.params.id } }, { transaction });
      await models.countriesTranslation.update(request.payload, { where: { countryId: request.params.id } }, { transaction });

      return reply.response().code(201);
    }
    catch (e) {
      console.log('error', e);

      if(transaction) {
        await transaction.rollback();
      }

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  translate: async function (request, reply) {
    try {
      const foundCountry = await models.countries.findOne({
        where: { id: request.params.id },
        include: [{ association: 'countriesTranslation', required: false, where: { languageId: request.pre.languageId } }]
      });

      if(_.isEmpty(foundCountry)) {
        return Boom.notFound('Country You Try To Update Not Exist');
      }

      if(!_.isEmpty(foundCountry.countriesTranslation)) {
        return reply.response(foundCountry.dataValues).code(200);
      }
      await models.countriesTranslation.create({ countryId: request.params.id,languageId: request.pre.languageId,name: request.payload.name });

      return reply.response(request.payload).code(200);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  delete: async function (request, reply) {
    try {
      const countryId = request.params.id;
      await models.countries.destroy({ where: { id: countryId } });

      return reply.response().code(204);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  }
};
