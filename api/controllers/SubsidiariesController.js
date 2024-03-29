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
    let CompanyTranslation = null;
    try {
      const { companyId } = request.params;
      const { payload } = request;
      payload.user_id = request.params.userId;
      payload.type = 'subsidary';
      Company = await models.companiesBasicDataTranslation.findOne({ where: { registrationIdNo: payload.registrationIdNo } });
      // companiesBasicData
      if(!_.isEmpty(Company)) { // If company already exists, just add the relation to companies_relations table.

        if(Company.id === companyId) { // End user might sent request.param.companyId == foundCompay.id to avoid that do this check.
          return Boom.badData('Can not make a company subsidiary for it\'s self.');
        }

        if(!payload.phoneNumbers.includes('-')) {
          if(transaction){
            await transaction.rollback();
          }
          return Boom.badData('Please enter the country code');
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
            sharePercentage: payload.sharePercentage,
            haveManagementRight: payload.haveManagementRight
          });
        }

        return reply.response({ status: 200, message: "success"}).code(HTTP_SUCCESS_CODE);
      }
      // If company doesn't exist, then create the company, add the relation to companies_relations table and send role request.
      transaction = await models.sequelize.transaction();
      if(!payload.phoneNumbers.includes('-')) {
        if(transaction){
          await transaction.rollback();
        }
        return Boom.badData('Please enter the country code');
      }
      let _sectors = [];
      for(let i = 0; i < payload.sector.length; i++){
        _sectors.push(payload.sector[i].name)
      }
      payload.sector = null
      payload.sector = _sectors;


      let _subsectors = [];
      for(let i = 0; i < payload.subSector.length; i++){
        _subsectors.push(payload.subSector[i].name)
      }
      payload.subSector = null
      payload.subSector = _subsectors;

      Company = await models.companiesBasicData.create(payload, { transaction });
      payload.companyBasicDataId = Company.id;
      payload.languageId = 'en'; //request.pre.languageId;
       CompanyTranslation = await models.companiesBasicDataTranslation.create(payload, { transaction });

       let investeePayload = {companyId: Company.id,
                              code: '123456789',
                            createdBy: request.params.userId}
                            console.log(Company.id)
      let investee = await models.investee.create(investeePayload, { transaction });
      payload.investeeId = investee.id;
      let investeeTrans = await models.investeeTranslation.create(payload, { transaction });

      await models.companies_relations.create({
        parentId: companyId,
        childId: Company.id,
        sharePercentage: payload.sharePercentage,
        haveManagementRight: payload.haveManagementRight
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
   let transaction = await models.sequelize.transaction();
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

      if(!payload.phoneNumbers.includes('-')) {
        if(transaction){
          await transaction.rollback();
        }
        return Boom.badData('Please enter the country code');
      }

      const updatedCompany = await models.companies_relations.update(payload, {
        where: {
          parentId: companyId,
          childId: id
        }
      });
  //  console.log(payload.companyBasicData.companiesBasicDataTranslation);
  //  console.log(request.params.id)
      // let dataTranslation = await models.companiesBasicDataTranslation.findOne({ where: { id: request.params.companyId }});
      let _sectors = [];
      for(let i = 0; i < payload.sector.length; i++){
        _sectors.push(payload.sector[i].name)
      }
      payload.sector = null
      payload.sector = _sectors;


      let _subsectors = [];
      for(let i = 0; i < payload.subSector.length; i++){
        _subsectors.push(payload.subSector[i].name)
      }
      payload.subSector = null
      payload.subSector = _subsectors;
      await models.companiesBasicData.update(payload, { where: { id: request.params.id }, transaction });
      await models.companiesBasicDataTranslation.update(payload, { where: { companyBasicDataId: request.params.id }, transaction });
      await transaction.commit();
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

