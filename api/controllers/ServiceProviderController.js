'use strict';

const Boom = require('boom');
const path = require('path');
const _ = require('lodash');

const errorService = require(path.join(__dirname, '../','services/errorService'));
const qsToSequelizeQuery = require(path.join(__dirname, '../','services/qsToSequelizeQuery'));

const models = require(path.join(__dirname, '../models/index'));

module.exports = {
  findAll: async function (request, reply) {
    try {
      const { languageId } = request.pre;
      const sequelizeQuery = qsToSequelizeQuery(request.query, models.serviceProviders.attributes);
      const foundServiceProviderCompanies = await models.serviceProviders.findAndCountAll({
        include: [
          { model: models.serviceProvidersTranslation, as: 'serviceProvidersTranslation', where: { languageId: languageId }, required: true },
          {
            model: models.companiesBasicData, as: 'basicData', required: true,
            include: [{ model: models.companiesBasicDataTranslation, as: 'companiesBasicDataTranslation', where: { languageId: languageId }, required: true }]
          }
        ]
      });

      return reply.response(foundServiceProviderCompanies).code(206);
    }
    catch (e) {
      console.log('e.errors', e);

      return errorService.wrapError(e);
    }
  },
  findOne: async (request, reply) => {
    try {
      const { languageId } = request.pre;
      const foundServiceProviderCompany = await models.serviceProviders.findOne({
        include: [
          { association: 'serviceProvidersTranslation', where: { languageId: languageId }, required: true },
          {
            association: 'basicData', required: true,
            include: [{ association: 'companiesBasicDataTranslation', where: { languageId: languageId }, required: true }]
          },
        ]
      });

      return reply.response(foundServiceProviderCompany || {}).code(200);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },
  create: async (request, reply) => {
    let transaction;

    try {

      transaction = await models.sequelize.transaction();
      const userId = request.auth.decoded.id;
      const { payload } = request;
      const { companyBasicData, serviceProvidersTranslation } = payload;
      // check company exist before or not.
      const createdCompanyBasicData = await models.companiesBasicData.create(payload.companyBasicData, { transaction });
      companyBasicData.companiesBasicDataTranslation.companyBasicDataId = createdCompanyBasicData.id;
      companyBasicData.companiesBasicDataTranslation.languageId = request.pre.languageId;
      await models.companiesBasicDataTranslation.create(companyBasicData.companiesBasicDataTranslation, { transaction });

      const createdServiceProviderCompany = await models.serviceProviders.create({ companyId: createdCompanyBasicData.id, createdBy: userId }, { transaction });
      serviceProvidersTranslation.serviceProviderId = createdServiceProviderCompany.id;
      serviceProvidersTranslation.languageId = request.pre.languageId;
      await models.serviceProvidersTranslation.create(serviceProvidersTranslation, { transaction });
      await models.usersServiceProviders.create({ userId: request.auth.decoded.id, serviceProviderId: createdServiceProviderCompany.id, roleId: 10 }, { transaction });

      // await models.request_Role_company.create({
      //   userId: userId,
      //   companyId: createdServiceProviderCompany.id,
      //   requestedRole: payload.relationToCompany
      // }, { transaction });

      await transaction.commit();

      return reply.response(payload).code(200);
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
      const { languageId } = request.pre;
      const foundServiceProvider = await models.serviceProviders.findOne({
        where: { id: request.params.id },
        include: [
          { association: 'serviceProvidersTranslation', required: false, where: { languageId: languageId } },
          {
            association: 'basicData', required: false,
            include: [{ association: 'companiesBasicDataTranslation', where: { languageId: languageId }, required: false }]
          }
        ]
      });

      if(_.isEmpty(foundServiceProvider)) {
        return Boom.notFound('The Service Provider Company Is Not Found, You have to create It First');
      }

      if(!_.isEmpty(foundServiceProvider.serviceProvidersTranslation)) {
        return Boom.badRequest('The Service Provider Company Is translated before to this language');
      }

      transaction = await models.sequelize.transaction();

      if(!_.isEmpty(request.payload.serviceProvidersTranslation)) {
        request.payload.serviceProvidersTranslation.serviceProviderId = request.params.id;
        request.payload.serviceProvidersTranslation.languageId = languageId;
        await models.serviceProvidersTranslation.create(request.payload.serviceProvidersTranslation, { transaction });
      }

      if(!_.isEmpty(request.payload.companiesBasicDataTranslation)) {
        request.payload.companiesBasicDataTranslation.companyBasicDataId = foundServiceProvider.companyId;
        request.payload.companiesBasicDataTranslation.languageId = languageId;
        await models.companiesBasicDataTranslation.create(request.payload.companiesBasicDataTranslation, { transaction });
      }

      await transaction.commit();

      return reply.response(request.payload).code(201);
    }
    catch (e) {
      console.log('error', e);

      if(transaction) {
        await transaction.rollback();
      }

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },
  update: async (request, reply) => {
    let transaction;
    try {
      const foundServiceProviderCompany = await models.serviceProviders.findOne({
        where: { id: request.params.id },
        include: [
          { association: 'serviceProvidersTranslation', required: true, where: { languageId: request.pre.languageId } },
          {
            association: 'basicData',
            required: true,
            include: [
              {
                association: 'companiesBasicDataTranslation',
                required: true,
                where: { languageId: request.pre.languageId }
              }
            ]
          }
        ]
      });

      if(_.isEmpty(foundServiceProviderCompany)) {

        return Boom.notFound('Service Provider company You Try To Update does Not Exist or didn\'t translated to that language before');
      }

      transaction = await models.sequelize.transaction();

      if(! _.isEmpty(request.payload.companyBasicData)) {

        await models.companiesBasicData.update(request.payload.companyBasicData, { where: { id: foundServiceProviderCompany.basicData.id }, transaction });
      }

      if(! _.isEmpty(request.payload.companiesBasicDataTranslation)) {

        await models.companiesBasicDataTranslation.update(request.payload.companiesBasicDataTranslation,
          { where: { id: foundServiceProviderCompany.basicData.companiesBasicDataTranslation.id }, transaction });
      }

      if(! _.isEmpty(request.payload.serviceProvidersTranslation)) {

        await models.serviceProvidersTranslation.update(request.payload.serviceProvidersTranslation, { where: { id: foundServiceProviderCompany.serviceProvidersTranslation.id }, transaction });
      }

      await transaction.commit();

      return reply.response().code(204);
    }
    catch (e) {
      console.log('error', e);

      if(transaction) {
        await transaction.rollback();
      }

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },
  delete: async (request, reply) => {
    try {

      await models.serviceProviders.destroy({ where: { id: request.params.id } });

      return reply.response().code(204);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  }
};

