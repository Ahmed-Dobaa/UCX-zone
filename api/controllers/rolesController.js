'use strict';

const Boom = require('boom');
const _ = require('lodash');
const path = require('path');
const models = require(path.join(__dirname, '../models/index'));


module.exports = {
  findRolesForLoggedInUser: async function (request, reply) {
    try {
      const foundRoles = await models.users.findOne({
        where: { id: request.auth.decoded.id },
        attributes: ['subscription', 'generalRole', 'accessGroup'],
        include: [
          {
            association: 'role',
            include: [{ association: 'permissions', through: { attributes: [] } }]
          }
        ],

      });

      return reply.response(foundRoles).code(200);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  find: async function (request, reply) {
    try {
      const limit = parseInt(request.query.per_page) || 25;
      const offset = parseInt((request.query.page-1) * request.query.per_page) || 0;
      const foundRoles = await models.roles.findAndCountAll({
        distinct: true,
        include: [{ association: 'permissions', through: { attributes: [] } }],
        limit: limit,
        offset: offset,
        order: [['createdAt', 'DESC']],
      });

      return reply.response(foundRoles).code(200);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  findOne: async function (request, reply) {
    try {
      const foundRole = await models.roles.findOne({
        where: { id: request.params.id },
        include: [{ association: 'permissions', through: { attributes: [] } }]
      });

      return reply.response(foundRole|| {}).code(200);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  create: async function (request, reply) {
    let transaction = null;
    try {

      transaction = await models.sequelize.transaction();
      const createdRole = await models.roles.create(request.payload, { transaction });
      const rolesPermissions = [];

      _.forEach(request.payload.permissions, function (permissionId) {
        rolesPermissions.push({ roleId: createdRole.id, permissionId: permissionId });
      });

      await models.rolesPermissions.bulkCreate(rolesPermissions, { transaction });
      await transaction.commit();

      return reply.response(createdRole).code(201);
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
    let transaction = null;
    try {
      const { payload } = request;
      const foundRole = await models.roles.findOne({ where: { id: request.params.id }, include: [{ association: 'permissions', through: { attributes: [] } }] });

      if(_.isEmpty(foundRole)) {
        return Boom.notFound('Role You Try To Update Not Exist');
      }
      transaction = await models.sequelize.transaction();
      const rolesPermissions = [];

      _.filter(request.payload.permissions, function (permissionId) {
        rolesPermissions.push({ roleId: foundRole.id, permissionId: permissionId });
      });

      await models.roles.update(payload, { where: { id: request.params.id } });
      await models.rolesPermissions.destroy({ where: { roleId: foundRole.id }, transaction });
      await models.rolesPermissions.bulkCreate(rolesPermissions, { transaction });
      await transaction.commit();


      return reply.response().code(204);
    }
    catch (e) {
      console.log('error', e);

      if(transaction) {
        await transaction.rollback();
      }

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  delete: async function (request, reply) {
    let transaction = null;
    try {

      transaction = await models.sequelize.transaction();
      await models.rolesPermissions.destroy({ where: { roleId: request.params.id }, transaction });
      await models.roles.destroy({ where: { id: request.params.id } });

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
