'use strict';

const Boom = require('boom');
const path = require('path');
const models = require(path.join(__dirname, '../models/index'));
const _ = require('lodash');

module.exports = {
  getAllLookup: async function (request, reply) {
    try {
      const lookup_master = await models.lookup_master.findAll();
      return reply.response({lookup_master: lookup_master}).code(200);
    } catch (error) {
     console.log(error)
    }

  }
}
