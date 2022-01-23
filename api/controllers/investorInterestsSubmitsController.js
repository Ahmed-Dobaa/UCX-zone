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
       console.log(investor)
       if(investor !== null){
        if(investor.company === null){
          foundSubmittedInterests[i].dataValues["investor_name_en"] = "Individual Investor";
          foundSubmittedInterests[i].dataValues["investor_name_ar"] = "مستثمر فردى";
        }else{
          foundSubmittedInterests[i].dataValues["investor_name_en"] = investor.company.companiesBasicDataTranslation.name;
          foundSubmittedInterests[i].dataValues["investor_name_ar"] = investor.company.companiesBasicDataTranslation.name_ar;
        }
       }



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

        let check = await models.investor.findOne({
          where: { id: foundSubmittedInterests[i].investorId, deleted: 0}});
        console.log(check);
        if(check !== null){
          if(check.type === 'Institutional Investor'){
            let investor = await models.investor.findOne({
              where: { id: foundSubmittedInterests[i].investorId, deleted: 0 },
              include: [
               { model: models.companiesBasicData, as: 'company',
                   include: [{ model: models.companiesBasicDataTranslation, as: 'companiesBasicDataTranslation' }] }
              ]
           });
           foundSubmittedInterests[i].dataValues["investor_name_en"] = investor.company.companiesBasicDataTranslation.name;
           foundSubmittedInterests[i].dataValues["investor_name_ar"] = investor.company.companiesBasicDataTranslation.name_ar;
          }else{
            foundSubmittedInterests[i].dataValues["investor_name_en"] = "Individual Investor";
            foundSubmittedInterests[i].dataValues["investor_name_ar"] = 'مستثمر فردى';
          }
        }



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
        investment_amount: request.payload.investment_amount,
        clarifications: request.payload.clarifications,
      });
      const investeeUser = await models.usersInvestees.findOne({ where: { investeeId: request.params.investeeId } });

      const notification = await models.notifications.create({
        from_user_id: request.params.investorId,
        to_user_id: investeeUser.userId,
        status: 0,
        type: 'Investor interest submit',
        reference_id: createdInterestSubmit.id
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
      let updated = await models.investor_interests_submits.update(request.payload , { where: { id: request.params.id } });

      if(request.payload.status === 0 ){
        const notification = await models.notifications.create({
          from_user_id: foundInterestSubmit.investeeId,
          to_user_id: foundInterestSubmit.user_id,
          status: 0,
          type: 'Reject interest',
          reference_id: foundInterestSubmit.id
        });
      }else{
        const notification = await models.notifications.create({
          from_user_id: foundInterestSubmit.investeeId,
          to_user_id: foundInterestSubmit.user_id,
          status: 0,
          type: 'Approve interest',
          reference_id: foundInterestSubmit.id
        });
      }

      return reply.response({status: 200, message: "Updated successfully"}).code(200);
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

