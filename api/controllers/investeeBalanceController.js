'user strict';

const _ = require('lodash');
const Boom = require('boom');
const path = require('path');
const models = require(path.join(__dirname, '../', 'models/index'));
const qsToSequelizeQuery = require(path.join(__dirname, '../','services/qsToSequelizeQuery'));
const errorService = require(path.join(__dirname, '../','services/errorService'));

module.exports = {
  findAll: async function (request, reply) {
    try {
      const language = request.pre.languageId;
      const sequelizeQuery = qsToSequelizeQuery(request.query, models.investee.attributes);
      sequelizeQuery.include.push({ association: 'balanceTranslation', required: true, where: { languageId: language } });
      const foundInvesteeBalances = await models.investeeBalances.findAndCountAll(sequelizeQuery);

      return reply.response(foundInvesteeBalances || {}).code(200);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e);
    }
  },
  findOne: async function (request, reply) {
    try {
      const language = request.pre.languageId;
      const sequelizeQuery = qsToSequelizeQuery(request.query, models.investee.attributes);
      sequelizeQuery.include.push({ association: 'balanceTranslation', required: true, where: { languageId: language } });
      const foundInvesteeBalance = await models.investeeBalances.findOne(
        {
          where: { id: request.params.id },
          include: { association: 'balanceTranslation', required: true, where: { languageId: language } }
        });

      return reply.response(foundInvesteeBalance || {}).code(200);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e);
    }
  },
  create: async function (request, reply) {
    try {
      const language = request.pre.languageId;
      const { payload } = request;

      payload.investeeId = request.params.investeeId;
      payload.createdBy = request.params.userId; //auth.decoded.id;

      const foundInvesteeCompanies = await models.investee.findOne({ where: { id: request.params.investeeId } });

      if(_.isEmpty(foundInvesteeCompanies)) {
        return Boom.badRequest('The Investee Company balance Does Not Exist');
      }

      const foundInvesteeBalance = await models.investeeBalances.findOne({
        where: { investeeId: request.params.investeeId },
        include: [{ association: 'balanceTranslation', required: true, where: { languageId: language, year: request.payload.year } }],
        raw: true
      });

      if(!_.isEmpty(foundInvesteeBalance)) {
        return Boom.badRequest(`Investee balance for ${request.payload.year} already created before, it can be updated only.`);
      }

      const createdInvesteeBalance = await models.investeeBalances.create({ investeeId: request.params.investeeId, createdBy: request.params.userId});

      let createdInvesteeBalanceTranslation= null
      for(let i = 0; i < payload.length; i++){
          payload[i].languageId = language;
          payload[i].investeeBalanceId = createdInvesteeBalance.id;
         createdInvesteeBalanceTranslation = await models.investeeBalanceTranslation.create(payload[i]);
      }


      return reply.response(_.set(createdInvesteeBalance.dataValues, 'translation', createdInvesteeBalanceTranslation.dataValues)).code(201);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  translate: async function (request, reply) {
    try {
      const language = request.pre.languageId;
      const { payload } = request;

      payload.investeeId = request.params.investeeId;
      payload.createdBy = request.auth.decoded.id;

      const foundInvesteeCompanies = await models.investee.findOne({ where: { id: request.params.investeeId } });

      if(_.isEmpty(foundInvesteeCompanies)) {
        return Boom.badRequest('The Investee Company balance Does Not Exist');
      }

      const foundInvesteeBalance = await models.investeeBalances.findOne({
        where: { investeeId: request.params.investeeId },
        include: [{ association: 'balanceTranslation', required: true, where: { languageId: language, year: request.payload.year } }],
        raw: true
      });

      if(!_.isEmpty(foundInvesteeBalance)) {
        return Boom.badRequest(`Investee balance for ${request.payload.year} already created before, it can be updated only.`);
      }

      const createdInvesteeBalance = await models.investeeBalances.create({ investeeId: request.params.investeeId, createdBy: request.auth.decoded.id });
      payload.languageId = language;
      payload.investeeBalanceId = createdInvesteeBalance.id;
      const createdInvesteeBalanceTranslation = await models.investeeBalanceTranslation.create(payload);

      return reply.response(_.set(createdInvesteeBalance.dataValues, 'translation', createdInvesteeBalanceTranslation.dataValues)).code(201);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  update: async function (request, reply) {
    try {
      const language = request.pre.languageId;
      const foundInvesteeBalance = await models.investeeBalances.findOne({
        where: { id: request.params.id }
        // include: [{ association: 'balanceTranslation', required: true, where: { languageId: language } }]
      });

      if(_.isEmpty(foundInvesteeBalance)) {

        return Boom.notFound('Investee balance You Try To Update Does Not Exist');
      }
      const foundInvesteeBalanceTranslation = await models.investeeBalanceTranslation.findAll({
        where: { investeeBalanceId: foundInvesteeBalance.id}
      });

      for(let i = 0; i < request.payload.length; i++){
        await models.investeeBalanceTranslation.update(request.payload[i], { where: { id: foundInvesteeBalanceTranslation[i].id } });
      }


      return reply.response({status: 200, message: "Updated successfully"}).code(200);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  delete: async function (request, reply) {
    try {

      await models.investeeBalances.destroy({ where: { id: request.params.id } });

      return reply.response().code(204);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  }
};
