'use strict';

const Boom = require('boom');
const path = require('path');
const models = require(path.join(__dirname, '../models/index'));
const _ = require('lodash');

module.exports = {
  findAll: async function (request, reply) {
    try {
      const foundCompanies = await models.companiesBasicData.findAll({
        include: [
          { model: models.investee, as: 'investeeCompany' }
        ]
      });

      return reply.response(foundCompanies).code(200);
    }
    catch (e) {
      console.log('error', e);
      return Boom.badImplementation('An internal server error occurred');
    }
  },
  findOne: async (request, reply) => {
    try {
      const companyId = request.params.companyId;
      const foundCompany = await models.companiesBasicData.findOne({
        where: { id: companyId },
        include: [
          { model: models.investee, as: 'investeeCompany' }
        ]
      });

      return reply.response(foundCompany).code(200);
    }
    catch (e) {
      console.log('error', e);
      return Boom.badImplementation('An internal server error occurred');
    }
  },
  create: async (request, reply) => {
    let transaction;

    try {
      const payload = request.payload;
      transaction = await models.sequelize.transaction();
      const createdCompanyBasicData = await models.companiesBasicData.create(payload, { transaction });
      await transaction.commit();
      return reply.response(createdCompanyBasicData).code(200);

    }
    catch (e) {
      console.log('error', e);
      if(transaction) {
        await transaction.rollback();
      }
      return Boom.badImplementation('An internal server error occurred');
    }
  },
  update: async function (request, reply) {
    try {
      const payload = request.payload;
      const companyId = request.params.companyId;
      const foundCompany = await models.companiesBasicData.findOne({ where: { id: companyId } });
      if(!_.isEmpty(foundCompany)) {
        const updatedCompany = await models.companiesBasicData.update(payload, { where: { id: companyId } });
        return reply.response(updatedCompany).code(200);
      }

      return Boom.notFound('Company You Try To Update does Not Exist');
    }
    catch (e) {
      console.log('error', e);
      return Boom.badImplementation('An internal server error occurred');
    }
  },
  delete: async (request, reply) => {
    try {
      const companyId = request.params.companyId;
      await models.companiesBasicData.destroy({ where: { id: companyId } });
      return reply.response().code(204);
    }
    catch (e) {
      console.log('error', e);
      return Boom.badImplementation('An internal server error occurred');
    }
  }
};

