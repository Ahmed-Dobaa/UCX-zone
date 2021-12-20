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
         where: {deleted: 0 },
        include: [
          { model: models.investorTranslation, as: 'investorTranslation' },
          { model: models.companiesBasicData, as: 'company',
              include: [{ model: models.companiesBasicDataTranslation, as: 'companiesBasicDataTranslation' }] }
         ]
      });
      let avatarFullPath = null; // path.join(__dirname, '../../uploads/default.png');
      // const foundInvestor = await models.investor.findOne({ where: { id: request.params.id }, raw: true });
      for(let i = 0; i < foundCompanies.length; i++){
        if(foundCompanies[i].img != null){
          foundCompanies[i].img = path.join(__dirname, '../../', foundCompanies[i].img);
        }else{
          foundCompanies[i].img = "no img"
        }

        var array = foundCompanies[i].turnoverRangeId.split(",");
        foundCompanies[i].turnoverRangeId = array;
        let countries = await models.investorTargetedCountries.findAll({where: {investorId: foundCompanies[i].id}})
        let sectors = await models.investorTargetedSectors.findAll({where: {investorId: foundCompanies[i].id}})
      if(countries.length != 0){
        var countroy = countries[0].countryId.split(",");
        countries[0] = countroy;
        foundCompanies[i].dataValues["countries"] = countries[0];
      }
      if(sectors.length != 0){
        var sector = sectors[0].sectorId.split(",");
        sectors[0] = sector;

        foundCompanies[i].dataValues["sectors"] = sectors[0];
      }

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
      let arr = [];
       for(let i = 0; i < investor.turnoverRangeId.length; i++){
        arr.push(investor.turnoverRangeId[i].name)
       }
       investor.turnoverRangeId = null
       investor.turnoverRangeId = arr;

      transaction = await models.sequelize.transaction();

      if(request.payload.investor.type === 'Institutional Investor') { // If company already exists, just add the investor data in its table.
        const { companiesBasicDataTranslation } = request.payload.companyBasicData;
        // company = await models.companiesBasicDataTranslation.findOne({ where: { registrationIdNo: companiesBasicDataTranslation.registrationIdNo } });

        // if(_.isEmpty(company)) {
        company = await models.companiesBasicData.create({ isConfidential: request.payload.companyBasicData.isConfidential,
                                                           createdBy: userId,
                                                          user_id: userId, type: 'investor' }, { transaction });
        companiesBasicDataTranslation.companyBasicDataId= company.id;
        companiesBasicDataTranslation.languageId = language;
        await models.companiesBasicDataTranslation.create(companiesBasicDataTranslation, { transaction });
        // }
        investor.companyId = company.id;
      }
      investor = await models.investor.create(investor, { transaction });
      investorTranslation.investorId= investor.id;
      investorTranslation.phoneNumbers = '010'; //request.payload.companyBasicData.companiesBasicDataTranslation.phoneNumbers;
      await models.investorTranslation.create(investorTranslation, { transaction });

      let countries = [];
       for(let i = 0; i < request.payload.investor.investorTranslation.target_countries.length; i++){
        countries.push(request.payload.investor.investorTranslation.target_countries[i].name)
       }
       request.payload.investor.investorTranslation.target_countries = null
       request.payload.investor.investorTranslation.target_countries = countries;

       let sectors = [];
       for(let i = 0; i < request.payload.investor.investorTranslation.target_sectors.length; i++){
        sectors.push(request.payload.investor.investorTranslation.target_sectors[i].name)
       }
       request.payload.investor.investorTranslation.target_sectors = null
       request.payload.investor.investorTranslation.target_sectors = sectors;
      let targetCountries = {"investorId": investor.id, "countryId": request.payload.investor.investorTranslation.target_countries};
      await models.investorTargetedCountries.create(targetCountries, { transaction });

      let targetedSectors = {"investorId": investor.id, "sectorId": request.payload.investor.investorTranslation.target_sectors}
      await models.investorTargetedSectors.create(targetedSectors, { transaction });

      if(request.payload.investor.type === 'Institutional Investor'){
        for(let i = 0; i < request.payload.investor_management.length; i++){
          let management = await models.investorManagement.create({"investorId": investor.id, "email": request.payload.investor_management[i].email,
          "createdBy": userId }, { transaction });
                 await models.investorManagementTranslation.create({"investorManagementId": management.id, "languageId": language,
          "name": request.payload.investor_management[i].investorManagementTranslation.name,
          "position": request.payload.investor_management[i].investorManagementTranslation.position,
          "phoneNumber": request.payload.investor_management[i].investorManagementTranslation.phoneNumber }, { transaction });
        }
      }
      for(let k = 0; k < request.payload.portfolio.length; k++){
        let headquarter_country = [];
        console.log(request.payload.portfolio[k].country);
       for(let i = 0; i < request.payload.portfolio[k].country.length; i++){
        headquarter_country.push(request.payload.portfolio[k].country[i].name)
       }
       let sector = [];
       for(let i = 0; i < request.payload.portfolio[k].sector.length; i++){
        sector.push(request.payload.portfolio[k].sector[i].name)
       }
        let portfolio = await models.investor_portfolio.create({
          "investor_id": investor.id,
          "country_name": request.payload.portfolio[k].name,
          "ownership_percentage": request.payload.portfolio[k].pOfOwnership,
          "headquarter_country": headquarter_country,
          "sectors": sector
        },
           { transaction });
      }
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
  uploadInvestorImg: async function (request, reply) {
    const allowedExtensions = ['.tif', '.png', '.svg', '.jpg', '.gif'];
    const uploadImageExtension = path.extname(request.payload.img.hapi.filename);
    const relativePath = `../../../platform.ucx.zone/assets/${request.params.id}-${moment().valueOf()}-${uploadImageExtension}`;
    const fullPath = relativePath; //path.join(__dirname, '../', relativePath);
    let oldPath = null;
    try {

      if(!_.includes(allowedExtensions, uploadImageExtension.toLowerCase())) {

        return Boom.badRequest(`allowed images extension are  ${allowedExtensions.join(' , ')}`);
      }

      const foundInvestor = await models.investor.findOne({ where: { id: request.params.id }, raw: true });
      console.log(foundInvestor);
      // oldPath = foundInvestor.img;
      await request.payload.img.pipe(fs.createWriteStream(fullPath));
      await models.investor.update({ img: relativePath }, { where: { id: request.params.id } });

      return reply.response({message: "Image uploaded successfully"}).code(201);
    }
    catch (e) {
      console.log('error', e);
      fs.unlinkSync(path.join(__dirname, '../', oldPath));

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  getInvestorImg: async function (request, reply) {
    try {
      let avatarFullPath = null; // path.join(__dirname, '../../uploads/default.png');
      const foundInvestor = await models.investor.findOne({ where: { id: request.params.id }, raw: true });
      // if(_.get(foundInvestor, 'img')) {
        avatarFullPath = path.join(__dirname, '../../', foundInvestor.img);
        //  avatarFullPath = path.join(__dirname, '../../uploads/investors/1-1635148747703-.png') //foundInvestor.img);
      // }  '../../',

      return reply.response(avatarFullPath).code(200);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
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
  },
  deleteInvestor: async function (request, reply) {
    const result = await models.investor.update({ deleted: 1 }, { where: { id: request.params.investorId } });
    return reply.response({message: "Deleted successfully"}).code(200);
  }
};
