'use strict';

const Boom = require('boom');
const path = require('path');
const models = require(path.join(__dirname, '../models/index'));
const _ = require('lodash');
const request = require('request');
const axios = require('axios')

module.exports = {
  getCitiesBasedCountry: async function (request, reply) {
    try {
      const cities = await models.cities.findAll({where: {country_translation_id: Number(request.params.countryId)}});
      return reply.response(cities).code(200);
    } catch (error) {
     console.log(error)
    }
  },

  createCitiesBasedCountry: async function (req, reply) {
    let transaction;
    let countries = await models.countriesTranslation.findAll();

    for(let i = 0; i < countries.length; i++){
      // console.log(countries[i].name)
      axios
  .post('https://countriesnow.space/api/v0.1/countries/cities', {
    country: countries[i].name
  })
  .then( async res => {
    for(let j = 0; j < res.data.data.length; j++){
      await models.cities.create({country_translation_id: countries[i].id, name_en: res.data.data[j]});
    }
  })
  .catch(error => {
    // console.error(error)
  })
      // request({
      //   url: 'https://countriesnow.space/api/v0.1/countries/cities',
      //   method: 'POST',
      //   json: {country: countries[i].name}
      // }, (err, response) => {
      //   console.log(response)
      // })
    }

    transaction = await models.sequelize.transaction();
    await transaction.commit();
    return reply.response({message: "created"}).code(201);
  },

}

