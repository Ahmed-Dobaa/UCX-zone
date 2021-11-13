'use strict';

const Boom = require('boom');
const path = require('path');
const models = require(path.join(__dirname, '../models/index'));
const _ = require('lodash');


async function investeeData(investeeId){
  try {
    const  languageId  = 1; // request.pre;
    const foundInvesteeCompanies = await models.investee.findOne({
      where: { id: investeeId },
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

    const capital = await models.investeeCapital.findOne({ where: {investeeId: investeeId}})
    const director = await models.investeeBoardOfDirectors.findOne({
      where: { investeeId: investeeId },
      include: [{ association: 'boardOfDirectorTranslation', where: { languageId: languageId }, required: true }]
    });

    let investeeOwnership = await models.investeeOwnerships.findOne({
      where: { investeeId: investeeId }});
    let investeeOwnershipTranslation;
    if(investeeOwnership != null){
       investeeOwnershipTranslation = await models.investeeOwnershipTranslation.findOne({
        where: { investeeOwnershipId: investeeOwnership.id }});
        investeeOwnership = {investeeOwnership, "investeeOwnershipTranslation": investeeOwnershipTranslation.dataValues}
    }


      const investeeAuditor = await models.investeeAuditor.findOne({
        where: { investeeId: investeeId },
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
       where: { investeeId: investeeId}
     })

    //  subsidiary.investeeTranslation = investeeTranslation;

      let investeeIncome = await models.investeeIncomes.findOne(
        {where: { investeeId: investeeId }});

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
            where: { investeeId: investeeId },
            // include: { association: 'balanceTranslation', required: true, where: { languageId: languageId } }
          });

          if(investeeBalance != null){
            investeeBalanceTranslation = await models.investeeBalanceTranslation.findAll(
             {where: { investeeBalanceId: investeeBalance.id }});

             // balanceTranslation = await models.investeeBalanceTranslation.findAll(
             //   {where: { investeeBalanceId: investeeBalance.id }});
         }

      if(investeeIncome != null ){
        console.log(investeeBalanceTranslation)
        if(investeeBalanceTranslation != undefined){
          for(let i = 0; i < investeeBalanceTranslation.length; i++){
            investeeIncomeTranslation[i].fixedAssets = investeeBalanceTranslation[i].fixedAssets;
            investeeIncomeTranslation[i].currentAssets = investeeBalanceTranslation[i].currentAssets;
            investeeIncomeTranslation[i].currentLiabilities = investeeBalanceTranslation[i].currentLiabilities;
            investeeIncomeTranslation[i].longTermLiabilities = investeeBalanceTranslation[i].longTermLiabilities;
          }

        }
      }

      investeeIncome = { investeeIncome, investeeIncomeTranslation, investeeBalance, investeeBalanceTranslation}

      const investeeAttachment = await models.investeeAttachments.findOne({ where: { companyId: foundInvesteeCompanies.companyId    }, raw: true });

      const investeeInvestmentProposal = await models.investeeInvestmentProposals.findOne({
        where: { investeeId: investeeId },
        include: [{ association: 'investeeInvestmentProposalTranslation', where: { languageId: languageId }, required: true }]
      });

      return ({company_data: foundInvesteeCompanies, capital: capital,
                  board_director: director, investee_ownership: investeeOwnership, investee_auditor: investeeAuditor,
                  subsidiary: subsidiary, financial: investeeIncome, investee_attachment: investeeAttachment,
                  investee_proposal: investeeInvestmentProposal }|| {});
  }
  catch (e) {
    console.log('error', e);

    return errorService.wrapError(e, 'An internal server error occurred');
  }
}

