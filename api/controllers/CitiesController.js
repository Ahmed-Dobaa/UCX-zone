'use strict';

const Boom = require('boom');
const path = require('path');
const models = require(path.join(__dirname, '../models/index'));
const _ = require('lodash');

module.exports = {
  getCitiesBasedCountry: async function (request, reply) {
    try {
      const cities = await models.cities.findAll({where: {country_translation_id: Number(request.params.countryId)}});
      return reply.response(cities).code(200);
    } catch (error) {
     console.log(error)
    }

  }
}

