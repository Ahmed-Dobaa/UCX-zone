'use strict';

const Boom = require('boom');
const _ = require('lodash');
const path = require('path');
const models = require(path.join(__dirname, '../models/index'));


module.exports = {
  find: async function (request, reply) {
    try {
      const permissions = await models.permissions.findAll({ raw: true });

      return reply.response(permissions).code(200);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  findOne: async function (request, reply) {
    try {
      const foundPermission = await models.permissions.findOne({ where: { id: request.params.id }, raw: true });

      return reply.response(foundPermission || {}).code(200);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  create: async function (request, reply) {
    try {
      const { payload } = request;
      const createdPermission = await models.permissions.create(payload);

      return reply.response(createdPermission.toJSON()).code(201);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  update: async function (request, reply) {
    try {
      const { payload } = request;
      const foundPermission = await models.permissions.findOne({ where: { id: request.params.id } });

      if(_.isEmpty(foundPermission)) {
        return Boom.notFound('Permission You Try To Update Not Exist');
      }

      payload.attributes = _.unique(_.concat(foundPermission.attributes, payload.attributes));

      await models.permissions.update(payload, { where: { id: request.params.id } });

      return reply.response().code(200);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  delete: async function (request, reply) {
    let transaction = null;
    try {

      transaction = await models.sequelize.transaction();
      await models.rolesPermissions.destroy({ where: { permissionId: request.params.id }, transaction });
      await models.permissions.destroy({ where: { id: request.params.id } });

      return reply.response().code(204);
    }
    catch (e) {
      console.log('error', e);

      if(transaction) {
        await transaction.rollback();
      }

      return Boom.badImplementation('An internal server error occurred');
    }
  }
};