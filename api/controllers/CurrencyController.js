'use strict';

const Boom = require('boom');
const _ = require('lodash');
const path = require('path');
const models = require(path.join(__dirname, '../models/index'));
const useragent = require('useragent');
useragent(true);

module.exports = {
  find: async function (request, reply) {
    try {
      const foundCurrencies = await models.currencies.findAll({});
      return reply.response(foundCurrencies).code(200);
    }
    catch (e) {
      console.log('error', e);

      return Boom.badImplementation('An internal server error occurred');
    }
  }
};
