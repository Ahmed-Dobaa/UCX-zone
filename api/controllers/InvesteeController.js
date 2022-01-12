'use strict';

const Boom = require('boom');
const path = require('path');
const _ = require('lodash');
const moment = require('moment');
const fs = require('fs');
const { fn, col } = require('sequelize');
let investeeCapital = require('./InvesteeCapitalController');
const errorService = require(path.join(__dirname, '../','services/errorService'));

const models = require(path.join(__dirname, '../models/index'));

function getRandomInt (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
}
module.exports = {
  findAllForLoggedInUser: async function (request, reply) {
    try {
      const { languageId } = request.pre;
      const limit = parseInt(request.query.per_page) || 25;
      const offset = parseInt((request.query.page-1) * request.query.per_page) || 0;
      const { name } = request.query;
      const { country } = request.query;
      const { sector } = request.query;
      const { subSector } = request.query;
      const Includes = [
        { association: 'investeeTranslation', required: true, where: { languageId: languageId } },
        {
          association: 'basicData',
          required: true,
          include: [
            {
              association: 'companiesBasicDataTranslation',
              required: true,
              where: { languageId: languageId }
            }
          ]
        },
        {
          association: 'users',
          required: true,
          through: { where: { userId: request.auth.decoded.id }, attributes: [] },
          attributes: []
        }
      ];

      if(name) {
        Includes[1].include[0].where.name = { like: `%${name}%` };
      }

      if(country) {
        Includes[1].include[0].where[''] = fn('JSON_CONTAINS', col('address'),'"'+ country + '"', '$.country');
      }

      if(sector) {
        Includes[1].include[0].where.sector = { like: `%${sector}%` };
      }

      if(subSector) {
        Includes[1].include[0].where.subSector = { like: `%${subSector}%` };
      }

      const foundInvesteeCompanies = await models.investee.findAndCountAll({
        include: Includes,
        limit: limit,
        offset: offset,
        order: [['createdAt', 'DESC']],
      });

      return reply.response(foundInvesteeCompanies).code(206);
    }
    catch (e) {
      console.log('e.errors', e);

      return errorService.wrapError(e);
    }
  },
  findAll: async function (request, reply) {
    try {
      const  languageId  = 1; //request.pre;
      const limit = parseInt(request.query.per_page) || 25;
      const offset = parseInt((request.query.page-1) * request.query.per_page) || 0;
      const { name } = request.query;
      const { country } = request.query;
      const { sector } = request.query;
      const { subSector } = request.query;
      const Includes = [
        { association: 'investeeTranslation', required: true, where: { languageId: languageId } },
        {
          association: 'basicData',
          required: true,
          include: [
            {
              association: 'companiesBasicDataTranslation',
              required: true,
              where: { languageId: languageId }
            }
          ]
        },
        {
          association: 'investmentProposals',
          order: [['createdAt', 'DESC']],
          limit: 1,
          required: false,
          include: [
            { association: 'currency', required: true },
            {
              association: 'investeeInvestmentProposalTranslation',
              where: { languageId: languageId },
              required: true,
            },
            {
              association: 'investmentProposalType',
              required: true,
              include: [
                {
                  association: 'investmentTypesTranslation',
                  where: { languageId: languageId },
                  required: true
                }
              ]
            }
          ]
        }
      ];

      if(name) {
        Includes[1].include[0].where.name = { like: `%${name}%` };
      }

      if(country) {
        Includes[1].include[0].where[''] = fn('JSON_CONTAINS', col('address'),'"'+ country + '"', '$.country');
      }

      if(sector) {
        Includes[1].include[0].where.sector = { like: `%${sector}%` };
      }

      if(subSector) {
        Includes[1].include[0].where.subSector = { like: `%${subSector}%` };
      }

      const foundInvesteeCompanies = await models.investee.findAndCountAll({
        include: Includes,
        limit: limit,
        offset: offset,
        order: [['createdAt', 'DESC']],
      });

      return reply.response(foundInvesteeCompanies).code(206);
    }
    catch (e) {
      console.log('e.errors', e);

      return errorService.wrapError(e);
    }
  },
  findOne: async (request, reply) => {
    try {
      const  languageId  = 'en'; // request.pre;
      const foundInvesteeCompanies = await models.investee.findOne({
        where: { id: request.params.id },
        include: [
          { association: 'investeeTranslation', required: true, where: { languageId: languageId } },
          {
            association: 'basicData',
            required: true,
            include: [
              {
                association: 'companiesBasicDataTranslation',
                required: true,
                where: { languageId: languageId }
              }
            ]
          }
        ]
      });
      let basicDataTrans = await models.companiesBasicDataTranslation.findAll({where : {companyBasicDataId: foundInvesteeCompanies.basicData.id }});
      let translation = [];
      if(basicDataTrans.length > 1){
        translation = [
          {
            propertyName: "name",
            translation: {
              "Ar": basicDataTrans[1].name,
              "Fr": basicDataTrans[2].name,
              "Po": basicDataTrans[3].name,
              "Sp": basicDataTrans[4].name
            }},
            {
              propertyName: "companyPurpose",
              translation: {
                "Ar": basicDataTrans[1].companyPurpose,
                "Fr": basicDataTrans[2].companyPurpose,
                "Po": basicDataTrans[3].companyPurpose,
                "Sp": basicDataTrans[4].companyPurpose
              }
          },
         {
          propertyName: "productsOrServices",
          translation: {
            "Ar": basicDataTrans[1].productsOrServices,
            "Fr": basicDataTrans[2].productsOrServices,
            "Po": basicDataTrans[3].productsOrServices,
            "Sp": basicDataTrans[4].productsOrServices
          }
       }
      ]
      }
      foundInvesteeCompanies.basicData.dataValues["translation"] = translation;
      const capital = await models.investeeCapital.findOne({ where: {investeeId: request.params.id}})
      const director = await models.investeeBoardOfDirectors.findOne({
        where: { investeeId: request.params.id },
        include: [{ association: 'boardOfDirectorTranslation', where: { languageId: languageId }, required: true }]
      });

      let investeeOwnership = await models.investeeOwnerships.findOne({
        where: { investeeId: request.params.id }});
      let investeeOwnershipTranslation;
      if(investeeOwnership != null){
         investeeOwnershipTranslation = await models.investeeOwnershipTranslation.findOne({
          where: { investeeOwnershipId: investeeOwnership.id }});
          investeeOwnership = {investeeOwnership, "investeeOwnershipTranslation": investeeOwnershipTranslation.dataValues}
      }


        const investeeAuditor = await models.investeeAuditor.findOne({
          where: { investeeId: request.params.id },
          include: [{ association: 'auditorTranslation', where: { languageId: languageId }, required: true }]
        });

        let subsidiary = await models.companies_relations.findOne({
          where: { parentId: foundInvesteeCompanies.companyId}, // childId: request.params.id },
          include: [{ model: models.companiesBasicData, as: 'basicData', required: true,
          include: [
            {
              association: 'companiesBasicDataTranslation',
              required: true,
              where: { languageId: languageId }
            }
          ]
         }]
        });
       let investeeTranslation = await models.investeeTranslation.findOne({
         where: { investeeId: request.params.id}
       })

      //  subsidiary.investeeTranslation = investeeTranslation;

        let investeeIncome = await models.investeeIncomes.findOne(
          {where: { investeeId: request.params.id }});

        // let investeeBalance = await models.investeeBalances.findOne(
        //   {where: { investeeId: request.params.id }});

          let investeeIncomeTranslation, balanceTranslation, investeeBalanceTranslation;
          if(investeeIncome != null){
             investeeIncomeTranslation = await models.investeeIncomeTranslation.findAll(
              {where: { investeeIncomeId: investeeIncome.id }});

              // balanceTranslation = await models.investeeBalanceTranslation.findAll(
              //   {where: { investeeBalanceId: investeeBalance.id }});
          }


          let investeeBalance = await models.investeeBalances.findOne(
            {
              where: { investeeId: request.params.id },
              // include: { association: 'balanceTranslation', required: true, where: { languageId: languageId } }
            });

            if(investeeBalance != null){
              investeeBalanceTranslation = await models.investeeBalanceTranslation.findAll(
               {where: { investeeBalanceId: investeeBalance.id }});

               // balanceTranslation = await models.investeeBalanceTranslation.findAll(
               //   {where: { investeeBalanceId: investeeBalance.id }});
           }

        if(investeeIncome != null){
          for(let i = 0; i < investeeBalanceTranslation.length; i++){
            investeeIncomeTranslation[i].fixedAssets = investeeBalanceTranslation[i].fixedAssets;
            investeeIncomeTranslation[i].currentAssets = investeeBalanceTranslation[i].currentAssets;
            investeeIncomeTranslation[i].currentLiabilities = investeeBalanceTranslation[i].currentLiabilities;
            investeeIncomeTranslation[i].longTermLiabilities = investeeBalanceTranslation[i].longTermLiabilities;
          }

        }

        investeeIncome = { investeeIncome, investeeIncomeTranslation, investeeBalance, investeeBalanceTranslation}

        const investeeAttachment = await models.investeeAttachments.findOne({ where: { companyId: foundInvesteeCompanies.companyId    }, raw: true });

        const investeeInvestmentProposal = await models.investeeInvestmentProposals.findOne({
          where: { investeeId: request.params.id },
          include: [{ association: 'investeeInvestmentProposalTranslation', where: { languageId: languageId }, required: true }]
        });

        if(investeeInvestmentProposal != null){
          let _proposal = await models.investeeInvestmentProposalTranslation.findAll({
            where: { investeeInvestmentProposalId: investeeInvestmentProposal.id }
          });
          if(_proposal.length > 1){
            translation.push({
              propertyName: "description",
              translation: {
                    "Ar": _proposal[1].description,
                    "Fr": _proposal[2].description,
                    "Po": _proposal[3].description,
                    "Sp": _proposal[4].description
                    }
              },{
              propertyName: "PurposeOfTheRequiredInvestment",
              translation: {
                    "Ar": _proposal[1].PurposeOfTheRequiredInvestment,
                    "Fr": _proposal[2].PurposeOfTheRequiredInvestment,
                    "Po": _proposal[3].PurposeOfTheRequiredInvestment,
                    "Sp": _proposal[4].PurposeOfTheRequiredInvestment
                   }
              }
            );
          }
        }

        return reply.response({status: 200, company_data: foundInvesteeCompanies, capital: capital,
                    board_director: director, investee_ownership: investeeOwnership, investee_auditor: investeeAuditor,
                    subsidiary: subsidiary, financial: investeeIncome, investee_attachment: investeeAttachment,
                    investee_proposal: investeeInvestmentProposal }|| {}).code(200);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },


/////////////////////////////////


companyBasicInfo: async (request, reply) => {
  let transaction;
  try {
    transaction = await models.sequelize.transaction();
    const userId = request.auth.decoded ? request.auth.decoded.id : request.params.userId;

    const { payload } = request;
    const { companyBasicData, investeeTranslation } = payload;
    let translation = companyBasicData.companiesBasicDataTranslation.translation;
    companyBasicData.companiesBasicDataTranslation.languageId = 'en';
    investeeTranslation.languageId = 'en';

    // check first that company basic data exist or not.
    let checkRegistrationIdNo = await models.companiesBasicDataTranslation.findOne( { where: {
               registrationIdNo: companyBasicData.companiesBasicDataTranslation.registrationIdNo, languageId: 'en' }})

    // check if this registration id number exist or not
    console.log("checkRegistrationIdNo")
    console.log(checkRegistrationIdNo);
    if(checkRegistrationIdNo != null){
      console.log("here");
      await transaction.rollback();
      return reply.response({status: 406, message: "This registration id number already exist"}).code(406);
    }else{
      companyBasicData["user_id"] = request.params.userId;
      companyBasicData.type = 'investee';
      const createdCompanyBasicData = await models.companiesBasicData.create(companyBasicData, { transaction });
      companyBasicData.companiesBasicDataTranslation.companyBasicDataId = createdCompanyBasicData.id;
      await models.companiesBasicDataTranslation.create(companyBasicData.companiesBasicDataTranslation, { transaction });


      let langauges = ['ar', 'fr', 'po', 'sp'];
   for(let k = 0; k < langauges.length; k++){
    let obj = companyBasicData.companiesBasicDataTranslation;
    obj.name = null;
    obj.productsOrServices = null;
    obj.companyPurpose = null;
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


      const code = `${moment().format('YYMM')}${new Date().valueOf()}`;
      const createdInvestee = await models.investee.create({ companyId: createdCompanyBasicData.id, code: code, createdBy: userId }, { transaction });
      investeeTranslation.investeeId = createdInvestee.id;
      await models.investeeTranslation.create(investeeTranslation, { transaction });
      await models.usersInvestees.create({ userId: userId , investeeId: createdInvestee.id, roleId: 2 }, { transaction });


      await models.request_Role_company.create({
        userId: userId,
        companyId: createdInvestee.id,
        requestedRole: " "
      }, { transaction });

      await transaction.commit();
      //////  ************************ proposal  ***************************
      try {
        let _language = 'en';
        const  _payload  = request.payload.proposal;


        _payload.investeeId = createdInvestee.id; //request.params.investeeId;
        _payload.createdBy = request.params.userId; //request.auth.decoded.id;
        const foundInvestee = await models.investee.findOne({ where: { id: createdInvestee.id } });

        if(_.isEmpty(foundInvestee)) {
          return Boom.badRequest('The Investee Company Does Not Exist, You have to create It First');
        }

        transaction = await models.sequelize.transaction();

        const createdInvesteeInvestmentProposal = await models.investeeInvestmentProposals.create(_payload, { transaction });
        _payload.investmentProposalTranslation.languageId = _language;
        _payload.investmentProposalTranslation.investeeInvestmentProposalId = createdInvesteeInvestmentProposal.id;
        const createdInvesteeInvestmentProposalTranslation =
        await models.investeeInvestmentProposalTranslation.create(_payload.investmentProposalTranslation, { transaction });

        for(let k = 0; k < langauges.length; k++){
         let obj = _payload.investmentProposalTranslation;
     obj.description = null;
     obj.PurposeOfTheRequiredInvestment = null;
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
         await models.investeeInvestmentProposalTranslation.create(obj, { transaction });
        }
      }
      catch (e) {
        console.log('error', e);

        if(transaction) {
          await transaction.rollback();
        }

        return errorService.wrapError(e, 'An internal server error occurred');
      }

      /////
      await transaction.commit();
      payload.id = createdInvestee.id;

      return reply.response(payload).code(201);}

}catch (e) {
    console.log('error', e);

    if(transaction) {
      await transaction.rollback();
    }

    return errorService.wrapError(e, 'An internal server error occurred');
  }
},

/////////////////////////////////

  create: async (request, reply) => {
    let transaction;
    try {
      transaction = await models.sequelize.transaction();
      const userId = request.auth.decoded ? request.auth.decoded.id : request.params.userId;

      const { payload } = request;
      const { companyBasicData, investeeTranslation } = payload;
      let translation = companyBasicData.companiesBasicDataTranslation.translation;
      companyBasicData.companiesBasicDataTranslation.languageId = 'en';
      investeeTranslation.languageId = 'en';

      // check first that company basic data exist or not.
      let checkRegistrationIdNo = await models.companiesBasicDataTranslation.findOne( { where: {
                 registrationIdNo: companyBasicData.companiesBasicDataTranslation.registrationIdNo }})

      // check if this registration id number exist or not
      if(checkRegistrationIdNo != null){
        await transaction.rollback();
        return reply.response({status: 406, message: "This registration id number already exist"}).code(406);
      }
      companyBasicData["user_id"] = request.params.userId;
      companyBasicData.type = 'investee';
      const createdCompanyBasicData = await models.companiesBasicData.create(companyBasicData, { transaction });
      companyBasicData.companiesBasicDataTranslation.companyBasicDataId = createdCompanyBasicData.id;
      await models.companiesBasicDataTranslation.create(companyBasicData.companiesBasicDataTranslation, { transaction });


      let langauges = ['ar', 'fr', 'po', 'sp'];
   for(let k = 0; k < langauges.length; k++){
    let obj = companyBasicData.companiesBasicDataTranslation;

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


      const code = `${moment().format('YYMM')}${new Date().valueOf()}`;
      const createdInvestee = await models.investee.create({ companyId: createdCompanyBasicData.id, code: code, createdBy: userId }, { transaction });
      investeeTranslation.investeeId = createdInvestee.id;
      await models.investeeTranslation.create(investeeTranslation, { transaction });
      await models.usersInvestees.create({ userId: userId , investeeId: createdInvestee.id, roleId: 2 }, { transaction });

      // if(!_.isEmpty(request.payload.avatar)) {
      //   const allowedExtensions = ['.tif', '.png', '.svg', '.jpg', '.gif'];
      //   const uploadImageExtension = path.extname(request.payload.avatar.hapi.filename);
      //   const relativePath = `uploads/investees/avatars/${createdInvestee.id}-${moment().valueOf()}-${uploadImageExtension}`;
      //   const fullPath = path.join(__dirname, '../', relativePath);

      //   if(!_.includes(allowedExtensions, uploadImageExtension.toLowerCase())) {

      //     return Boom.badRequest(`allowed images extension are  ${allowedExtensions.join(' , ')}`);
      //   }

        // await fs.promises.mkdir(path.join(__dirname, '../', 'uploads/investees/avatars/'), { recursive: true });
        // await fs.promises.access(path.join(__dirname, '../', 'uploads/investees/avatars/'), fs.constants.W_OK);

        // await request.payload.avatar.pipe(fs.createWriteStream(fullPath));
        // await models.investee.update({ avatar: relativePath }, { where: { id: createdInvestee.id }, transaction });
      // }

      await models.request_Role_company.create({
        userId: userId,
        companyId: createdInvestee.id,
        requestedRole: " "
      }, { transaction });

      await transaction.commit();
      payload.id = createdInvestee.id;

      return reply.response(payload).code(201);

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
      const language = 1; // request.pre.languageId;
      const foundInvestee = await models.investee.findOne({
        where: { id: request.params.id },
        include: [
          {
            association: 'basicData',
            required: false,
            include: [
              {
                association: 'companiesBasicDataTranslation',
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

      transaction = await models.sequelize.transaction();

      request.payload.investeeTranslation.investeeId = request.params.id;
      request.payload.investeeTranslation.languageId = language;

      await models.investeeTranslation.create(request.payload.investeeTranslation, { transaction });
      request.payload.companiesBasicDataTranslation.companyBasicDataId = foundInvestee.basicData.id;
      request.payload.companiesBasicDataTranslation.languageId = language;
      const investeeManagementTranslation = await models.companiesBasicDataTranslation.create(request.payload.companiesBasicDataTranslation, { transaction });

      await transaction.commit();

      return reply.response(investeeManagementTranslation).code(201);
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
      let language = 'en';
      const investeeId = request.params.id;
      const { payload } = request;
      const foundInvesteeCompany = await models.investee.findOne({
        where: { id: investeeId },
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
      });

      if(_.isEmpty(foundInvesteeCompany)) {

        return Boom.notFound('Company You Try To Update does Not Exist');
      }

      transaction = await models.sequelize.transaction();

      if(! _.isEmpty(payload.companyBasicData)) {

        await models.companiesBasicData.update(payload.companyBasicData, { where: { id: foundInvesteeCompany.basicData.id }, transaction });
      }

      if(! _.isEmpty(payload.companyBasicData.companiesBasicDataTranslation)) {

        await models.companiesBasicDataTranslation.update(payload.companyBasicData.companiesBasicDataTranslation,
          { where: { id: foundInvesteeCompany.basicData.companiesBasicDataTranslation.id, languageId: language }, transaction });
      }

      let translation = payload.companyBasicData.companiesBasicDataTranslation.translation;
      let langauges = ['ar', 'fr', 'po', 'sp'];
      for(let k = 0; k < langauges.length; k++){
       let obj = payload.companyBasicData.companiesBasicDataTranslation;
       obj.name = null;
       obj.productsOrServices = null;
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
        { where: { companyBasicDataId: foundInvesteeCompany.basicData.id, languageId: language }, transaction });
    }




      if(! _.isEmpty(payload.investeeTranslation)) {

        await models.investeeTranslation.update(payload.investeeTranslation, { where: { id: foundInvesteeCompany.investeeTranslation.id }, transaction });
      }

      await models.investee.update({ phoneNumbers: payload.phoneNumbers }, { where: { id: investeeId }, transaction });

      // if(!_.isEmpty(request.payload.avatar)) {
      //   const allowedExtensions = ['.tif', '.png', '.svg', '.jpg', '.gif'];
      //   const uploadImageExtension = path.extname(request.payload.avatar.hapi.filename);
      //   const relativePath = `uploads/investees/avatars/${investeeId}-${moment().valueOf()}-${uploadImageExtension}`;
      //   const fullPath = path.join(__dirname, '../', relativePath);

      //   if(!_.includes(allowedExtensions, uploadImageExtension.toLowerCase())) {

      //     return Boom.badRequest(`allowed images extension are  ${allowedExtensions.join(' , ')}`);
      //   }

        // await fs.promises.mkdir(path.join(__dirname, '../', 'uploads/investees/avatars/'), { recursive: true });
        // await fs.promises.access(path.join(__dirname, '../', 'uploads/investees/avatars/'), fs.constants.W_OK);

      //   await request.payload.avatar.pipe(fs.createWriteStream(fullPath));
      //   await models.investee.update({ avatar: relativePath }, { where: { id: investeeId }, transaction });
      // }
      await transaction.commit();

      return reply.response({status: 200, message: "updated successfully"}).code(200);
    }
    catch (e) {
      console.log('error', e);

      if(transaction) {
        await transaction.rollback();
      }

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },


  updateBasicInfo: async (request, reply) => {
    let transaction;

    try {
      const { payload } = request;

      let language = 'en';
      const investeeId = request.params.id;

      const foundInvesteeCompany = await models.investee.findOne({
        where: { id: investeeId },
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
      });

      if(_.isEmpty(foundInvesteeCompany)) {

        return Boom.notFound('Company You Try To Update does Not Exist');
      }

      transaction = await models.sequelize.transaction();

      if(! _.isEmpty(payload.companyBasicData)) {

        await models.companiesBasicData.update(payload.companyBasicData, { where: { id: foundInvesteeCompany.basicData.id }, transaction });
      }

      if(! _.isEmpty(payload.companyBasicData.companiesBasicDataTranslation)) {

        await models.companiesBasicDataTranslation.update(payload.companyBasicData.companiesBasicDataTranslation,
          { where: { id: foundInvesteeCompany.basicData.companiesBasicDataTranslation.id, languageId: language }, transaction });
      }
      let translation = payload.companyBasicData.companiesBasicDataTranslation.translation;

      let langauges = ['ar', 'fr', 'po', 'sp'];
      for(let k = 0; k < langauges.length; k++){
       let obj = payload.companyBasicData.companiesBasicDataTranslation;
       obj.name = null;
       obj.productsOrServices = null;
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
        { where: { companyBasicDataId: foundInvesteeCompany.basicData.id, languageId: language }, transaction });
    }



      if(! _.isEmpty(payload.investeeTranslation)) {

        await models.investeeTranslation.update(payload.investeeTranslation, { where: { id: foundInvesteeCompany.investeeTranslation.id }, transaction });
      }

      await models.investee.update({ phoneNumbers: payload.phoneNumbers }, { where: { id: investeeId }, transaction });

      try {
        const  _payload  = request.payload.proposal;


        const foundInvesteeInvestmentProposal = await models.investeeInvestmentProposals.findOne({ where: { id: request.params.proposalId }, raw: true });

        if(_.isEmpty(foundInvesteeInvestmentProposal)) {
          return Boom.badRequest('Investee investment proposal You Try To Update Does Not Exist');
        }
        let _language = 'en';
        await models.investeeInvestmentProposals.update(_payload, { where: { id: request.params.proposalId }, transaction });

          _payload.investmentProposalTranslation.languageId = _language;
          await models.investeeInvestmentProposalTranslation.update(_payload.investmentProposalTranslation,
            { where: { investeeInvestmentProposalId: request.params.proposalId, languageId: _language }, transaction }); //payload.investmentProposalTranslation.id

            for(let k = 0; k < langauges.length; k++){
              let obj = request.payload.proposal;
              obj.description = null;
              obj.PurposeOfTheRequiredInvestment = null;
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
              await models.investeeInvestmentProposalTranslation.update(obj,
                { where: { investeeInvestmentProposalId: request.params.proposalId, languageId: language }, transaction }); //payload.investmentProposalTranslation.id

           }

      }
      catch (e) {
        console.log('error', e);

        if(transaction) {
          await transaction.rollback();
        }

        return errorService.wrapError(e, 'An internal server error occurred');
      }
      await transaction.commit();

      return reply.response({status: 200, message: "updated successfully"}).code(200);
    }
    catch (e) {
      console.log('error', e);

      if(transaction) {
        await transaction.rollback();
      }
      await transaction.commit();
      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },


  delete: async (request, reply) => {
    try {

      await models.investee.destroy({ where: { id: request.params.id } });

      return reply.response().code(204);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },
  checkingMailUniqueness: async function (request, reply) {
    try {
      const foundRegistrationIdNo = await models.companiesBasicDataTranslation.findOne({
        where: { registrationIdNo: request.query.registrationIdNo },
        attributes: ['registrationIdNo']
      });

      if(_.isEmpty(foundRegistrationIdNo)) {
        return reply.response().code(204);
      }

      return reply.response().code(409);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  },

  // uploadCompanyImg: async function (request, reply) {
  //   const allowedExtensions = ['.tif', '.png', '.svg', '.jpg', '.gif'];
  //   const uploadImageExtension = path.extname(request.payload.avatar.hapi.filename);
  //   const relativePath = `uploads/company/${request.params.id}-${moment().valueOf()}-${uploadImageExtension}`;
  //   const fullPath = path.join(__dirname, '../', relativePath);
  //   let oldPath = null;
  //   try {

  //     if(!_.includes(allowedExtensions, uploadImageExtension.toLowerCase())) {

  //       return Boom.badRequest(`allowed images extension are  ${allowedExtensions.join(' , ')}`);
  //     }

  //     const foundUser = await models.companiesBasicDataTranslation.findOne({ where: { companiesBasicDataId: request.params.id }, raw: true });
  //     oldPath = foundUser.img;
  //     await request.payload.avatar.pipe(fs.createWriteStream(fullPath));
  //     await models.companiesBasicDataTranslation.update({ img: relativePath }, { where: { companiesBasicDataId: request.params.id } });

  //     return reply.response({ message: "updated"}).code(201);
  //   }
  //   catch (e) {
  //     console.log('error', e);
  //     fs.unlinkSync(path.join(__dirname, '../', oldPath));

  //     return Boom.badImplementation('An internal server error occurred');
  //   }

  // }
};


