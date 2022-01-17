'use strict';

const Boom = require('boom');
const path = require('path');
const models = require(path.join(__dirname, '../models/index'));
const _ = require('lodash');

module.exports = {
  subsectorsBasedSector: async function (request, reply) {
    try {
      let result = [];
      let sectors = request.payload;
      for(let i = 0; i < sectors.length; i++){
        let subsectors = await models.subsectors.findAll({where: {sectorTranslation_id: sectors[i]}});
        for(let j = 0; j < subsectors.length; j++){
          result.push(subsectors[j])
        }
      }
      return reply.response(result).code(200);
    } catch (error) {
     console.log(error)
    }

  }
}

