'use strict';

const Boom = require('boom');
const path = require('path');
const models = require(path.join(__dirname, '../models/index'));
const _ = require('lodash');

const HTTP_SUCCESS_CODE = 200;

module.exports = {
  findAll: async function (request, reply) {
    try {

      const foundSubsidiariesIds = await models.companies_relations.findAll({
        where: { parentId: request.params.companyId },
        include: [{ model: models.companiesBasicData, as: 'basicData', required: true }]
      });

      return reply.response(foundSubsidiariesIds).code(HTTP_SUCCESS_CODE);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred.');
    }
  },
  findOne: async (request, reply) => {
    try {

      const foundSubsidiary = await models.companies_relations.findOne({
        where: { parentId: request.params.companyId, childId: request.params.id },
        include: [{ model: models.companiesBasicData, as: 'basicData', required: true }]
      });

      return reply.response(foundSubsidiary).code(HTTP_SUCCESS_CODE);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred.');
    }
  },
  create: async (request, reply) => {
    let transaction;
    let Company = null;
    try {
      const { companyId } = request.params;
      const { payload } = request;
      Company = await models.companiesBasicDataTranslation.findOne({ where: { registrationIdNo: payload.payload.registration_id_no } });
      // companiesBasicData
      if(!_.isEmpty(Company)) { // If company already exists, just add the relation to companies_relations table.

        if(Company.id === companyId) { // End user might sent request.param.companyId == foundCompay.id to avoid that do this check.
          return Boom.badData('Can not make a company subsidiary for it\'s self.');
        }

        const foundRelation = await models.companies_relations.findOne({
          where: {
            parentId: companyId,
            childId: Company.id
          }
        });

        if(_.isEmpty(foundRelation)) {
          await models.companies_relations.create({
            parentId: companyId,
            childId: Company.id,
            sharePercentage: payload.sharePercentage
          });
        }

        return reply.response({}).code(HTTP_SUCCESS_CODE);
      }
      // If company doesn't exist, then create the company, add the relation to companies_relations table and send role request.
      transaction = await models.sequelize.transaction();
      Company = await models.companiesBasicData.create(payload.payload, { transaction });

      await models.companies_relations.create({
        parentId: companyId,
        childId: Company.id,
        sharePercentage: payload.payload.sharePercentage
      }, { transaction });
      await transaction.commit();

      return reply.response(Company.dataValues).code(HTTP_SUCCESS_CODE);
    }
    catch (e) {
      console.log('error', e);

      if(transaction) {
        await transaction.rollback();
      }

      return Boom.badImplementation('An internal server error occurred.');
    }
  },
  update: async function (request, reply) {
    try {
      const { payload } = request;
      const { companyId, id } = request.params;
      const foundRelation = await models.companies_relations.findOne({
        where: {
          parentId: companyId,
          childId: id
        }
      });

      if(_.isEmpty(foundRelation)) {
        return Boom.notFound('You don\'t have this company as subsidiary.');
      }

      const updatedCompany = await models.companies_relations.update(payload, {
        where: {
          parentId: companyId,
          childId: id
        }
      });

      return reply.response({ status: 200, message: "Updated successfully"}).code(HTTP_SUCCESS_CODE);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred.');
    }
  },
  delete: async (request, reply) => {
    try {

      const { companyId, id } = request.params;
      await models.companies_relations.destroy({ where: { parentId: companyId, childId: id } });

      return reply.response().code(204);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred.');
    }
  }
};