module.exports = {
  count: async function (request, reply) {
    try {
      const companies = await models.companiesBasicData.findAndCountAll({where: {type: "investee"}});
      const investors = await models.investor.findAndCountAll({});
      const users = await models.users.findAndCountAll({});
      return reply.response({companies_count: companies.count,
                             investors_count: investors.count,
                             users_count: users.count}).code(200);
    } catch (error) {
     console.log(error)
    }

  },

  findAll: async function (request, reply) {
    let progress = null;
    try {
      var foundCompanies = await models.companiesBasicData.findAll({
        where: {deleted: 0, type: "investee"},
        include: [
          { model: models.investee, as: 'investeeCompany'},
          { model: models.companiesBasicDataTranslation, as: 'companiesBasicDataTranslation' }
        ]
      });
      for(let i = 0; i < foundCompanies.length; i++){
        if(foundCompanies[i].type === 'investee'){
          let _investee = await investeeData(foundCompanies[i].investeeCompany.id);
          foundCompanies[i].dataValues["_investee_view"] = _investee;
          let investeeInvestmentProposal = await models.investeeInvestmentProposals.findOne({
            where: { investeeId: foundCompanies[i].investeeCompany.id },
           include: {
             model : models.investeeInvestmentProposalTranslation, as: "investeeInvestmentProposalTranslation"
           }})
           if(investeeInvestmentProposal){
            foundCompanies[i].dataValues.average_annual_sales = investeeInvestmentProposal.dataValues.investeeInvestmentProposalTranslation.average_annual_sales;
            foundCompanies[i].dataValues.estimated_company_value = investeeInvestmentProposal.dataValues.investeeInvestmentProposalTranslation.currentValueOfCompany;
            foundCompanies[i].dataValues.required_investment = investeeInvestmentProposal.dataValues.investeeInvestmentProposalTranslation.valueOfTheInvestmentRequired;
           }else{
            foundCompanies[i].dataValues.average_annual_sales = "0";
            foundCompanies[i].dataValues.estimated_company_value = "0";
            foundCompanies[i].dataValues.required_investment = "0";
           }
           progress = 30;
           const capitals = await models.investeeCapital.findAll({
            where: { investeeId: foundCompanies[i].investeeCompany.id }
          });
          const directors = await models.investeeBoardOfDirectors.findAll({
            where: { investeeId: foundCompanies[i].investeeCompany.id }})
          const ownerShip = await models.investeeOwnerships.findOne({
              where: { investeeId: foundCompanies[i].investeeCompany.id }});
          const auditor = await models.investeeAuditor.findOne({
                where: { investeeId: foundCompanies[i].investeeCompany.id }})
          const subsidiary  = await models.companies_relations.findOne({
            where: { parentId: foundCompanies[i].investeeCompany.companyId}})
          if(capitals.length > 0){
            progress = progress + 10;
          }
          if(directors.length > 0){
            progress = progress + 10;
          }
          if(ownerShip != null){
            progress = progress + 10;
          }
          if(auditor!= null){
            progress = progress + 10;
          }
          if(subsidiary!= null){
            progress = progress + 10;
          }


          foundCompanies[i].dataValues["progress"] = progress;
        }else{
          foundCompanies[i].dataValues.average_annual_sales = "0";
          foundCompanies[i].dataValues.estimated_company_value = "0";
          foundCompanies[i].dataValues.required_investment = "0";
          progress = 100;
          foundCompanies[i].dataValues["progress"] = progress;
          }

        }

      return reply.response(foundCompanies).code(200);
    }
    catch (e) {
      console.log('error', e);
      return Boom.badImplementation('An internal server error occurred');
    }
  },


  findAllUserCompanies: async function (request, reply) {
    try {
      const foundCompanies = await models.companiesBasicData.findAll({
        where: {user_id: request.params.userId, type: "investee", deleted: 0},
        include: [
          { model: models.investee, as: 'investeeCompany' },
          { model: models.companiesBasicDataTranslation, as: 'companiesBasicDataTranslation' }
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
      const payload = request.payload.payload.companyBasicData;
      transaction = await models.sequelize.transaction();
      const createdCompanyBasicData = await models.companiesBasicData.create(payload, { transaction });
      request.payload.payload.companyBasicData.companyBasicDataId = createdCompanyBasicData.id;
      await models.companiesBasicDataTranslation.create(request.payload.payload.companyBasicData, { transaction });
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
  translation: async (request, reply) => {
    const company_basic_data = request.payload.company_basic_data;
    const company_basic_data_translation = request.payload.company_basic_data_translation;
    const director_management = request.payload.director_management;

    const companyId = request.params.companyId;
    const investeeId = request.params.investeeId;

    await models.companiesBasicData.update(company_basic_data, { where: { id: companyId } });
    await models.companiesBasicDataTranslation.update(company_basic_data_translation, { where: { companyBasicDataId: companyId } });

    const director = await models.investeeBoardOfDirectors.findOne({ where: { investeeId: investeeId } });
    await models.investeeBoardOfDirectorTranslation.update(director_management, { where: { investeeBoardOfDirectorsId: director.dataValues.id } });

    return reply.response({status: 200, message_en: "Translated successfully", message_ar: "تمت الترجمة بنجاح"}).code(200);
  },
  delete: async (request, reply) => {
    try {
      const companyId = request.params.companyId;
      await models.companiesBasicData.update({deleted: 1},{ where: { id: companyId } });
      return reply.response({status: 202, message: "deleted successfully"}).code(202);
    }
    catch (e) {
      console.log('error', e);
      return Boom.badImplementation('An internal server error occurred');
    }
  },

  // delete: async (request, reply) => {
  //   try {
  //     const companyId = request.params.companyId;
  //     await models.companiesBasicData.destroy({ where: { id: companyId } });
  //     return reply.response().code(204);
  //   }
  //   catch (e) {
  //     console.log('error', e);
  //     return Boom.badImplementation('An internal server error occurred');
  //   }
  // }
};

