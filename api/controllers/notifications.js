'use strict';

const Boom = require('boom');
const path = require('path');
const models = require(path.join(__dirname, '../models/index'));
const _ = require('lodash');
const { QueryTypes } = require('sequelize');
const sequelize = require('sequelize');
const { result } = require('lodash');
const errorService = require(path.join(__dirname, '../','services/errorService'));

module.exports = {
  getAllNotifications: async function (request, reply) {
    let results = [];
    try {
      const notifications = await models.notifications.findAll({where: {to_user_id: request.params.userId}});
      for(let i = 0; i < notifications.length; i++){
        let interest = await models.investor_interests_submits.findOne({ where: { id: notifications[i].reference_id } });
  console.log(interest);
        if(notifications[i].type === 'Investor interest submit'){
          let company = await models.sequelize.query(`SELECT name FROM companiesBasicDataTranslation
                                  where companyBasicDataId = (select companyId from investor
                                            where id = ${notifications[i].from_user_id})`, { type: QueryTypes.SELECT });
         let investor_type = await models.sequelize.query(`select companyId, type from investor
                                                      where id = ${notifications[i].from_user_id}`, { type: QueryTypes.SELECT });
          // notifications[i].dataValues["name"] = company[0].name;
          let name;
          if(investor_type !== null){
            if(investor_type[0].type === 'Individual Investor'){
              name = 'Individual Investor'
            }else{
              name = company[0].name;
            }
            results.push({
              title_en: "Submit Interest",
              title_ar: "طلب اهتمام",
              notification_en: `${name} company has been interest with your company`,
              notification_ar: `لقد أبدت شركة ${name} اهتمام بشركتك`,
              status: notifications[i].status,
              type: "SubmitInterest",
              id: notifications[i].reference_id,
              notification_id: notifications[i].id,
              created_at: notifications[i].createdAt,
              investee_id: interest.investeeId
            })

          }


        }else if(notifications[i].type === 'Approve interest'){
          let company = await models.sequelize.query(`SELECT name FROM companiesBasicDataTranslation
          where companyBasicDataId = (select companyId from investee
                    where id = ${notifications[i].from_user_id})`, { type: QueryTypes.SELECT });
                    results.push({
                      title_en: "Approve Request",
                      title_ar: "الموافقه على اهتمام",
                      notification_en: `${company[0].name} company has been approve your interest`,
                      notification_ar: `لقد وافقت شركة ${company[0].name} على اهتمامك بها`,
                      status: notifications[i].status,
                      type: "Action",
                      id: notifications[i].reference_id,
                      notification_id: notifications[i].id,
                      created_at: notifications[i].createdAt,
                      investee_id: interest.investeeId
                    })
         }else if(notifications[i].type === 'Reject interest'){
          let company = await models.sequelize.query(`SELECT name FROM companiesBasicDataTranslation
          where companyBasicDataId = (select companyId from investee
                    where id = ${notifications[i].from_user_id})`, { type: QueryTypes.SELECT });
                    results.push({
                      title_en: "Reject Request",
                      title_ar: "رفض اهتمام",
                      notification_en: `${company[0].name} company has been reject your interest`,
                      notification_ar: `لقد رفضت شركة ${company[0].name} اهتمامك بها`,
                      status: notifications[i].status,
                      type: "Action",
                      id: notifications[i].reference_id,
                      notification_id: notifications[i].id,
                      created_at: notifications[i].createdAt,
                      investee_id: interest.investeeId
                    })
         }
      }

      return reply.response(results).code(200);
    } catch (error) {
     console.log(error)
    }

  },

  update: async (request, reply) => {
    let transaction;
    try {
      transaction = await models.sequelize.transaction();
        await models.notifications.update({status: request.payload.status}, { where: { id: request.params.userId }, transaction });

      await transaction.commit();

      return reply.response({status: 200, message: "This notification was opened"}).code(200);
    }
    catch (e) {
      console.log('error', e);

      if(transaction) {
        await transaction.rollback();
      }

      return errorService.wrapError(e, 'An internal server error occurred');
    }
  },
};
