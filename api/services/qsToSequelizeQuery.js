'use strict';

const queryModule = require('qs');
const _ = require('lodash');
const Boom = require('boom');
const { fn, col, cast } = require('sequelize');

// const buildAssociations = function (qs, associations, relation, language = 1) {
//   // if(relation.split('.').length > 1) {
//   //   throw Boom.badRequest(`Don't support multi nested relation (${ relation }) in includes query`);
//   // }
//
//   // if(!_.includes(Object.keys(associations), relation)) {
//   //   throw Boom.badRequest(`unknown relation ${ relation } in includes query`);
//   // }
//   const association = { association: relation, include: [] };
//
//   if(relation.split('.') > 1) {
//     association.include.push(buildAssociations(relation.split('.')));
//   }
//
//
//   // if(qs.fields) {
//   //   const fields = qs.fields.split(',');
//   //   let foundField= null;
//   //   _.forEach(fields, function (attr, index) {
//   //     if(attr.split('.').length > 1) {
//   //       throw Boom.badRequest(`Don't support fields filtration of multi nested relation (${ relation }) in fields query`);
//   //     }
//   //
//   //     if(relation === attr.split('.')[0]) {
//   //       if(!association.attributes) {
//   //         association.attributes = [];
//   //       }
//   //       association.attributes.push(attr.split('.')[1]);
//   //       foundField = index;
//   //     }
//   //   });
//   //
//   //   delete fields[foundField];
//   // }
//   //
//   // if(qs.filters) {
//   //   _.forOwn(qs.filters, function (condition, key) {
//   //
//   //     if(key.split('.').length > 1) {
//   //       throw Boom.badRequest(`Don't support conditions on multi nested relation (${ relation }) in filters query`);
//   //     }
//   //
//   //     if(relation === key.split('.')[0]) {
//   //       if(!association.where) {
//   //         association.where = {};
//   //       }
//   //       association.where[key.split('.')[1]]= condition;
//   //       delete qs.filters[key];
//   //     }
//   //   });
//   // }
//
//   return association;
// };

module.exports = (qs, attributes) => {
  const opts = { maxPerPage: 25, maxLimit: 25 };
  const query = { include: [], attributes: [], offset: 0 , limit: 25 };

  if(qs.per_page) {
    query.limit = qs.per_page.match(/^\d+$/)? parseInt(qs.per_page): opts.maxPerPage;
  }

  if(query.limit > opts.maxPerPage) {
    query.limit = opts.maxPerPage;
  }

  if(qs.page) {
    query.offset = qs.page.match(/^\d+$/)? ((parseInt(qs.page) -1)* query.limit): ((parseInt(opts.maxLimit) -1) * query.limit);
  }


  if(qs.sort) {
    _.forEach(qs.sort.split(','), function (order) {

      if(order.split('.').length > 1) {
        throw Boom.badRequest(`Don't support sorting in nested relation (${ order }) in includes query`);
      }

      if(!_.includes(Object.keys(attributes), order.replace('-', ''))) {
        throw Boom.badRequest(`unknown column ${ order.replace('-', '') } in sort query`);
      }

      if(order.charAt(0) === '-') {
        query.order = [[order.slice(1), 'DESC']];

        return true;
      }

      query.order = [[order, 'ASC']];
    });
  }

  query.filters = queryModule.parse(qs.filters);
  // query.where = queryModule.parse(qs.filters);

  if(qs.includes) {
    _.forEach(qs.includes.split(','), function (relation) {
      if(_.isEmpty(relation)) {
        return true;
      }
      query.include.push(relation);
    });
  }

  if(qs.fields) {
    _.forEach(qs.fields.split(','), function (attr) {

      if(attr.split('.').length === 1 && ! _.includes(Object.keys(attributes), attr)) {
        throw Boom.badRequest(`unknown column ${ attr } in fields query`);
      }

      if(attr.split('.').length === 1) {
        query.attributes.push(attr);
      }
    });
  }

  if(_.isEmpty(query.attributes)) {
    delete query.attributes;
  }

  return query;
};
