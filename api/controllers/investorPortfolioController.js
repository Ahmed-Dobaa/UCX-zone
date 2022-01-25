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
      // const language = 'en'; //request.pre.languageId;

      const foundInvestor = await models.investor.findOne({ where: { id: request.params.investorId } });

      if(_.isEmpty(foundInvestor)) {

        return Boom.notFound('The Investor Is Not Found, You have to create It First');
      }
      let createdInvestorPortfolio = null;
      transaction = await models.sequelize.transaction();
  for(let i = 0; i < request.payload.length; i++ ){
    let sector = [];
    for(let x = 0; x < request.payload[i].sector.length; x++){
      sector.push(request.payload[i].sector[x].name);
      request.payload[i]["sectors"] = sector;
     }
     request.payload[i]["country_name"] = request.payload[i].name,
     request.payload[i]["ownership_percentage"] = request.payload[i].pOfOwnership,
     request.payload[i]["headquarter_country"] = request.payload[i].country,

    request.payload[i].investor_id = request.params.investorId;
      createdInvestorPortfolio = await models.investor_portfolio.create(request.payload[i], { transaction });
  }
      await transaction.commit();

      return reply.response(_.assign(createdInvestorPortfolio.toJSON())).code(201);
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
      const foundManagement = await models.investorManagement.findOne({ where: { id: request.params.managementId }, raw: true });



      transaction = await models.sequelize.transaction();

      for(let i = 0; i < request.payload.length; i++ ){
        let sector = [];
        for(let x = 0; x < request.payload[i].sector.length; x++){
          sector.push(request.payload[i].sector[x].name);
          request.payload[i]["sectors"] = sector;
         }
         request.payload[i]["country_name"] = request.payload[i].name,
         request.payload[i]["ownership_percentage"] = request.payload[i].pOfOwnership,
         request.payload[i]["headquarter_country"] = request.payload[i].country,

        request.payload[i].investor_id = request.params.investorId;
          createdInvestorPortfolio = await models.investor_portfolio.update(request.payload[i], { where: { id: request.payload[i].id },  transaction });
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

      await models.investor_portfolio.destroy({ where: { id: request.params.id }, transaction });
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
