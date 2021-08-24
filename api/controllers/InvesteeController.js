'use strict';

const Boom = require('boom');
const path = require('path');
const _ = require('lodash');
const moment = require('moment');
const fs = require('fs');
const { fn, col } = require('sequelize');

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
      const { languageId } = request.pre;
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

      return reply.response(foundInvesteeCompanies || {}).code(200);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },
  create: async (request, reply) => {
    let transaction;

    try {
      transaction = await models.sequelize.transaction();
      const userId = request.auth.decoded ? request.auth.decoded.id : request.params.userId;

      const { payload } = request.payload;
      const { companyBasicData, investeeTranslation } = payload;
      companyBasicData.companiesBasicDataTranslation.languageId = request.pre.languageId;
      investeeTranslation.languageId = request.pre.languageId;

      // check first that company basic data exist or not.
      const createdCompanyBasicData = await models.companiesBasicData.create(payload.companyBasicData, { transaction });
      companyBasicData.companiesBasicDataTranslation.companyBasicDataId = createdCompanyBasicData.id;
      await models.companiesBasicDataTranslation.create(companyBasicData.companiesBasicDataTranslation, { transaction });
      const code = `${moment().format('YYMM')}${new Date().valueOf()}`;
      const createdInvestee = await models.investee.create({ companyId: createdCompanyBasicData.id, code: code, createdBy: userId }, { transaction });
      investeeTranslation.investeeId = createdInvestee.id;
      await models.investeeTranslation.create(investeeTranslation, { transaction });
      await models.usersInvestees.create({ userId: userId , investeeId: createdInvestee.id, roleId: 2 }, { transaction });

      if(!_.isEmpty(request.payload.avatar)) {
        const allowedExtensions = ['.tif', '.png', '.svg', '.jpg', '.gif'];
        const uploadImageExtension = path.extname(request.payload.avatar.hapi.filename);
        const relativePath = `uploads/investees/avatars/${createdInvestee.id}-${moment().valueOf()}-${uploadImageExtension}`;
        const fullPath = path.join(__dirname, '../', relativePath);

        if(!_.includes(allowedExtensions, uploadImageExtension.toLowerCase())) {

          return Boom.badRequest(`allowed images extension are  ${allowedExtensions.join(' , ')}`);
        }

        // await fs.promises.mkdir(path.join(__dirname, '../', 'uploads/investees/avatars/'), { recursive: true });
        // await fs.promises.access(path.join(__dirname, '../', 'uploads/investees/avatars/'), fs.constants.W_OK);

        await request.payload.avatar.pipe(fs.createWriteStream(fullPath));
        await models.investee.update({ avatar: relativePath }, { where: { id: createdInvestee.id }, transaction });
      }

      // await models.request_Role_company.create({
      //   userId: userId,
      //   companyId: createdInvestee.id,
      //   requestedRole: payload.relationToCompany
      // }, { transaction });

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
      const language = request.pre.languageId;
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
      const language = request.pre.languageId;
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
          { where: { id: foundInvesteeCompany.basicData.companiesBasicDataTranslation.id }, transaction });
      }

      if(! _.isEmpty(payload.investeeTranslation)) {

        await models.investeeTranslation.update(payload.investeeTranslation, { where: { id: foundInvesteeCompany.investeeTranslation.id }, transaction });
      }

      await models.investee.update({ phoneNumbers: payload.phoneNumbers }, { where: { id: investeeId }, transaction });

      if(!_.isEmpty(request.payload.avatar)) {
        const allowedExtensions = ['.tif', '.png', '.svg', '.jpg', '.gif'];
        const uploadImageExtension = path.extname(request.payload.avatar.hapi.filename);
        const relativePath = `uploads/investees/avatars/${investeeId}-${moment().valueOf()}-${uploadImageExtension}`;
        const fullPath = path.join(__dirname, '../', relativePath);

        if(!_.includes(allowedExtensions, uploadImageExtension.toLowerCase())) {

          return Boom.badRequest(`allowed images extension are  ${allowedExtensions.join(' , ')}`);
        }

        // await fs.promises.mkdir(path.join(__dirname, '../', 'uploads/investees/avatars/'), { recursive: true });
        // await fs.promises.access(path.join(__dirname, '../', 'uploads/investees/avatars/'), fs.constants.W_OK);

        await request.payload.avatar.pipe(fs.createWriteStream(fullPath));
        await models.investee.update({ avatar: relativePath }, { where: { id: investeeId }, transaction });
      }
      await transaction.commit();

      return reply.response().code(200);
    }
    catch (e) {
      console.log('error', e);

      if(transaction) {
        await transaction.rollback();
      }

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
  }
};
