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
      const foundSectors = await models.sectors.findAll({ include: [{ association: 'sectorsTranslation', required: true }] });
      return reply.response(foundSectors).code(200);
    }
    catch (e) {
      console.log('error', e);
      return Boom.badImplementation('An internal server error occurred');
    }
  },
  sectors: async function (request, reply) {
      try {
           const sectors = await models.sectorsTranslation.findAll({ order: [['name', 'ASC']] })
           return reply.response(sectors).code(200);
      } catch (error) {

      }
  },

  findOne: async function (request, reply) {
    try {
      const foundSector = await models.sectors.findOne({
        where: { id: request.params.id },
        include: [{ association: 'sectorsTranslation', required: true, where: { languageId: request.pre.languageId } }]
      });
      return reply.response(foundSector|| {}).code(200);
    }
    catch (e) {
      console.log('error', e);
      return Boom.badImplementation('An internal server error occurred');
    }
  },
  create: async function (request, reply) {
    let transaction;
    try {
      const foundSector = await models.sectors.findOne({
        include: [
          { association: 'sectorsTranslation', required: true, where: { languageId: request.pre.languageId, name: request.payload.name } }
        ]
      });
      if(!_.isEmpty(foundSector)) {
        return Boom.response('The Sector Already Exists').code(200);
      }

      transaction = await models.sequelize.transaction();
      const createdSector = await models.sectors.create({ transaction });
      await models.sectorsTranslation.create({ sectorId: createdSector.dataValues.id, languageId: request.pre.languageId, name: request.payload.name }, { transaction });
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
      const foundSector = await models.sectors.findOne({
        where: { id: request.params.id },
        include: [
            { association: 'sectorsTranslation', required: true, where: { languageId: request.pre.languageId } }
        ]
      });
      if(_.isEmpty(foundSector)) {
        return Boom.notFound('Sector You Try To Update does Not Exist');
      }
      await models.sectorsTranslation.update(request.payload, { where: { sectorId: foundSector.id, languageId: request.pre.languageId } });
      return reply.response().code(204);
    }
    catch (e) {
      console.log('error', e);
      return Boom.badImplementation('An internal server error occurred');
    }
  },
  translate: async function (request, reply) {
    try {
      const foundSector = await models.sectors.findOne({
        where: { id: request.params.id },
        include: [
          { association: 'sectorsTranslation', required: false, where: { languageId: request.pre.languageId } }
        ]
      });
      if(_.isEmpty(foundSector)) {
        return Boom.notFound('sector You Try To Update Not Exist');
      }
      if(!_.isEmpty(foundSector.sectorsTranslation)) {
        return reply.response(foundSector.dataValues).code(200);
      }
      await models.sectorsTranslation.create({ sectorId: request.params.id,languageId: request.pre.languageId,name: request.payload.name });
      return reply.response(request.payload).code(200);

    }
    catch (e) {
      console.log('error', e);
      return Boom.badImplementation('An internal server error occurred');
    }
  },
  delete: async function (request, reply) {
    try {
      const sectorId = request.params.id;
      await models.sectors.destroy({ where: { id: sectorId } });
      return reply.response().code(204);
    }
    catch (e) {
      console.log('error', e);
      return Boom.badImplementation('An internal server error occurred');
    }
  }
};
