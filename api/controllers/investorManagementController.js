'user strict';

const _ = require('lodash');
const Boom = require('boom');
const path = require('path');

const models = require(path.join(__dirname, '../','models/index'));
const errorService = require(path.join(__dirname, '../','services/errorService'));

module.exports = {
  findAll: async function (request, reply) {
    try {

      const language = 'en'; //request.pre.languageId;
      const foundManagements = await models.investorManagement.findAndCountAll({
        where: { investorId: request.params.investorId },
        include: [
          { association: 'managementTranslation', where: { languageId: language }, required: true }
        ]
      });

      return reply.response({status: 200, results: foundManagements.rows}).code(200);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },
  findOne: async function (request, reply) {
    try {
      const language = 'en';
      const foundManagement = await models.investorManagement.findOne({
        where: { id: request.params.managementId },
        include: [
          { association: 'managementTranslation', where: { languageId: language }, required: true }
        ]
      });

      return reply.response({status: 200, results: foundManagement} || {}).code(200);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },
  create: async function (request, reply) {
    let transaction;

    try {
      const language = 'en'; //request.pre.languageId;

      const foundInvestor = await models.investor.findOne({ where: { id: request.params.investorId } });

      if(_.isEmpty(foundInvestor)) {

        return Boom.notFound('The Investor Is Not Found, You have to create It First');
      }
      let createdInvestorManagement = null;
      let investorManagementTranslation = null;
      transaction = await models.sequelize.transaction();
  for(let i = 0; i < request.payload.length; i++ ){
    request.payload[i].investorId = request.params.investorId;
      request.payload[i].createdBy = request.params.userId;
    createdInvestorManagement = await models.investorManagement.create(request.payload[i], { transaction });
    request.payload[i].investorManagementTranslation.languageId = language;
    request.payload[i].investorManagementTranslation.investorManagementId = createdInvestorManagement.id;
    investorManagementTranslation = await models.investorManagementTranslation.create(request.payload[i].investorManagementTranslation, { transaction });
  }
      await transaction.commit();

      return reply.response(_.assign(createdInvestorManagement.toJSON(), { managementTranslation: investorManagementTranslation.toJSON() })).code(201);
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
      const foundInvestor = await models.investor.findOne({
        where: { id: request.params.companyId },
        include: [
          {
            association: 'managements',
            where: { id: request.params.id },
            include: [
              {
                association: 'managementTranslation',
                where: { languageId: language }
              }
            ]
          }
        ]
      });

      if(_.isEmpty(foundInvestor)) {

        return Boom.notFound('The Investee Company Is Not Found, You have to create It First');
      }

      if(_.isEmpty(foundInvestor.managements)) {

        return Boom.notFound('The Investee management Is Not Found, You have to create It First');
      }

      if(!_.isEmpty(foundInvestor.managements[0].managementTranslation)) {

        return Boom.notFound('The Investee auditor Has Been Translated To That Language');
      }

      transaction = await models.sequelize.transaction();

      request.payload.managementTranslation.investorManagementId = request.params.id;
      request.payload.managementTranslation.languageId = language;
      const investorManagementTranslation = await models.investorManagementTranslation.create(request.payload.managementTranslation, { transaction });
      await transaction.commit();

      return reply.response(investorManagementTranslation).code(201);
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
      const language = 'en';
      // const foundManagement = await models.investorManagement.findOne({ where: { id: request.params.managementId }, raw: true });

      // if(_.isEmpty(foundManagement)) {
      //   return Boom.notFound('Investor Management You Try To Update Does Not Exist');
      // }

      transaction = await models.sequelize.transaction();
      for(let i = 0; i < request.payload.length; i++){
        await models.investorManagement.update(request.payload[i], { where: { id: request.payload[i].id }, transaction });

        if(!_.isEmpty(request.payload[i].investorManagementTranslation)) {
          request.payload[i].investorManagementTranslation.languageId = language;
          await models.investorManagementTranslation.update(request.payload[i].investorManagementTranslation,
            { where: { id: request.payload[i].investorManagementTranslation.id }, transaction });

        }

      }
            await transaction.commit();

      return reply.response({status: 200, message: "updated successfully"}).code(200);
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
    let transaction;
    try {
      transaction = await models.sequelize.transaction();

      await models.investorManagementTranslation.destroy({ where: { investorManagementid: request.params.managementId }, transaction });
      await models.investorManagement.destroy({ where: { id: request.params.managementId }, transaction });
      await transaction.commit();
      return reply.response({status: 200, message: "deleted successfully"}).code(200);
    }
    catch (e) {
      console.log('error', e);
      if(transaction) {
        await transaction.rollback();
      }
      return errorService.wrapError(e, 'An internal server error occurred');
    }
  }
};
