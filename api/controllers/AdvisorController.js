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

      await models.usersAdvisors.create({ userId: userId, advisorId: advisor.id, roleId: 8 }, { transaction });
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

  uploadAdvisorImg: async function (request, reply) {
    const allowedExtensions = ['.tif', '.png', '.svg', '.jpg', '.gif'];
    const uploadImageExtension = path.extname(request.payload.img.hapi.filename);
    const relativePath = `uploads/advisors/${request.params.id}-${moment().valueOf()}-${uploadImageExtension}`;
    const fullPath = path.join(__dirname, '../', relativePath);
    let oldPath = null;
    try {

      if(!_.includes(allowedExtensions, uploadImageExtension.toLowerCase())) {

        return Boom.badRequest(`allowed images extension are  ${allowedExtensions.join(' , ')}`);
      }

      const foundAdvisor = await models.Advisor.findOne({ where: { id: request.params.id }, raw: true });
      oldPath = foundAdvisor.img;
      await request.payload.img.pipe(fs.createWriteStream(fullPath));
      await models.Advisor.update({ img: relativePath }, { where: { id: request.params.id } });

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
      const language = 1; //request.pre.languageId;
      const foundCompanies = await models.Advisor.findAll({
        include: [
          { model: models.companiesBasicData, as: 'company',
              include: [{ model: models.companiesBasicDataTranslation, as: 'companiesBasicDataTranslation' }] }
         ]
      });
      let avatarFullPath = null; // path.join(__dirname, '../../uploads/default.png');
      // const foundInvestor = await models.investor.findOne({ where: { id: request.params.id }, raw: true });
      for(let i = 0; i < foundCompanies.length; i++){
        foundCompanies[i].img = path.join(__dirname, '../../', foundCompanies[i].img);
        var array = foundCompanies[i].turnoverRangeId.split(",");
        foundCompanies[i].turnoverRangeId = array;
        let countries = await models.advisorTargetedCountries.findAll({where: {advisorId: foundCompanies[i].id}})
        let sectors = await models.advisorTargetedSectors.findAll({where: {advisorId: foundCompanies[i].id}})
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
      return reply.response(foundCompanies).code(200);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  }

};
