'use strict';

const Boom = require('boom');
const _ = require('lodash');
const path = require('path');

const qsToSequelizeQuery = require(path.join(__dirname, '../','services/qsToSequelizeQuery'));
const errorService = require(path.join(__dirname, '../','services/errorService'));

const models = require(path.join(__dirname, '../models/index'));

module.exports = {
  findAllForLoggedInUser: async function (request, reply) {
    try {
      const language = request.pre.languageId;
      const limit = parseInt(request.query.per_page) || 25;
      const offset = parseInt((request.query.page-1) * request.query.per_page) || 0;
      const foundInvestorCompanies = await models.investor.findAndCountAll(
        {
          distinct: true,
          include: [
            { association: 'investorTranslation', required: true, where: { languageId: language } },
            {
              association: 'targetedSectors', through: { attributes: [] },
              include: [{ association: 'sectorsTranslation', where: { languageId: language }, required: true }]
            },
            {
              association: 'targetedCountries', through: { attributes: [] },
              include: [{ association: 'countriesTranslation', where: { languageId: language }, required: true }],
            },
            { association: 'preferredCompanyTurnoverRange' },
            {
              association: 'company',
              required: false,
              include: [
                {
                  association: 'companiesBasicDataTranslation',
                  required: false,
                  where: { languageId: language }
                }
              ]
            },
            {
              association: 'users',
              through: { where: { userId: request.auth.decoded.id }, attributes: [] },
              attributes: []
            }
          ],
          limit: limit,
          offset: offset,
          order: [['createdAt', 'DESC']],
        });

      return reply.response(foundInvestorCompanies).code(200);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },
  findAll: async function (request, reply) {
    try {
      const language = request.pre.languageId;
      const sequelizeQuery = qsToSequelizeQuery(request.query, models.investor.attributes, models.investor.associations);
      const foundInvestorCompanies = await models.investor.scope({ method: ['includeRelations', sequelizeQuery, language] }).findAndCountAll();

      // const foundInvestorCompanies = await models.investor.findAndCountAll();
      return reply.response(foundInvestorCompanies).code(200);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },
  findAllInvestors: async function (request, reply) {
    try {
      const language = 1; //request.pre.languageId;
      const foundCompanies = await models.investor.findAll({
        // where: {user_id: request.params.userId},
        include: [
          { model: models.investorTranslation, as: 'investorTranslation' },
          { model: models.companiesBasicData, as: 'company',
              include: [{ model: models.companiesBasicDataTranslation, as: 'companiesBasicDataTranslation' }] }
         ]
      });

      for(let i = 0; i < foundCompanies.length; i++){
        let countries = await models.investorTargetedCountries.findAll({where: {investorId: foundCompanies[i].id}})
        let sectors = await models.investorTargetedSectors.findAll({where: {investorId: foundCompanies[i].id}})
        foundCompanies[i].dataValues["countries"] = countries[0];
        foundCompanies[i].dataValues["sectors"] = sectors[0];
      }
      // const sequelizeQuery = qsToSequelizeQuery(request.query, models.investor.attributes, models.investor.associations);
      // const foundInvestorCompanies = await models.investor.scope({ method: ['includeRelations', sequelizeQuery, language] }).findAndCountAll();

      // const foundInvestorCompanies = await models.investor.findAndCountAll();
      return reply.response(foundCompanies).code(200);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },
  findOne: async (request, reply) => {
    try {
      const language = request.pre.languageId;
      let sequelizeQuery = qsToSequelizeQuery(request.query, models.investor.attributes, models.investor.associations);
      sequelizeQuery = _.set(sequelizeQuery, 'where.id', request.params.id);
      const foundInvestorCompany = await models.investor.scope({ method: ['includeRelations', sequelizeQuery, language] }).findOne();

      return reply.response(foundInvestorCompany || {}).code(200);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },
  create: async (request, reply) => {
    let transaction;
    let company = null;
    try {
      const language = 1; //request.pre.languageId;
      let { investor } = request.payload;
      const { investorTranslation } = request.payload.investor;
      const userId = request.auth.decoded ? request.auth.decoded.id : request.params.userId;
      investor.createdBy = userId;
      investor.type = request.payload.investor.type;
      investorTranslation.languageId= language;

      // if(request.payload.type === 'I') {
      //   const foundInvestor = await models.investor.findOne({ where: { createdBy: userId, type: 'I' } });

      //   if(!_.isEmpty(foundInvestor)) {
      //     return Boom.badRequest('You Already Have Individual Investor, You Can Not Create Two');
      //   }
      // }

      transaction = await models.sequelize.transaction();

      if(request.payload.investor.type === 'Company') { // If company already exists, just add the investor data in its table.
        const { companiesBasicDataTranslation } = request.payload.companyBasicData;

        // company = await models.companiesBasicDataTranslation.findOne({ where: { registrationIdNo: companiesBasicDataTranslation.registrationIdNo } });

        // if(_.isEmpty(company)) {
        company = await models.companiesBasicData.create({ isConfidential: request.payload.companyBasicData.isConfidential,
                                                           createdBy: userId,
                                                          user_id: userId }, { transaction });
        companiesBasicDataTranslation.companyBasicDataId= company.id;
        companiesBasicDataTranslation.languageId = language;
        await models.companiesBasicDataTranslation.create(companiesBasicDataTranslation, { transaction });
        // }
        investor.companyId = company.id;
      }
      investor = await models.investor.create(investor, { transaction });
      investorTranslation.investorId= investor.id;
      investorTranslation.phoneNumbers = request.payload.companyBasicData.companiesBasicDataTranslation.phoneNumbers;
      await models.investorTranslation.create(investorTranslation, { transaction });

      let targetCountries = {"investorId": investor.id, "countryId": request.payload.investor.investorTranslation.target_countries};
      await models.investorTargetedCountries.create(targetCountries, { transaction });

      let targetedSectors = {"investorId": investor.id, "sectorId": request.payload.investor.investorTranslation.target_sectors}
      await models.investorTargetedSectors.create(targetedSectors, { transaction });

      let management = await models.investorManagement.create({"investorId": investor.id, "email": request.payload.investor_management.email,
                                 "createdBy": userId }, { transaction });
      await models.investorManagementTranslation.create({"investorManagementId": management.id, "languageId": language,
                                 "name": request.payload.investor_management.investorManagementTranslation.name,
                                 "position": request.payload.investor_management.investorManagementTranslation.position,
                                 "phoneNumber": request.payload.investor_management.investorManagementTranslation.phoneNumber }, { transaction });
      // await investor.addTargetedCountries(investorTranslation.targetedCountriesIds);
      // await investor.addTargetedSectors(investorTranslation.targetedSectorsIds);
      await models.usersInvestors.create({ userId: userId, investorId: investor.id, roleId: 8 }, { transaction });
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
    let transaction = null;
    try {
      const language = request.pre.languageId;
      const foundInvestor = await models.investor.findOne({ where: { id: request.params.id } });

      if(_.isEmpty(foundInvestor)) {
        return Boom.notFound('Investor you\'re trying to update does not exist');
      }

      transaction = await models.sequelize.transaction();

      // if(request.payload.investor.turnoverRangeId) {
      //   await models.investor.update({ turnoverRangeId: request.payload.investor.turnoverRangeId },
      //     { where: { id: request.params.id }, transaction }
      //   );
      // }

      await models.investorTranslation.update(request.payload.investor.investorTranslation,
        {
          where: {
            investorId: request.params.id,
            languageId: language
          },
          transaction
        });

      if(request.payload.investor.investorTranslation.targetedCountriesIds) {
        await foundInvestor.setTargetedCountries(request.payload.investor.investorTranslation.targetedCountriesIds);
      }

      if(request.payload.investor.investorTranslation.targetedSectorsIds) {
        await foundInvestor.setTargetedSectors(request.payload.investor.investorTranslation.targetedSectorsIds);
      }

      if(request.payload.companyBasicData) {
        await models.companiesBasicData.update(request.payload.companyBasicData,
          { where: { id: request.payload.companyBasicData.id }, transaction });

        if(request.payload.companyBasicData.companiesBasicDataTranslation) {
          await models.companiesBasicDataTranslation.update(request.payload.companyBasicData.companiesBasicDataTranslation,
            { where: { companyBasicDataId: request.payload.companyBasicData.id }, transaction });
        }
      }

      return reply.response(request.payload).code(200);
    }
    catch (e) {
      console.log('error', e);

      if(transaction) {
        await transaction.rollback();
      }

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },
  translate: async (request, reply) => {
    try {
      const language = request.pre.languageId;
      const foundInvestor = await models.investor.findOne({
        where: { id: request.params.id },
        include: [
          {
            association: 'company',
            required: false,
            include: [
              {
                association: 'companiesBasicDataTranslation',
                where: { languageId: language },
                required: false
              }
            ]
          }
        ]
      });

      if(_.isEmpty(foundInvestor)) {
        return Boom.notFound('The Investor Is Not Found, You have to create It First');
      }

      request.payload.investorTranslation.investorId = request.params.id;
      request.payload.investorTranslation.languageId = language;

      await models.investorTranslation.create(request.payload.investorTranslation);
      request.payload.companiesBasicDataTranslation.languageId = language;
      await models.companiesBasicDataTranslation.create(request.payload.companiesBasicDataTranslation);

      return reply.response(request.payload).code(200);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },
  delete: async (request, reply) => {
    try {

      await models.investor.destroy({ where: { id: request.params.id } });

      return reply.response().code(204);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },
  follow: async (request, reply) => {
    let foundFollowing = _.get(await models.investor.findOne({ attributes: ['follow'], where: { id: request.params.investorId }, raw: true }), 'follow');

    if(_.isNil(foundFollowing)) {
      foundFollowing = [];
    }
    foundFollowing.push(request.params.id);
    foundFollowing = _.uniq(foundFollowing);
    const result = await models.investor.update({ follow: foundFollowing }, { where: { id: request.params.investorId } });

    // const result = await models.investor.update({ follow: sequelize.fn('JSON_SET', sequelize.col('follow'), '$a', request.params.id) }, { where: { id: request.params.investorId } });
    return reply.response(result).code(200);
  },
  unfollow: async (request, reply) => {
    const foundFollowing = _.get(await models.investor.findOne({ attributes: ['follow'], where: { id: request.params.investorId }, raw: true }), 'follow');

    if(_.isNil(foundFollowing) || _.isEmpty(foundFollowing)) {
      return reply.response().code(200);
    }
    _.remove(foundFollowing, (item) => item === request.params.id);
    const result = await models.investor.update({ follow: foundFollowing }, { where: { id: request.params.investorId } });

    return reply.response(result).code(200);
  }
};
