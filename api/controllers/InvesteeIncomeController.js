'use strict';

const Boom = require('boom');
const _ = require('lodash');
const path = require('path');
const models = require(path.join(__dirname, '../models/index'));
const qsToSequelizeQuery = require(path.join(__dirname, '../','services/qsToSequelizeQuery'));
const errorService = require(path.join(__dirname, '../','services/errorService'));

module.exports = {
  find: async function (request, reply) {
    try {
      const language = 1; //request.pre.languageId;
      const sequelizeQuery = qsToSequelizeQuery(request.query, models.investee.attributes);
      sequelizeQuery.include.push({ association: 'incomeTranslation', required: true, where: { languageId: language } });
      const foundInvesteeIncomes = await models.investeeIncomes.findAndCountAll(sequelizeQuery);

      return reply.response(foundInvesteeIncomes || {}).code(200);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e);
    }
  },
  findOne: async function (request, reply) {
    try {
      const language = 1; //request.pre.languageId;
      const foundInvesteeIncome = await models.investeeIncomes.findOne(
        {
          where: { id: request.params.id },
          include: { association: 'incomeTranslation', required: true, where: { languageId: language } }
        });

      return reply.response(foundInvesteeIncome|| {}).code(200);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e);
    }
  },
  create: async function (request, reply) {
    console.log("insert")
    let transaction;
    try {
      const language = 1; //request.pre.languageId;
      // const { payload } = request;
      const foundInvesteeCompany = await models.investee.findOne({ where: { id: request.params.investeeId } });
      if(_.isEmpty(foundInvesteeCompany)) {

        return Boom.notFound('The Investee Company income Is Not Found');
      }
      for(let i = 0; i < request.payload.length; i++){
        const investeeIncome = await models.investeeIncomes.findOne({
          where: { investeeId: request.params.investeeId },
          include: [{ association: 'incomeTranslation', required: true, where: { languageId: language, year: request.payload[i].year } }]
        });

        if(!_.isEmpty(investeeIncome)) {
          return Boom.notFound(`Investee company income for ${request.payload[i].year} already created before, it can be updated only.`);
        }
      }
      let createdInvesteeIncomeTranslation;
      const investee= {createdBy: request.params.userId, investeeId: request.params.investeeId} ;
   console.log("insidee")
      transaction = await models.sequelize.transaction();
      console.log(investee)
      console.log("request.payload")
      console.log(request.payload)
      const createdInvesteeIncome = await models.investeeIncomes.create(investee);
      for(let i = 0; i < request.payload.length; i++){
        console.log("for")
        request.payload[i].investeeId = request.params.investeeId;
        request.payload[i].createdBy = request.params.userId; // request.auth.decoded.id;
        request.payload[i].languageId = language;
        request.payload[i].Tax = request.payload[i].taxRate;

        request.payload[i].investeeIncomeId = createdInvesteeIncome.id;
        createdInvesteeIncomeTranslation = await models.investeeIncomeTranslation.create(request.payload[i]);

      }
      await transaction.commit();

      return reply.response(_.set(createdInvesteeIncome.dataValues, 'translation', createdInvesteeIncomeTranslation.dataValues)).code(201);
    }
    catch (e) {
      console.log('error', e);

      if(transaction) {
        console.log("here")
        await transaction.rollback();
      }

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  translate: async function (request, reply) {
    let transaction;

    try {
      const language = 1; //request.pre.languageId;
      const { payload } = request;
      const foundInvestee = await models.investee.findOne({
        where: { id: request.params.investeeId },
        include: [
          {
            association: 'incomes',
            where: { id: request.params.id },
            include: [
              {
                association: 'incomeTranslation',
                where: { languageId: language }
              }
            ]
          }
        ]
      });

      if(_.isEmpty(foundInvestee)) {

        return Boom.badRequest('The Investee Company Is Not Found, You have to create It First');
      }

      if(_.isEmpty(foundInvestee.incomes)) {

        return Boom.badRequest('The Investee Income Is Not Found, You have to create It First');
      }

      if(!_.isEmpty(foundInvestee.incomes[0].incomeTranslation)) {

        return Boom.notFound('The Investee Income Has Been Translated To That Language');
      }

      transaction = await models.sequelize.transaction();

      payload.incomeTranslation.investeeIncomeId = request.params.id;
      payload.incomeTranslation.languageId = language;
      const investorManagementTranslation = await models.investeeIncomeTranslation.create(payload.incomeTranslation, { transaction });
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
    try {

      const language = 1; //request.pre.languageId;
      const { payload } = request;

      const foundInvesteeIncome = await models.investeeIncomes.findOne({
        where: { id: request.params.id },
        // include: [{ association: 'incomeTranslation', required: true, where: { languageId: language } }]
      });

      if(_.isEmpty(foundInvesteeIncome)) {

        return Boom.notFound('Investee company income You Try To Update does Not Exist');
      }

      let incomeTranslation  = await models.investeeIncomeTranslation.findAll({
        where: {investeeIncomeId: foundInvesteeIncome.id}});

        for(let i= 0; i < payload.length; i++){
          await models.investeeIncomeTranslation.update(payload[i], { where: { id: incomeTranslation[i].id } });
        }


      return reply.response({ status: 200, message: "Updated successfully"}).code(200);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  delete: async function (request, reply) {
    try {

      await models.investeeIncomes.destroy({ where: { id: request.params.id } });

      return reply.response().code(204);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  }
};
