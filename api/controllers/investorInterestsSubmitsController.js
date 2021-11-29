'use strict';

const Boom = require('boom');
const models = require('../models/index');
const _ = require('lodash');

module.exports = {
  findAll: async function (request, reply) {
    try {

      const foundSubmittedInterests = await models.investor_interests_submits.findAll({ where: { user_id: request.params.userId } });

      for(let i = 0; i < foundSubmittedInterests.length; i++){
        let foundInvesteeCompanies = await models.investee.findOne({
          where: { id: foundSubmittedInterests[i].investeeId },
          include: [
            {
              association: 'basicData',
              required: true,
              include: [
                {
                  association: 'companiesBasicDataTranslation',
                  required: true
                }
              ]
            }
          ]
        });
        let investor = await models.investor.findOne({
          where: { id: foundSubmittedInterests[i].investorId, deleted: 0 },
          include: [
           { model: models.companiesBasicData, as: 'company',
               include: [{ model: models.companiesBasicDataTranslation, as: 'companiesBasicDataTranslation' }] }
          ]
       });
        foundSubmittedInterests[i].dataValues["investee_name_en"] = foundInvesteeCompanies.basicData.companiesBasicDataTranslation.name;
        foundSubmittedInterests[i].dataValues["investee_name_ar"] = foundInvesteeCompanies.basicData.companiesBasicDataTranslation.name_ar;
        foundSubmittedInterests[i].dataValues["investor_name_en"] = investor.company.companiesBasicDataTranslation.name;
        foundSubmittedInterests[i].dataValues["investor_name_ar"] = investor.company.companiesBasicDataTranslation.name_ar;
      }
      return reply.response(foundSubmittedInterests || {}).code(200);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  getInterestForInvestee: async function (request, reply) {
    try {

      const foundSubmittedInterests = await models.investor_interests_submits.findAll({ where: { investeeId: request.params.investeeId } });

      for(let i = 0; i < foundSubmittedInterests.length; i++){

        let investor = await models.investor.findOne({
          where: { id: foundSubmittedInterests[i].investorId, deleted: 0 },
          include: [
           { model: models.companiesBasicData, as: 'company',
               include: [{ model: models.companiesBasicDataTranslation, as: 'companiesBasicDataTranslation' }] }
          ]
       });
        foundSubmittedInterests[i].dataValues["investor_name_en"] = investor.company.companiesBasicDataTranslation.name;
        foundSubmittedInterests[i].dataValues["investor_name_ar"] = investor.company.companiesBasicDataTranslation.name_ar;
      }
      return reply.response(foundSubmittedInterests || {}).code(200);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  findOne: async (request, reply) => {
    try {

      const foundSubmittedInterests = await models.investor_interests_submits.findOne({ where: { id: request.params.id } });

      return reply.response(foundSubmittedInterests || {}).code(200);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  create: async (request, reply) => {
    try {
      const createdInterestSubmit = await models.investor_interests_submits.create({
        investorId: request.params.investorId,
        investeeId: request.params.investeeId,
        user_id: request.params.userId,
        // minTicketSize: request.payload.minTicketSize,
        // maxTicketSize: request.payload.maxTicketSize,
        // servicesValue: request.payload.servicesValue,
        investment_amount: request.payload.investment_amount,
        clarifications: request.payload.clarifications,
      });

      return reply.response(createdInterestSubmit).code(200);

    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  update: async (request, reply) => {
    try {
      let foundInterestSubmit = await models.investor_interests_submits.findOne({ where: { id: request.params.id } });

      if(_.isEmpty(foundInterestSubmit)) {

        return Boom.notFound('Interest you\'re trying to update does not exist');
      }
      foundInterestSubmit = await models.investor_interests_submits.update(request.payload , { where: { id: request.params.id } });

      return reply.response(foundInterestSubmit).code(200);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  delete: async (request, reply) => {
    try {

      await models.investor_interests_submits.destroy({ where: { id: request.params.id } });

      return reply.response().code(204);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  }
};

