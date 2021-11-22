'use strict';

const Boom = require('boom');
const _ = require('lodash');
const path = require('path');
const moment = require('moment');
const fs = require('fs');

const qsToSequelizeQuery = require(path.join(__dirname, '../','services/qsToSequelizeQuery'));
const errorService = require(path.join(__dirname, '../','services/errorService'));

const models = require(path.join(__dirname, '../models/index'));

module.exports = {

  create: async (request, reply) => {
    let transaction;
    let company = null;
    try {
      const language = 1; //request.pre.languageId;
      let { advisor } = request.payload;
    //   const { investorTranslation } = request.payload.investor;
      const userId = request.auth.decoded ? request.auth.decoded.id : request.params.userId;
      advisor.createdBy = userId;
      advisor.advisor_type = request.payload.advisor.advisor_type;
    //   investorTranslation.languageId= language;
      let arr = [];
       for(let i = 0; i < advisor.turnoverRangeId.length; i++){
        arr.push(advisor.turnoverRangeId[i].name)
       }
       advisor.turnoverRangeId = null
       advisor.turnoverRangeId = arr;

      transaction = await models.sequelize.transaction();


        const { advisorsBasicDataTranslation } = request.payload.advisorBasicData;

        company = await models.companiesBasicData.create({ isConfidential: request.payload.advisorBasicData.isConfidential,
                                                           createdBy: userId,
                                                          user_id: userId, type: 'advisor' }, { transaction });
        advisorsBasicDataTranslation.companyBasicDataId = company.id;
        advisorsBasicDataTranslation.languageId = language;
        await models.companiesBasicDataTranslation.create(advisorsBasicDataTranslation, { transaction });

        advisor.companyId = company.id;

        advisor = await models.Advisor.create(advisor, { transaction });

      let countries = [];
       for(let i = 0; i < request.payload.advisor.target_countries.length; i++){
        countries.push(request.payload.advisor.target_countries[i].name)
       }
       request.payload.advisor.target_countries = null
       request.payload.advisor.target_countries = countries;

       let sectors = [];
       for(let i = 0; i < request.payload.advisor.target_sectors.length; i++){
        sectors.push(request.payload.advisor.target_sectors[i].name)
       }
       request.payload.advisor.target_sectors = null
       request.payload.advisor.target_sectors = sectors;
      let targetCountries = {"advisorId": advisor.id, "countryId": request.payload.advisor.target_countries};
      await models.advisorTargetedCountries.create(targetCountries, { transaction });

      let targetedSectors = {"advisorId": advisor.id, "sectorId": request.payload.advisor.target_sectors}
      await models.advisorTargetedSectors.create(targetedSectors, { transaction });

        for(let i = 0; i < request.payload.advisor_management.length; i++){
          let management = await models.advisorManagement.create({"advisorId": advisor.id, "email": request.payload.advisor_management[i].email,
          "createdBy": userId }, { transaction });
                 await models.advisorManagementTranslation.create({"advisorManagementId": management.id, "languageId": language,
          "name": request.payload.advisor_management[i].advisorManagementTranslation.name,
          "position": request.payload.advisor_management[i].advisorManagementTranslation.position,
          "phoneNumber": request.payload.advisor_management[i].advisorManagementTranslation.phoneNumber }, { transaction });
        }

    //   await models.usersInvestors.create({ userId: userId, investorId: investor.id, roleId: 8 }, { transaction });
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
  }
};
