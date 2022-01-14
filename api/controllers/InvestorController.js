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
          { model: models.investorTranslation, where: {languageId: 'en'}, as: 'investorTranslation' },
          { model: models.companiesBasicData, as: 'company',
              include: [{ model: models.companiesBasicDataTranslation, where: {languageId: 'en'}, as: 'companiesBasicDataTranslation' }] }
         ]
      });
      let avatarFullPath = null; // path.join(__dirname, '../../uploads/default.png');
      // const foundInvestor = await models.investor.findOne({ where: { id: request.params.id }, raw: true });
      for(let i = 0; i < foundCompanies.length; i++){
        // if(foundCompanies[i].img != null){
        //   foundCompanies[i].img = path.join(__dirname, '../../', foundCompanies[i].img);
        // }else{
        //   foundCompanies[i].img = "no img"
        // }
        let translation = [];
        if(foundCompanies[i].company != null){
          let basicDataTran = await models.companiesBasicDataTranslation.findAll({where : {companyBasicDataId: foundCompanies[i].company.id }});
          let _investorTrans = await models.investorTranslation.findAll({where : {investorId: foundCompanies[i].id }});
        if(basicDataTran.length > 1){
          translation = [
            {
              propertyName: "name",
              translation: {
                "Ar": basicDataTran[1].name,
                "Fr": basicDataTran[2].name,
                "Po": basicDataTran[3].name,
                "Sp": basicDataTran[4].name
              }},
              {
                propertyName: "companyPurpose",
                translation: {
                  "Ar": basicDataTran[1].companyPurpose,
                  "Fr": basicDataTran[2].companyPurpose,
                  "Po": basicDataTran[3].companyPurpose,
                  "Sp": basicDataTran[4].companyPurpose
                }
            },
            {
              propertyName: "main_address",
              translation: {
                "Ar": basicDataTran[1].main_address,
                "Fr": basicDataTran[2].main_address,
                "Po": basicDataTran[3].main_address,
                "Sp": basicDataTran[4].main_address
              }
          }
        ]
         }
         foundCompanies[i].company.dataValues["translation"] = translation;
         if(_investorTrans.length > 1){
          translation.push(
            {
              propertyName: "investmentStrategy",
              translation: {
                "Ar": _investorTrans[1].investmentStrategy,
                "Fr": _investorTrans[2].investmentStrategy,
                "Po": _investorTrans[3].investmentStrategy,
                "Sp": _investorTrans[4].investmentStrategy
              }
            }
          )
         }

        }


      ///////////////////////

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
      let managemant = await models.investorManagement.findAll({
        where: {investorId: foundCompanies[i].id},
        include:
        { model: models.investorManagementTranslation, as: 'managementTranslation' }
      })
      foundCompanies[i].dataValues["managemant"] = managemant;
      let portfolio = await models.investor_portfolio.findAll({where: {investor_id: foundCompanies[i].id}});
      if(portfolio.length > 0){
          for(let p = 0; p < portfolio.length; p++){
            console.log(portfolio[p].sectors);
            let portSector = portfolio[p].sectors.split(",");
            portfolio[p].dataValues["sectors"] = portSector;
          }
       }
       foundCompanies[i].dataValues["portfolio"] = portfolio;
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
      const language = 'en'; //request.pre.languageId;
      let { investor } = request.payload;
      const { investorTranslation } = request.payload.investor;
      let translation = request.payload.companyBasicData.companiesBasicDataTranslation.translation;
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
      let langauges = ['ar', 'fr', 'po', 'sp'];

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
        console.log("here +++++++++++++++++++++++++++++++++++++++++++++++")
        for(let k = 0; k < langauges.length; k++){
         let obj = companiesBasicDataTranslation;
         obj.name = null;
         obj.companyPurpose = null;
         obj.main_address = null;
         console.log("inside")
         for(let i = 0; i < translation.length; i++){
           let column;
           console.log("---------000000000000000000000000000")
           console.log(langauges[k])
           switch(langauges[k]){
             case 'ar':
               console.log("in ar")
                 obj["languageId"] = 'ar';
                  column = translation[i].propertyName;
                 obj[column] = translation[i].translation.Ar;
             break;
             case 'fr':
                 obj["languageId"] = 'fr';
                  column = translation[i].propertyName;
                 obj[column] = translation[i].translation.Fr;
             break;
             case 'po':
                 obj["languageId"] = 'po';
                  column = translation[i].propertyName;
                 obj[column] = translation[i].translation.Po;
             break;
             case 'sp':
                 obj["languageId"] = 'sp';
                  column = translation[i].propertyName;
                 obj[column] = translation[i].translation.Sp;
             break;
             default:
               break;
           }
         }
         console.log("==============================")
         console.log(obj.languageId)
         await models.companiesBasicDataTranslation.create(obj, { transaction });
        }
      }
      investor = await models.investor.create(investor, { transaction });
      investorTranslation.investorId= investor.id;
      investorTranslation.phoneNumbers = '010'; //request.payload.companyBasicData.companiesBasicDataTranslation.phoneNumbers;
      await models.investorTranslation.create(investorTranslation, { transaction });
      for(let k = 0; k < langauges.length; k++){
        let obj = investorTranslation;
        obj.investmentStrategy = null;
        for(let i = 0; i < translation.length; i++){
          let column;
          switch(langauges[k]){
            case 'ar':
                obj["languageId"] = 'ar';
                 column = translation[i].propertyName;
                obj[column] = translation[i].translation.Ar;
            break;
            case 'fr':
                obj["languageId"] = 'fr';
                 column = translation[i].propertyName;
                obj[column] = translation[i].translation.Fr;
            break;
            case 'po':
                obj["languageId"] = 'po';
                 column = translation[i].propertyName;
                obj[column] = translation[i].translation.Po;
            break;
            case 'sp':
                obj["languageId"] = 'sp';
                 column = translation[i].propertyName;
                obj[column] = translation[i].translation.Sp;
            break;
            default:
              break;
          }
        }
        await models.investorTranslation.create(obj, { transaction });
       }
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
      //  for(let i = 0; i < request.payload.portfolio[k].country.length; i++){
      //   headquarter_country.push(request.payload.portfolio[k].country[i].name)
      //  }
       let sector = [];
       for(let i = 0; i < request.payload.portfolio[k].sector.length; i++){
        sector.push(request.payload.portfolio[k].sector[i].name)
       }
        let portfolio = await models.investor_portfolio.create({
          "investor_id": investor.id,
          "country_name": request.payload.portfolio[k].name,
          "ownership_percentage": request.payload.portfolio[k].pOfOwnership,
          "headquarter_country": request.payload.portfolio[k].country,
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
      let language = 'en'; //equest.pre.languageId;
      let foundInvestor = await models.investor.findOne({ where: { id: request.params.id } });
 console.log(foundInvestor.companyId)
      if(_.isEmpty(foundInvestor)) {
        return Boom.notFound('Investor you\'re trying to update does not exist');
      }

      transaction = await models.sequelize.transaction();

      // if(request.payload.investor.turnoverRangeId) {
      //   await models.investor.update({ turnoverRangeId: request.payload.investor.turnoverRangeId },
      //     { where: { id: request.params.id }, transaction }
      //   );
      // }
      let arr = [];
       for(let i = 0; i < request.payload.investor.turnoverRangeId.length; i++){
        arr.push(request.payload.investor.turnoverRangeId[i].name)
       }
       request.payload.investor.turnoverRangeId = null
       request.payload.investor.turnoverRangeId = arr;

      await models.investor.update(request.payload.investor, {
        where: {
          id: request.params.id

      }, transaction });

      await models.investorTranslation.update(request.payload.investor.investorTranslation,
        {
          where: {
            investorId: request.params.id,
            languageId: language
          },
          transaction
        });

        let translation = request.payload.companyBasicData.companiesBasicDataTranslation.translation;

        let langauges = ['ar', 'fr', 'po', 'sp'];
        for(let k = 0; k < langauges.length; k++){
         let obj = request.payload.investor.investorTranslation;
         obj.investmentStrategy = null;
         for(let i = 0; i < translation.length; i++){
           let column;
           switch(langauges[k]){
             case 'ar':
                 language = 'ar';
                 obj["languageId"] = 'ar';
                  column = translation[i].propertyName;
                 obj[column] = translation[i].translation.Ar;
             break;
             case 'fr':
              language = 'fr';
                 obj["languageId"] = 'fr';
                  column = translation[i].propertyName;
                 obj[column] = translation[i].translation.Fr;
             break;
             case 'po':
              language = 'po';
                 obj["languageId"] = 'po';
                  column = translation[i].propertyName;
                 obj[column] = translation[i].translation.Po;
             break;
             case 'sp':
              language = 'sp';
                 obj["languageId"] = 'sp';
                  column = translation[i].propertyName;
                 obj[column] = translation[i].translation.Sp;
             break;
             default:
               break;
           }
         }
         await models.investorTranslation.update(obj,
          {
            where: {
              investorId: request.params.id,
              languageId: language
            },
            transaction
          });
      }

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
      let targetCountries = {"investorId": foundInvestor.id, "countryId": request.payload.investor.investorTranslation.target_countries};
      await models.investorTargetedCountries.update(targetCountries, { where: {  investorId: request.params.id }, transaction });

      let targetedSectors = {"investorId": foundInvestor.id, "sectorId": request.payload.investor.investorTranslation.target_sectors}
      await models.investorTargetedSectors.update(targetedSectors, { where: { investorId: request.params.id}, transaction });

      if(request.payload.companyBasicData) {
        await models.companiesBasicData.update(request.payload.companyBasicData,
          { where: { id: foundInvestor.companyId }, transaction });

        if(request.payload.companyBasicData.companiesBasicDataTranslation) {
          await models.companiesBasicDataTranslation.update(request.payload.companyBasicData.companiesBasicDataTranslation,
            { where: { companyBasicDataId: foundInvestor.companyId, languageId: 'en' }, transaction });
        }
      }


      for(let k = 0; k < langauges.length; k++){
       let obj = request.payload.companyBasicData.companiesBasicDataTranslation;
       obj.name = null;
       obj.main_address = null;
       obj.companyPurpose = null;
       for(let i = 0; i < translation.length; i++){
         let column;
         switch(langauges[k]){
           case 'ar':
               language = 'ar';
               obj["languageId"] = 'ar';
                column = translation[i].propertyName;
               obj[column] = translation[i].translation.Ar;
           break;
           case 'fr':
            language = 'fr';
               obj["languageId"] = 'fr';
                column = translation[i].propertyName;
               obj[column] = translation[i].translation.Fr;
           break;
           case 'po':
            language = 'po';
               obj["languageId"] = 'po';
                column = translation[i].propertyName;
               obj[column] = translation[i].translation.Po;
           break;
           case 'sp':
            language = 'sp';
               obj["languageId"] = 'sp';
                column = translation[i].propertyName;
               obj[column] = translation[i].translation.Sp;
           break;
           default:
             break;
         }
       }
       await models.companiesBasicDataTranslation.update(obj,
        { where: { companyBasicDataId: foundInvestor.companyId, languageId: language }, transaction });


    }

    let sectorP = [];
       for(let i = 0; i < request.payload.portfolio.sector.length; i++){
        sectorP.push(request.payload.portfolio.sector[i].name)
       }
        let portfolio = await models.investor_portfolio.update({
          "country_name": request.payload.portfolio.name,
          "ownership_percentage": request.payload.portfolio.pOfOwnership,
          "headquarter_country": request.payload.portfolio.country,
          "sectors": sectorP
        },
           { where: { id: request.payload.portfolio.id }, transaction });

        await models.investorManagement.update(request.payload.investor_management, {
             where: {id: request.payload.investor_management.id }, transaction });

          await models.investorManagementTranslation.update(request.payload.investor_management.investorManagementTranslation,
             {where: {id: request.payload.investor_management.investorManagementTranslation.id}, transaction });

   await transaction.commit();
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
    const relativePath = `./../../platform.ucx.zone/investor/${request.params.id}-${moment().valueOf()}-${uploadImageExtension}`;
    const path_url = `https://platform.ucx.zone/investor/${request.params.id}-${moment().valueOf()}-${uploadImageExtension}`;

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
      await models.investor.update({ img: path_url }, { where: { id: request.params.id } });

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
