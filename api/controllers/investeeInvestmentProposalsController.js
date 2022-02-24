'user strict';

const _ = require('lodash');
const Boom = require('boom');
const path = require('path');
const moment = require('moment');
const fs = require('fs');
const fsPromises = require('fs').promises;
const { fn, col } = require('sequelize');
const models = require(path.join(__dirname, '../', 'models/index'));
const errorService = require(path.join(__dirname, '../','services/errorService'));

module.exports = {
  findAllForSpecificInvestee: async function (request, reply) {
    try {
      const language = 1; // request.pre.languageId;
      const limit = parseInt(request.query.per_page) || 25;
      const offset = parseInt((request.query.page-1) * request.query.per_page) || 0;
      const foundInvesteeInvestmentProposals = await models.investeeInvestmentProposals.findAndCountAll({
        where: { investeeId: request.params.investeeId },
        include: [
          { association: 'currency', required: true },
          {
            association: 'investeeInvestmentProposalTranslation',
            where: { languageId: language },
            required: true,
          },
          {
            association: 'investee', required: true,
            include: [
              { association: 'investeeTranslation', required: true, where: { languageId: language } },
              {
                association: 'basicData',
                required: true,
                include: [
                  {
                    association: 'companiesBasicDataTranslation',
                    required: true,
                    where: { languageId: language }
                  }
                ]
              }
            ]
          },
          {
            association: 'investmentProposalType',
            required: true,
            include: [
              {
                association: 'investmentTypesTranslation',
                where: { languageId: language },
                required: true
              }
            ]
          }
        ],
        limit: limit,
        offset: offset,
        order: [['createdAt', 'DESC']],
      });

      return reply.response(foundInvesteeInvestmentProposals).code(200);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },
  findAll: async function (request, reply) {
    try {
      const language = 1; //request.pre.languageId;
      const limit = parseInt(request.query.per_page) || 25;
      const offset = parseInt((request.query.page-1) * request.query.per_page) || 0;
      const { valueOfTheInvestmentRequired } = request.query;
      const { investeeCountry } = request.query;
      const { investeeSector } = request.query;
      const { investeeSubSector } = request.query;
      const { investeeCapital } = request.query;
      const Includes = [
        { association: 'currency', required: true },
        {
          association: 'investeeInvestmentProposalTranslation',
          where: { languageId: language },
          required: true,
        },
        {
          association: 'investee', required: true,
          include: [
            { association: 'investeeTranslation', required: true, where: { languageId: language } },
            {
              association: 'basicData',
              required: true,
              include: [
                {
                  association: 'companiesBasicDataTranslation',
                  required: true,
                  where: { languageId: language }
                }
              ]
            }
          ]
        },
        {
          association: 'investmentProposalType',
          required: true,
          include: [
            {
              association: 'investmentTypesTranslation',
              where: { languageId: language },
              required: true
            }
          ]
        }
      ];

      if(valueOfTheInvestmentRequired) {
        Includes[0].where.valueOfTheInvestmentRequired = valueOfTheInvestmentRequired;
      }

      if(investeeCountry) {
        Includes[1].include[1].include[0].where[''] = fn('JSON_CONTAINS', col('investee->basicData->companiesBasicDataTranslation.address'),'"'+ investeeCountry + '"', '$.country');
      }

      if(investeeSector) {
        Includes[1].include[1].include[0].where.sector = investeeSector;
      }

      if(investeeSubSector) {
        Includes[1].include[1].include[0].where.subSector = investeeSubSector;
      }

      if(investeeCapital) {
        Includes[1].include.push({ association: 'capital',required: true, where: { languageId: language, issuedCapital: investeeCapital } });
      }

      const foundInvesteeInvestmentProposals = await models.investeeInvestmentProposals.findAndCountAll({
        include: Includes,
        limit: limit,
        offset: offset,
        order: [['createdAt', 'DESC']],
      });

      return reply.response(foundInvesteeInvestmentProposals).code(200);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },
  findOne: async function (request, reply) {
    try {
      const language = 'en'; //request.pre.languageId;
      const foundInvesteeInvestmentProposal = await models.investeeInvestmentProposals.findOne({
        where: { id: request.params.id },
        include: [{ association: 'investeeInvestmentProposalTranslation', where: { languageId: language }, required: true }]
      });

      return reply.response(foundInvesteeInvestmentProposal || {}).code(200);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },
  findBasedInvestee: async function (request, reply) {
    try {
      const language = 'en'; //request.pre.languageId;
      const foundInvesteeInvestmentProposal = await models.investeeInvestmentProposals.findAll({
        where: { investeeId: request.params.investeeId },
        include: [{ association: 'investeeInvestmentProposalTranslation', where: { languageId: language }, required: true }]
      });

      for(let i = 0; i < foundInvesteeInvestmentProposal.length; i++){
        let proposal = await models.investeeInvestmentProposalTranslation.findAll({
          where: { investeeInvestmentProposalId: foundInvesteeInvestmentProposal[i].id }
        });
        let translation = [];
        if(proposal.length > 1){
          translation.push({
            propertyName: "pp_description",
            translation: {
                  "Ar": proposal[1].description,
                  "Fr": proposal[2].description,
                  "Po": proposal[3].description,
                  "Sp": proposal[4].description
                  }
            },{
            propertyName: "pp_PurposeOfTheRequiredInvestment",
            translation: {
                  "Ar": proposal[1].PurposeOfTheRequiredInvestment,
                  "Fr": proposal[2].PurposeOfTheRequiredInvestment,
                  "Po": proposal[3].PurposeOfTheRequiredInvestment,
                  "Sp": proposal[4].PurposeOfTheRequiredInvestment
                 }
            }
          );
        }
        foundInvesteeInvestmentProposal[i].dataValues["translation"] = translation;
      }
      // foundInvesteeInvestmentProposal.shift();
      return reply.response(foundInvesteeInvestmentProposal || {}).code(200);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },
  create: async function (request, reply) {
    let uploadImageExtension = null, relativePath= null, fileName = null, fullPath= null;
    let transaction;
    try {
      const language = 'en';
      const { payload } = request;
      transaction = await models.sequelize.transaction();
      let createdInvesteeInvestmentProposal = null;
      let createdInvesteeInvestmentProposalTranslation = null;
    for(let i = 0; i < payload.length; i++){

      payload[i].investeeId = request.params.investeeId;
      payload[i].createdBy = request.params.userId;
      const foundInvestee = await models.investee.findOne({ where: { id: request.params.investeeId } });

      if(_.isEmpty(foundInvestee)) {
        return Boom.badRequest('The Investee Company Does Not Exist, You have to create It First');
      }
       createdInvesteeInvestmentProposal = await models.investeeInvestmentProposals.create(payload[i], { transaction });
      payload[i].investmentProposalTranslation.languageId = language;
      payload[i].investmentProposalTranslation.investeeInvestmentProposalId = createdInvesteeInvestmentProposal.id;
       createdInvesteeInvestmentProposalTranslation =
        await models.investeeInvestmentProposalTranslation.create(payload[i].investmentProposalTranslation, { transaction });

        ///////// translation

        let translation = payload[i].translation;
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
        let langauges = ['ar', 'fr', 'po', 'sp'];
        for(let k = 0; k < langauges.length; k++){
          let obj = payload[i].investmentProposalTranslation;
      obj.description = null;
      obj.PurposeOfTheRequiredInvestment = null;
          for(let i = 0; i < translation.length; i++){
            let column;
            switch(langauges[k]){
              case 'ar':
                  obj["languageId"] = 'ar';
                   column = translation[i].propertyName.substr(3);
                  obj[column] = translation[i].translation.Ar;
              break;
              case 'fr':
                  obj["languageId"] = 'fr';
                   column = translation[i].propertyName.substr(3);
                  obj[column] = translation[i].translation.Fr;
              break;
              case 'po':
                  obj["languageId"] = 'po';
                   column = translation[i].propertyName.substr(3);
                  obj[column] = translation[i].translation.Po;
              break;
              case 'sp':
                  obj["languageId"] = 'sp';
                   column = translation[i].propertyName.substr(3);
                  obj[column] = translation[i].translation.Sp;
              break;
              default:
                break;
            }
          }
          await models.investeeInvestmentProposalTranslation.create(obj, { transaction });
         }

      }
      await transaction.commit();

      return reply.response(_.assign(createdInvesteeInvestmentProposal.toJSON(), { investmentProposalTranslation: createdInvesteeInvestmentProposalTranslation.toJSON() })).code(201);
    }
    catch (e) {
      console.log('error', e);
      fs.unlinkSync(path.join(__dirname, '../', fullPath, fileName));

      if(transaction) {
        await transaction.rollback();
      }

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },
  translate: async function (request, reply) {
    try {
      const language = 1; //request.pre.languageId;
      const { payload } = request;
      const foundInvestee = await models.investee.findOne({
        where: { id: request.params.companyId },
        include: [
          {
            association: 'investmentProposals',
            where: { id: request.params.id },
            required: false,
            include: [
              {
                association: 'investeeInvestmentProposalTranslation',
                where: { languageId: language },
                required: false,
              }
            ]
          }
        ]
      });

      if(_.isEmpty(foundInvestee)) {

        return Boom.notFound('The Investee Company Is Not Found, You have to create It First');
      }

      if(_.isEmpty(foundInvestee.investmentProposals)) {

        return Boom.notFound('The Investee investment Proposals Is Not Found, You have to create It First');
      }

      if(!_.isEmpty(foundInvestee.investmentProposals[0].investeeInvestmentProposalTranslation)) {

        return Boom.notFound('The Investee Investment Proposal Has Been Translated To That Language');
      }

      payload.investmentProposalTranslation.investeeInvestmentProposalId = request.params.id;
      payload.investmentProposalTranslation.languageId = language;
      const investmentProposalTranslation =
        await models.investeeInvestmentProposalTranslation.create(payload.investmentProposalTranslation);

      return reply.response(investmentProposalTranslation).code(201);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },
  update: async function (request, reply) {
    let uploadImageExtension = null, relativePath= null, fileName = null, fullPath= null;
    let transaction;
    try {
      let { payload } = request;
      let language = 'en';
      let langauges = ['ar', 'fr', 'po', 'sp'];
      let translation = payload.translation;
      const foundInvesteeInvestmentProposal = await models.investeeInvestmentProposals.findOne({ where: { id: request.params.id }, raw: true });

      if(_.isEmpty(foundInvesteeInvestmentProposal)) {
        return Boom.badRequest('Investee investment proposal You Try To Update Does Not Exist');
      }

      transaction = await models.sequelize.transaction();
      await models.investeeInvestmentProposals.update(payload, { where: { id: request.params.id }, transaction });

      // if(!_.isEmpty(payload.managementTranslation)) {
        payload.investmentProposalTranslation.langauegeId = language;
        await models.investeeInvestmentProposalTranslation.update(payload.investmentProposalTranslation,
          { where: { id: request.params.transId }, transaction }); //payload.investmentProposalTranslation.id

          for(let k = 0; k < langauges.length; k++){
            let obj = payload.investmentProposalTranslation;
            obj.description = null;
            obj.PurposeOfTheRequiredInvestment = null;
            for(let i = 0; i < translation.length; i++){
              let column;
              switch(langauges[k]){
                case 'ar':
                    language = 'ar';
                    obj["languageId"] = 'ar';
                     column = translation[i].propertyName.substr(3);
                    obj[column] = translation[i].translation.Ar;
                break;
                case 'fr':
                 language = 'fr';
                    obj["languageId"] = 'fr';
                     column = translation[i].propertyName.substr(3);
                    obj[column] = translation[i].translation.Fr;
                break;
                case 'po':
                 language = 'po';
                    obj["languageId"] = 'po';
                     column = translation[i].propertyName.substr(3);
                    obj[column] = translation[i].translation.Po;
                break;
                case 'sp':
                 language = 'sp';
                    obj["languageId"] = 'sp';
                     column = translation[i].propertyName.substr(3);
                    obj[column] = translation[i].translation.Sp;
                break;
                default:
                  break;
              }
            }
            await models.investeeInvestmentProposalTranslation.update(obj,
              { where: { investeeInvestmentProposalId: request.params.id, languageId: language }, transaction }); //payload.investmentProposalTranslation.id

         }
      // }

      await transaction.commit();

      return reply.response({ status: 200, message: "Updated successfully"}).code(200);
    }
    catch (e) {
      console.log('error', e);
      // fs.unlinkSync(path.join(__dirname, '../', fullPath, fileName));

      if(transaction) {
        await transaction.rollback();
      }

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },
  delete: async function (request, reply) {
    try {
      const foundInvesteeAttachmentsType = await models.investeeInvestmentProposals.findOne({ where: { id: request.params.id }, raw: true });

      if(_.isEmpty(foundInvesteeAttachmentsType)) {
        return reply.response().code(204);
      }

      await models.investeeInvestmentProposals.destroy({ where: { id: request.params.id } });
      await fsPromises.unlink(path.join(__dirname, '../', foundInvesteeAttachmentsType.attachmentPath));

      return reply.response().code(204);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  }
};
