'use strict';

const Boom = require('boom');
const _ = require('lodash');
const path = require('path');
const useragent = require('useragent');
useragent(true);

const models = require(path.join(__dirname, '../models/index'));

module.exports = {
  find: async function (request, reply) {
    try {
      const foundBoardOfDirectorsPositions = await models.board_of_directors_positions.findAll({ raw: true });
      return reply.response(foundBoardOfDirectorsPositions).code(200);
    }
    catch (e) {
      console.log('error', e);
      return Boom.badImplementation('An internal server error occurred');
    }
  },
  findOne: async function (request, reply) {
    try {
      const positionId = request.params.id;
      const foundBoardOfDirectorsPosition = await models.board_of_directors_positions.findOne({ where: { id: positionId }, raw: true });
      return reply.response(foundBoardOfDirectorsPosition|| {}).code(200);
    }
    catch (e) {
      console.log('error', e);
      return Boom.badImplementation('An internal server error occurred');
    }
  },
  create: async function (request, reply) {
    try {
      const payload = request.payload;
      const createdBoardOfDirectorsPosition = await models.board_of_directors_positions.create(payload);
      return reply.response(createdBoardOfDirectorsPosition).code(201);
    }
    catch (e) {
      console.log('error', e);
      return Boom.badImplementation('An internal server error occurred');
    }
  },
  update: async function (request, reply) {
    try {
      const payload = request.payload;
      const positionId = request.params.id;
      const foundBoardOfDirectorsPosition = await models.board_of_directors_positions.findOne({ where: { id: positionId }, raw: true });
      if(!_.isEmpty(foundBoardOfDirectorsPosition)) {

        const updatedBoardOfDirectorsPosition = await models.board_of_directors_positions.update(payload, { where: { id: positionId }, raw: true });
        return reply.response(updatedBoardOfDirectorsPosition).code(200);
      }

      return Boom.notFound('Position You Try To Update Not Exist');
    }
    catch (e) {
      console.log('error', e);
      return Boom.badImplementation('An internal server error occurred');
    }
  },
  delete: async function (request, reply) {
    try {

      await models.board_of_directors_positions.destroy({ where: { id: request.params.id } });
      return reply.response().code(204);
    }
    catch (e) {
      console.log('error', e);
      return Boom.badImplementation('An internal server error occurred');
    }
  }
};
