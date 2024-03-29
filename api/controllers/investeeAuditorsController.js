'user strict';

const _ = require('lodash');
const Boom = require('boom');
const path = require('path');

const models = require(path.join(__dirname, '../', 'models/index'));
const errorService = require(path.join(__dirname, '../','services/errorService'));


module.exports = {
  findAll: async function (request, reply) {
    try {
      const language = 1; //request.pre.languageId;
      const foundAuditors = await models.investeeAuditor.findAndCountAll({
        where: { investeeId: request.params.companyId },
        include: [{ association: 'auditorTranslation', where: { languageId: language }, required: true }]
      });

      return reply.response(foundAuditors).code(200);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },
  findOne: async function (request, reply) {
    try {
      const language = 1; //request.pre.languageId;
      const foundAuditor = await models.investeeAuditor.findOne({
        where: { id: request.params.auditorId },
        include: [{ association: 'auditorTranslation', where: { languageId: language }, required: true }]
      });

      return reply.response(foundAuditor || {}).code(200);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },
  create: async function (request, reply) {
    let transaction;
    try {
      let language = 'en'; //request.pre.languageId;
      // request.payload.investeeId = request.params.companyId;
      request.payload.createdBy = request.params.userId; //request.auth.decoded.id;
      const foundInvesteeCompanies = await models.investee.findOne({ where: { id: request.params.investeeId } }); // id
//companyId: request.params.companyId
      if(_.isEmpty(foundInvesteeCompanies)) {

        return Boom.notFound('The Investee Company Is Not Found, You have to create It First');
      }
      request.payload.investeeId = foundInvesteeCompanies.id;
      transaction = await models.sequelize.transaction();

      const createdAuditor = await models.investeeAuditor.create(request.payload, { transaction });
      request.payload.auditorTranslation.languageId = language;
      request.payload.auditorTranslation.investeeAuditorId = createdAuditor.id;
      console.log(request.payload.auditorTranslation)
      const createdAuditorTranslation = await models.investeeAuditorTranslation.create(request.payload.auditorTranslation, { transaction });

      // let translation = request.payload.auditorTranslation.translation;
      // let langauges = ['ar', 'fr', 'po', 'sp'];
      // for(let k = 0; k < langauges.length; k++){
      //  let obj = request.payload.auditorTranslation;

      //  for(let i = 0; i < translation.length; i++){
      //    let column;
      //    switch(langauges[k]){
      //      case 'ar':
      //          obj["languageId"] = 'ar';
      //           column = translation[i].propertyName;
      //          obj[column] = translation[i].translation.Ar;
      //      break;
      //      case 'fr':
      //          obj["languageId"] = 'fr';
      //           column = translation[i].propertyName;
      //          obj[column] = translation[i].translation.Fr;
      //      break;
      //      case 'po':
      //          obj["languageId"] = 'po';
      //           column = translation[i].propertyName;
      //          obj[column] = translation[i].translation.Po;
      //      break;
      //      case 'sp':
      //          obj["languageId"] = 'sp';
      //           column = translation[i].propertyName;
      //          obj[column] = translation[i].translation.Sp;
      //      break;
      //      default:
      //        break;
      //    }
      //  }
      // await models.investeeAuditorTranslation.create(obj, { transaction });
      //    }

      await transaction.commit();

      return reply.response(_.assign(createdAuditor.toJSON(), { auditorTranslation: createdAuditorTranslation.toJSON() })).code(201);
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
      const language = 1; //request.pre.languageId;
      const foundInvestee = await models.investee.findOne({
        where: { id: request.params.companyId },
        include: [
          {
            association: 'auditors',
            where: { id: request.params.id },
            required: false,
            include: [
              {
                association: 'auditorTranslation',
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

      if(_.isEmpty(foundInvestee.auditors)) {

        return Boom.notFound('The Investee auditor Is Not Found, You have to create It First');
      }

      if(!_.isEmpty(foundInvestee.auditors[0].auditorTranslation)) {

        return Boom.notFound('The Investee auditor Has Been Translated To That Language');
      }

      transaction = await models.sequelize.transaction();

      request.payload.auditorTranslation.investeeAuditorId = request.params.id;
      request.payload.auditorTranslation.languageId = language;
      const investeeManagementTranslation = await models.investeeAuditorTranslation.create(request.payload.auditorTranslation, { transaction });
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
      const language = 'en'; //request.pre.languageId;
      const foundAuditor = await models.investeeAuditor.findOne({ where: { id: request.params.auditorId }, raw: true });
      if(_.isEmpty(foundAuditor)) {

        return Boom.notFound('Investee Auditor You Try To Update does Not Exist, You have to create It First');
      }
      transaction = await models.sequelize.transaction();

      await models.investeeAuditor.update(request.payload, { where: { id: request.params.auditorId }, transaction });

      if(!_.isEmpty(request.payload.auditorTranslation)) {
        request.payload.auditorTranslation.languageId = language;

        await models.investeeAuditorTranslation.update(request.payload.auditorTranslation,
          { where: { id: request.params.auditorTranslationId }, transaction });  // payload.auditorTranslation.id
      }
      await transaction.commit();

      return reply.response({ status: 200, message: "Updated successfully"}).code(200);
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

      await models.investeeAuditor.destroy({ where: { id: request.params.auditorId } });

      return reply.response().code(204);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  }
};
