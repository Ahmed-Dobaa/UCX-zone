'use strict';

const Boom = require('boom');
const path = require('path');
const models = require(path.join(__dirname, '../models/index'));
const _ = require('lodash');

module.exports = {
  getUserInvestors: async function (request, reply) {
    let investorData;
    let arr = [];
    try {
      const investors = await models.usersInvestors.findAll({where: {userId: request.params.userId}});
      for(let i = 0; i < investors.length; i++){
        investorData = await models.investor.findAll({where: {id: investors[i].investorId, type: 'Institutional Investor'},
        include: [
          { model: models.companiesBasicData, as: 'company',
              include: [{ model: models.companiesBasicDataTranslation, as: 'companiesBasicDataTranslation' }] }
         ]});
        if(investorData.length != 0){
          arr.push({investor_id: investorData[0].id, name: investorData[0].company.companiesBasicDataTranslation.name});
        }
      }
      return reply.response(arr).code(200);
    } catch (error) {
     console.log(error)
    }

  }
}

