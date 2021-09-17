'use strict';

const Boom = require('boom');
const _ = require('lodash');
const path = require('path');
const useragent = require('useragent');
const config = require('config');
useragent(true);

const models = require(path.join(__dirname, '../models/index'));
const Mailer = require(path.join(__dirname, '../services/sendEmailService'));
const jwtService = require(path.join(__dirname, '../services/jwtService'));
const errorService = require(path.join(__dirname, '../','services/errorService'));
const userService = require(path.join(__dirname, '../services/userService'));

module.exports = {
  find: async function (request, reply) {

    try {
      const language= request.pre.languageId;
      const foundInvesteeOwnerships = await models.ownerships.findAndCountAll({
        include: [
          {
            association: 'investees',
            through: { where: { investeeId: request.params.investeeId }, attributes: [] },
            attributes: [],
            required: true,
          },
          {
            association: 'ownershipTranslation',
            required: true,
            where: { languageId: language }
          }
        ]
      });

      return reply.response(foundInvesteeOwnerships).code(200);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },
  findOne: async function (request, reply) {
    try {

      const language= request.pre.languageId;
      const foundInvesteeOwnership = await models.ownerships.findOne({
        where: { id: request.params.id },
        include: [
          {
            association: 'ownershipTranslation',
            required: true,
            where: { languageId: language }
          }
        ]
      });

      return reply.response(foundInvesteeOwnership|| {}).code(200);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },
  create: async function (request, reply) {
    let transaction;

    try {
      transaction = await models.sequelize.transaction();
      const foundInvesteeCompanies = await models.investee.findOne({
        where: { id: request.params.investeeId },
        include: [
          {
            association: 'basicData',
            include: [{ association: 'companiesBasicDataTranslation' }]
          }
        ], // used in invitation mail sent to ownership
      });

      if(_.isEmpty(foundInvesteeCompanies)) {

        return Boom.notFound('The Investee Company Is Not Found');
      }


      request.payload.investeeId = request.params.investeeId;
      request.payload.createdBy = 15; // request.auth.decoded.id;
      const createdOwnership = await models.ownerships.create(request.payload, { transaction });
      const createdInvesteeOwnerships = await models.investeeOwnerships.create({
        ownershipId: createdOwnership.id,
        investeeId: foundInvesteeCompanies.id,
        createdBy: 15 //request.auth.decoded.id,
      }, { transaction });


      request.payload.ownershipTranslation.languageId = request.pre.languageId;
      request.payload.ownershipTranslation.investeeOwnershipId= createdOwnership.id;
      await models.investeeOwnershipTranslation.create(request.payload.ownershipTranslation, { transaction });
      let accessToken = null;
      let ownershipUser = null;

      const user = await models.users.findOne({ where: { email: request.payload.email } });

      if(request.payload.email && _.isEmpty(user)) {

        accessToken = jwtService.generateUserAccessToken({
          scope: 'invitation',
          email: request.payload.email
        }, config.jwt.authKey);
        ownershipUser = {
          name: request.payload.ownershipTranslation.shareholderName,
          phoneNumber: request.payload.ownershipTranslation.phoneNumber,
          email: request.payload.email,
          dob: request.payload.ownershipTranslation.dob,
          gender: request.payload.gender,
          activationToken: accessToken,
          secret: userService.generateActivationToken(),
          active: 0
        };
        const createdUser = await models.users.create(ownershipUser, { transaction });
        await models.usersInvestees.create({ userId: createdUser.id, investeeId: request.params.investeeId, roleId: 4 }, { transaction });
        createdInvesteeOwnerships.accountId = createdUser.id;
        await createdInvesteeOwnerships.save({ transaction });
      }

      await transaction.commit();

      if(request.payload.email && _.isEmpty(user)) {
        Mailer.sendInvitationMailToUser(request.payload.email, ownershipUser.name,
          foundInvesteeCompanies.basicData.companiesBasicDataTranslation.name, accessToken);
      }

      return reply.response({ ...request.payload, id: createdOwnership.id }).code(201);
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
        where: { id: request.params.investeeId },
        include: [
          {
            association: 'ownerships',
            where: { id: request.params.id },
            include: [
              {
                association: 'ownershipTranslation',
                where: { languageId: language },
                required: false
              }
            ]
          }
        ]
      });

      if(_.isEmpty(foundInvestee)) {

        return Boom.badRequest('The Investee Company Is Not Found, You have to create It First');
      }

      if(_.isEmpty(foundInvestee.ownerships)) {

        return Boom.badRequest('The Investee ownership Is Not Found, You have to create It First');
      }

      if(!_.isEmpty(foundInvestee.ownerships[0].ownershipTranslation)) {

        return Boom.badRequest('The Investee ownership Has Been Translated To That Language');
      }

      transaction = await models.sequelize.transaction();

      request.payload.ownershipTranslation.investeeOwnershipId = request.params.id;
      request.payload.ownershipTranslation.languageId = language;
      const investeeOwnershipTranslation = await models.investeeOwnershipTranslation.create(request.payload.ownershipTranslation, { transaction });
      await transaction.commit();

      return reply.response(investeeOwnershipTranslation).code(201);
    }
    catch (e) {
      console.log('error', e);

      if(transaction) {
        await transaction.rollback();
      }

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },
  update: async function (request, reply) {
    let transaction;
    try {

      const language = request.pre.languageId;
      const { payload } = request;
      const ownershipId = request.params.id;
      const foundInvesteeOwnership = await models.ownerships.findOne({ where: { id: ownershipId }, raw: true });
      console.log(foundInvesteeOwnership);
      if(_.isEmpty(foundInvesteeOwnership)) {

        return Boom.notFound('Ownership You Try To Update Does Not Exist');
      }

      transaction = await models.sequelize.transaction();

      await models.ownerships.update(payload, { where: { id: ownershipId }, raw: true });

      if(payload.ownershipTranslation) {

        await models.investeeOwnershipTranslation.update(payload.ownershipTranslation, {
          where: {
            investeeOwnershipId: ownershipId,
            languageId: language
          },
          raw: true
        });
      }
      await transaction.commit();

      return reply.response({ status: 200, message: "Updated successfully"}).code(200);
    }
    catch (e) {
      console.log('error', e);

      if(transaction) {
        await transaction.rollback();
      }

      return Boom.badImplementation('An internal server error occurred');
    }
  },
  delete: async function (request, reply) {
    try {

      await models.ownerships.destroy({ where: { id: request.params.id } });

      return reply.response().code(204);
    }
    catch (e) {
      console.log('error', e);

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  }
};
