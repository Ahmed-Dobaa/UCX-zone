'use strict';

const Sequelize = require('sequelize');
const Boom = require('boom');
const _ = require('lodash');

module.exports ={
  wrapError: (error, defaultMessage) => {

    if(error instanceof Sequelize.DatabaseError && error.original.code === 'ER_BAD_FIELD_ERROR' && process.env.NODE_ENV !== 'production') {
      return Boom.badRequest(error.original.sqlMessage.replace(' in \'where clause\'', ''));
    }

    if(error instanceof Sequelize.AssociationError || error.name === 'SequelizeAssociationError'){
      return Boom.badRequest(error.message);
    }

    if( error instanceof Sequelize.UniqueConstraintError) {

      const validation = { source: 'payload', errors: {} };
        const messages = error.errors.map((err) => {
          const path = Array.isArray(err.path) ? err.path[0] : err.path;
          const message = err.message.replace(/"/g, '');
          validation.errors[_.replace(path, '_UNIQUE' ,'')] = `${err.value} Is Already Used`;
          return `${err.value} Is Already Used`;
      });

      const errorObject = Boom.badRequest(messages.join('\n'));
      errorObject.output.payload = { ...errorObject.output.payload, validation };
      throw errorObject;
    }

    if(_.get(error, 'output.statusCode')){
        return error;
    }

    return Boom.badImplementation(defaultMessage);
  }
};
