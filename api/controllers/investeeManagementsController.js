'user strict';

const _ = require('lodash');
const Boom = require('boom');
const path = require('path');

const models = require(path.join(__dirname, '../','models/index'));
const errorService = require(path.join(__dirname, '../','services/errorService'));

module.exports = {
  findAll: async function (request, reply) {
    try {

      const language = request.pre.languageId;
      const foundManagements = await models.investeeManagement.findAndCountAll({
        where: { investeeId: request.params.companyId },
        include: [
          { association: 'managementTranslation', where: { languageId: language }, required: true },
          { association: 'position', as: 'position' }
        ]
      });

      return reply.response(foundManagements).code(200);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },
  findOne: async function (request, reply) {
    try {

      const language = request.pre.languageId;
      const foundManagement = await models.investeeManagement.findOne({
        where: { id: request.params.managementId },
        include: [
          { association: 'managementTranslation', where: { languageId: language }, required: true },
          { association: 'position', as: 'position', required: true }
        ]
      });

      return reply.response(foundManagement || {}).code(200);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },
  create: async function (request, reply) {
    let transaction;

    try {
      const language = request.pre.languageId;
      request.payload.investeeId = request.params.companyId;
      request.payload.createdBy = request.auth.decoded.id;
      const foundInvestee = await models.investee.findOne({ where: { id: request.params.companyId } });

      if(_.isEmpty(foundInvestee)) {

        return Boom.notFound('The Investee Company Is Not Found, You have to create It First');
      }

      transaction = await models.sequelize.transaction();

      const createdInvesteeManagement = await models.investeeManagement.create(request.payload, { transaction });
      request.payload.managementTranslation.languageId = language;
      request.payload.managementTranslation.investeeManagementId = createdInvesteeManagement.id;
      const investeeManagementTranslation = await models.investeeManagementTranslation.create(request.payload.managementTranslation, { transaction });
      await transaction.commit();

      return reply.response(_.assign(createdInvesteeManagement.toJSON(), { managementTranslation: investeeManagementTranslation.toJSON() })).code(201);
    }
    catch (e) {
      console.log('error', e);

      if(transaction) {
        await transaction.rollback();
      }

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },
  translate: async function (request, reply) {
    let transaction;

    try {
      const language = request.pre.languageId;
      const foundInvestee = await models.investee.findOne({
        where: { id: request.params.companyId },
        include: [
          {
            association: 'managements',
            where: { id: request.params.id },
            include: [
              {
                association: 'managementTranslation',
                where: { languageId: language },
                required: false,
              }
            ]
          }
        ]
      });

      if(_.isEmpty(foundInvestee)) {

        return Boom.notFound('The Investee Company Is Not Found, You have to create It First');
      }

      if(_.isEmpty(foundInvestee.managements)) {

        return Boom.notFound('The Investee management Is Not Found, You have to create It First');
      }

      if(!_.isEmpty(foundInvestee.managements[0].managementTranslation)) {

        return Boom.notFound('The Investee auditor Has Been Translated To That Language');
      }

      transaction = await models.sequelize.transaction();

      request.payload.managementTranslation.investeeManagementId = request.params.id;
      request.payload.managementTranslation.languageId = language;
      const investeeManagementTranslation = await models.investeeManagementTranslation.create(request.payload.managementTranslation, { transaction });
      await transaction.commit();

      return reply.response(investeeManagementTranslation).code(201);
    }
    catch (e) {
      console.log('error', e);

      if(transaction) {
        await transaction.rollback();
      }

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },
  update: async function (request, reply) {
    let transaction;
    try {
      const language = request.pre.languageId;
      const foundManagement = await models.investeeManagement.findOne({
        where: { id: request.params.managementId },
        include: [{ association: 'managementTranslation', required: true, where: { languageId: language } }],
      });

      if(_.isEmpty(foundManagement)) {

        return Boom.notFound('Investee Management You Try To Update Does Not Exist');
      }

      transaction = await models.sequelize.transaction();
      await models.investeeManagement.update(request.payload, { where: { id: request.params.managementId }, transaction });

      if(!_.isEmpty(request.payload.managementTranslation)) {
        request.payload.managementTranslation.languageId = language;
        await models.investeeManagementTranslation.update(request.payload.managementTranslation,
          { where: { id: foundManagement.managementTranslation.id }, transaction });

      }
      await transaction.commit();

      return reply.response().code(200);
    }
    catch (e) {
      console.log('error', e);

      if(transaction) {
        await transaction.rollback();
      }

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },
  delete: async function (request, reply) {
    try {

      await models.investeeManagement.destroy({ where: { id: request.params.managementId } });

      return reply.response().code(204);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  }
};
