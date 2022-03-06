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
      let translation = request.payload.advisorBasicData.advisorsBasicDataTranslation.translation;
      const language = 'en'; //request.pre.languageId;
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
        let langauges = ['ar', 'fr', 'po', 'sp'];
        if(translation.length === 0){
          translation.push({
            propertyName: 'test',
            "translation": {
              "Ar": "",
              "Fr": "",
              "Po": "",
              "Sp": ""
            }

          })
        }
        for(let k = 0; k < langauges.length; k++){
          let obj = advisorsBasicDataTranslation;
          obj.name = null;
          obj.companyPurpose = null;
          obj.main_address = null;
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
          await models.companiesBasicDataTranslation.create(obj, { transaction });
         }
        advisor.companyId = company.id;
        advisor.deleted = 0;
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

      await models.usersAdvisors.create({ userId: userId, advisorId: advisor.id, roleId: 8 }, { transaction });
      await transaction.commit();
      request.payload.advisorBasicData["advisor_id"] = advisor.id;
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
      let foundInvestor = await models.Advisor.findOne({ where: { id: request.params.id } });
      if(_.isEmpty(foundInvestor)) {
        return Boom.notFound('Advisor you\'re trying to update does not exist');
      }

      transaction = await models.sequelize.transaction();

      let arr = [];
       for(let i = 0; i < request.payload.advisor.turnoverRangeId.length; i++){
        arr.push(request.payload.advisor.turnoverRangeId[i].name)
       }
       request.payload.advisor.turnoverRangeId = null
       request.payload.advisor.turnoverRangeId = arr;

      await models.Advisor.update(request.payload.advisor, {
        where: {
          id: request.params.id

      }, transaction });

      // await models.advisorTranslation.update(request.payload.investor.investorTranslation,
      //   {
      //     where: {
      //       investorId: request.params.id,
      //       languageId: language
      //     },
      //     transaction
      //   });

        let translation = request.payload.advisorBasicData.advisorsBasicDataTranslation.translation;

        let langauges = ['ar', 'fr', 'po', 'sp'];

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
      let targetCountries = {"advisorId": foundInvestor.id, "countryId": request.payload.advisor.target_countries};
      await models.advisorTargetedCountries.update(targetCountries, { where: {  advisorId: request.params.id }, transaction });

      let targetedSectors = {"advisorId": foundInvestor.id, "sectorId": request.payload.advisor.target_sectors}
      await models.advisorTargetedSectors.update(targetedSectors, { where: { advisorId: request.params.id}, transaction });

      if(request.payload.advisorBasicData) {
        await models.companiesBasicData.update(request.payload.advisorBasicData,
          { where: { id: foundInvestor.companyId }, transaction });

        if(request.payload.advisorBasicData.advisorsBasicDataTranslation) {
          await models.companiesBasicDataTranslation.update(request.payload.advisorBasicData.advisorsBasicDataTranslation,
            { where: { companyBasicDataId: foundInvestor.companyId, languageId: 'en' }, transaction });
        }
      }


      for(let k = 0; k < langauges.length; k++){
       let obj = request.payload.advisorBasicData.advisorsBasicDataTranslation;
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

        await models.advisorManagement.update(request.payload.advisor_management, {
             where: {id: request.payload.advisor_management.id }, transaction });

          await models.advisorManagementTranslation.update(request.payload.advisor_management.advisorManagementTranslation,
             {where: {id: request.payload.advisor_management.advisorManagementTranslation.id}, transaction });

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

  uploadAdvisorImg: async function (request, reply) {
    const allowedExtensions = ['.tif', '.png', '.svg', '.jpg', '.gif'];
    const uploadImageExtension = path.extname(request.payload.img.hapi.filename);
    const relativePath = `./../../platform.ucx.zone/advisor/${request.params.id}-${moment().valueOf()}-${uploadImageExtension}`;
    const path_url = `https://platform.ucx.zone/advisor/${request.params.id}-${moment().valueOf()}-${uploadImageExtension}`;
    const fullPath = relativePath;
    let oldPath = null;
    try {

      if(!_.includes(allowedExtensions, uploadImageExtension.toLowerCase())) {

        return Boom.badRequest(`allowed images extension are  ${allowedExtensions.join(' , ')}`);
      }

      const foundAdvisor = await models.Advisor.findOne({ where: { id: request.params.id }, raw: true });
      oldPath = foundAdvisor.img;
      await request.payload.img.pipe(fs.createWriteStream(fullPath));
      await models.Advisor.update({ img: path_url }, { where: { id: request.params.id } });

      return reply.response({message: "Image uploaded successfully"}).code(201);
    }
    catch (e) {
      console.log('error', e);
      fs.unlinkSync(path.join(__dirname, '../', oldPath));

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  findAllAdvisors: async function (request, reply) {
    try {
      const language = 'en'; //request.pre.languageId;
      const foundCompanies = await models.Advisor.findAll({
        where: { deleted: 0 },
        include: [
          { model: models.companiesBasicData, as: 'company',
              include: [{ model: models.companiesBasicDataTranslation, where: {languageId: 'en'}, as: 'companiesBasicDataTranslation' }] }
         ]
      });
      for(let i = 0; i < foundCompanies.length; i++){
        let translation = [];
        let basicDataTran = await models.companiesBasicDataTranslation.findAll({where : {companyBasicDataId: foundCompanies[i].company.id }});
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
        // var array = foundCompanies[i].turnoverRangeId.split(",");
        // foundCompanies[i].turnoverRangeId = array;

        var array = foundCompanies[i].turnoverRangeId.split(",");

        let secData = []
        for(let x = 0; x < array.length; x++){
          let result = await models.lookup_details.findOne({where: {lookup_detail_name_en: array[x]}})
          let cnt = {id: result.id, name: array[x]}
          secData.push(cnt);
        }
        foundCompanies[i].turnoverRangeId = secData;


        let countries = await models.advisorTargetedCountries.findAll({where: {advisorId: foundCompanies[i].id}})
        let sectors = await models.advisorTargetedSectors.findAll({where: {advisorId: foundCompanies[i].id}})
      if(countries.length != 0){
        var countroy = countries[0].countryId.split(",");
        let cntData = []
        for(let x = 0; x < countroy.length; x++){
          let result = await models.countriesTranslation.findOne({where: {name: countroy[x]}})
          let cnt = {id: result.id, name: countroy[x]}
          cntData.push(cnt);
        }
        countries[0] = cntData;
        foundCompanies[i].dataValues["countries"] = countries[0];
      }
      if(sectors.length != 0){
        var sector = sectors[0].sectorId.split(",");
        let secData = []
        for(let x = 0; x < sector.length; x++){
          let result = await models.sectorsTranslation.findOne({where: {name: sector[x]}})
          let cnt = {id: result.id, name: sector[x]}
          secData.push(cnt);
        }
        sectors[0] = secData;
        foundCompanies[i].dataValues["sectors"] = sectors[0];
      }

      let managemant = await models.advisorManagement.findAll({
        where: {advisorId: foundCompanies[i].id},
        include:
        { model: models.advisorManagementTranslation, as: 'managementTranslation' }
      })

      foundCompanies[i].dataValues["managemant"] = managemant;
      }
      return reply.response(foundCompanies).code(200);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },

  deleteAdvisor: async function (request, reply) {
    const result = await models.Advisor.update({ deleted: 1 }, { where: { id: request.params.advisorId } });
     await models.Advisor.destroy({ where: { id: request.params.advisorId } });
    return reply.response({message: "Deleted successfully"}).code(200);
  }

};
