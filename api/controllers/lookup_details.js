'use strict';

const Boom = require('boom');
const path = require('path');
const models = require(path.join(__dirname, '../models/index'));
const _ = require('lodash');

module.exports = {
  getLookupDetailBasedMaster: async function (request, reply) {
    try {
      const lookup_details = await models.lookup_details.findAll({where: {lookup_master_id: request.params.masterId}});
      return reply.response(lookup_details).code(200);
    } catch (error) {
     console.log(error)
    }

  }
}

