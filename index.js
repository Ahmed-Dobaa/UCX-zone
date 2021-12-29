'use strict';

const Hapi = require('hapi');
const Relish = require('relish')({ stripQuotes: true });
const config = require('config');
const routes = require('./api/routes');
const sequelize = require('sequelize');
const Boom = require('boom');
const _ = require('lodash');

const loadPlugins = require('./lib/loadPlugins.js');

const server = Hapi.server({
  routes: {
    cors: true,
    timeout: {
      socket: false,
      server: false
    },
    validate: {
      failAction: Relish.failAction,
      options: {
        allowUnknown: config.joi.allowUnknown,
        abortEarly: config.joi.abortEarly,
      }
    }
  },
  host: 'platform.ucx.zone', // config.connection.host,
  port: 2053, //process.env.PORT || config.connection.port,
  tls: config.connection.tls,
});
const getErrorParts = function (error) {
  const path = Array.isArray(error.path) ? error.path[0] : error.path;
  const message = error.message.replace(/"/g, '');

  return {
    path,
    message
  };
};

const transformError = function (error, source) {

  if(error.isServer && error instanceof sequelize.UniqueConstraintError) {

    const validation = {
      source,
      errors: {}
    };

    const messages = error.errors.map((err) => {
      const { path, message } = getErrorParts(err);
      validation.errors[_.replace(path, '_UNIQUE' ,'')] = `${err.value} Is Already Used`;
      return `${err.value} Is Already Used`;
    });
    const errorObject = Boom.badRequest(messages.join('\n'));
    errorObject.output.payload = { ...errorObject.output.payload, validation };
    return errorObject;
  }

  return error;

};

const preResponse = function (request, h) {

  if(request.response.isBoom) {
    return transformError(request.response, 'payload');
  }

  return h.continue;
};
server.ext('onPreResponse', preResponse);

try {
  (async () => {
    await loadPlugins(server);
    await server.route(routes);
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
  })();
}
catch (err) {
  server.log(['startup', 'error'], `Server start error ${err}`);
  process.exit(1);
}

process.on('unhandledRejection', (err) => {
  console.log('unhandledRejection---------------------', err);
  process.exit(1);
});

