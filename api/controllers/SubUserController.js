'user strict';
const path = require('path');
const _ = require('lodash');
const Boom = require('boom');
const sequelize = require('sequelize');

const models = require(path.join(__dirname, '../models/index'));
const Mailer = require(path.join(__dirname, '../services/sendEmailService'));
const userService = require(path.join(__dirname, '../services/userService'));
const errorService = require(path.join(__dirname, '../services/errorService'));

const isGrantedPermissionsValid = async (userRoleId, subUserRoleId) => {
  let parentUserPermissions = await models.roles.findOne({ where: { id: userRoleId }, include: [{ association: 'permissions', through: { attributes: [] }, attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] } }] });
  let subUserPermissions= await models.roles.findOne({ where: { id: subUserRoleId }, include: [{ association: 'permissions', through: { attributes: [] }, attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] } }] });
  parentUserPermissions = parentUserPermissions.toJSON();
  subUserPermissions = subUserPermissions.toJSON();

  return _.every(subUserPermissions.permissions,(permission) => _.find(parentUserPermissions.permissions, (parentPermission) => parentPermission.resource === permission.resource && parentPermission.action === permission.action));

};

module.exports = {
  findAll: async function (request, reply) {
    try {
      const foundUsers = await models.users.findAll({
        where: { '': sequelize.fn('JSON_CONTAINS', sequelize.col('accessGroup'), request.auth.decoded.id.toString()) },
        attributes: ['id', 'name', 'email', 'generalRole', 'active', 'country', 'phoneNumber', 'dob']
      });

      return reply.response(foundUsers).code(200);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e);
    }
  },
  findOne: async function (request, reply) {
    try {
      const foundUser = await models.users.findOne({
        where: { id: request.params.id,'': sequelize.fn('JSON_CONTAINS', sequelize.col('accessGroup'), request.auth.decoded.id.toString()) },
        attributes: ['id', 'name', 'email', 'generalRole', 'active', 'country', 'phoneNumber', 'dob']
      });

      return reply.response(foundUser||{}).code(200);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e);
    }
  },
  create: async function (request, reply) {
    let transaction = null;
    const companies = { IE: ['usersInvestees', 'investeeId'], IR: ['usersInvestors', 'investorId'], SP: ['usersServiceProviders', 'serviceProviderId'] };
    const { companyType } = request.payload;
    request.payload.activationToken = userService.generateActivationToken();
    request.payload.secret = userService.generateActivationToken();
    request.payload.country = request.location;
    try {
      const foundRole = await models.roles.findOne({ where: { id: request.payload.role } });

      if(_.isEmpty(foundRole)) {
        return Boom.notFound('Role U Need To Assign To User Is Not Found.');
      }

      const userRoleOnCompany = await models[companies[companyType][0]].findOne({
        where: {
          userId: request.auth.decoded.id,
          [ companies[companyType][1]]: request.payload.companyId
        }
      });


      if(!isGrantedPermissionsValid(userRoleOnCompany.roleId, request.payload.role)) {
        return Boom.forbidden('You cant grant role with higher permissions than you role to a sub user.');
      }

      let userAccessGroup = await models.users.findOne({ where: { id: request.auth.decoded.id }, attributes: ['accessGroup'] });

      userAccessGroup = _.uniq(_.concat(request.auth.decoded.id, userAccessGroup.userAccessGroup || []));
      const foundSubUser = await models.users.findOne({ where: { email: request.params.email } });

      if(!_.isEmpty(foundSubUser)) {
        userAccessGroup = _.uniq(_.concat(userAccessGroup, foundSubUser.accessGroup || []));
      }

      transaction = await models.sequelize.transaction();
      let userObject = Object.assign(request.payload, foundSubUser);
      userObject.accessGroup = userAccessGroup;
      userObject = new models.users(userObject);
      const createdUser = await userObject.save({ transaction });
      await models[companies[companyType][0]].create({ userId: createdUser.id, [companies[companyType][1]]: request.payload.companyId, roleId: request.payload.role }, transaction);
      await transaction.commit();

      Mailer.sendInvitationMailToUser(request.payload.email, createdUser.name ,'company name', request.payload.activationToken);

      return reply.response(createdUser).code(201);
    }
    catch (e) {
      console.log('error', e);

      if(transaction) {
        transaction.rollback();
      }

      return errorService.wrapError(e);
    }
  },
  update: async function (request, reply) {
    let transaction = null;
    try {
      const companies = { IE: ['usersInvestees', 'investeeId'], IR: ['usersInvestors', 'investorId'], SP: ['usersServiceProviders', 'serviceProviderId'] };
      const { companyType } = request.payload;
      const foundUser = await models.users.findOne({
        where: { id: request.params.id },
        attributes: ['id', 'name', 'email', 'generalRole', 'active', 'country', 'phoneNumber', 'dob', 'accessGroup']
      });

      if(_.isEmpty(foundUser)) {
        return Boom.notFound('User not found.');
      }

      if(!_.includes(foundUser.accessGroup, request.auth.decoded.id)) {
        return Boom.notFound('You Don Not Have rights To Update This User.');
      }

      const foundRole = await models.roles.findOne({ where: { id: request.payload.role } });

      if(_.isEmpty(foundRole)) {
        return Boom.notFound('Role not found.');
      }

      const userRoleOnCompany = await models[companies[companyType][0]].findOne({
        where: {
          userId: request.auth.decoded.id,
          [ companies[companyType][1]]: request.payload.companyId
        }
      });

      if(!isGrantedPermissionsValid(userRoleOnCompany.roleId, request.payload.role)) {
        return Boom.forbidden('You cant grant role with higher permissions than you role to a sub user.');
      }

      transaction = await models.sequelize.transaction();

      await models.users.update(request.payload, { where: { id: request.params.id }, transaction });
      await models[companies[companyType][0]].update(
        { roleId: request.payload.role },
        { where: { userId: request.params.id, [companies[companyType][1]]: request.payload.companyId, }, transaction },
      );
      await transaction.commit();

      return reply.response().code(204);
    }
    catch (e) {
      console.log('error', e);

      if(transaction) {
        await transaction.rollback();
      }

      return errorService.wrapError(e);
    }

  },
  delete: async (request, reply) => {
    try {

      await models.users.destroy({ where: { id: request.params.id } });
      await models.usersInvestees.destroy({ where: { userId: request.params.id } });
      await models.usersInvestors.destroy({ where: { userId: request.params.id } });
      await models.usersServiceProviders.destroy({ where: { userId: request.params.id } });

      return reply.response().code(204);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  }
};
