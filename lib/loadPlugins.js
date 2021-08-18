const path = require('path');
const Inert = require('inert');
const Vision = require('vision');
const MrHorse = require('mrhorse');
const JWT = require('hapi-auth-jwt2');
const models = require('../api/models/index');
const userService = require('../api/services/userService');
const jsonwebtoken = require('jsonwebtoken');
const geoLocate = require('hapi-geo-locate');
const _ = require('lodash');

const plugins = [Inert, Vision];
// const logSqueezeArgs = [{
//     log: '*',
//     response: '*',
//     request: '*',
//     'request-internal': '*'
// }];

// plugins.push({
//     plugin: Good,
//     options: {
//         ops: {
//             interval: 1000
//         },
//         reporters: {
//             myConsoleReporter: [
//                 {
//                     module: 'good-squeeze',
//                     name: 'Squeeze',
//                     args: logSqueezeArgs
//                 },
//                 {
//                     module: 'good-console',
//                     args: [{
//                         format: 'HH:mm:ss DD.MM.YYYY'
//                     }]
//                 },
//                 'stdout'
//             ],
//             myFileReporter: [
//                 {
//                     module: 'good-squeeze',
//                     name: 'Squeeze',
//                     args: logSqueezeArgs
//                 },
//                 {
//                     module: 'good-squeeze',
//                     name: 'SafeJson'
//                 },
//                 {
//                     module: 'rotating-file-stream',
//                     args: [
//                         'log',
//                         {
//                             interval: '1d',
//                             compress: 'gzip',
//                             path: './logs'
//                         }
//                     ]
//                 }
//             ],
//             myHTTPReporter: [
//                 {
//                     module: 'good-squeeze',
//                     name: 'Squeeze',
//                     args: [{ error: '*' }]
//                 }
//                 // ,
//                 // {
//                 //     module: 'good-http',
//                 //     args: ['http://prod.logs:3000',
//                 //         {
//                 //             wreck: {
//                 //                 headers: { 'x-api-key': 12345 }
//                 //             }
//                 //         }
//                 //     ]
//                 // }
//             ]
//         }
//     }
// });

plugins.push({
  plugin: MrHorse,
  options: {
    policyDirectory: path.join(__dirname, 'policies'),
    defaultApplyPoint: 'onPreHandler'
  }
});

plugins.push({
  plugin: geoLocate,
  options: { enabledByDefault: false }
});

module.exports = async (server) => {
  await server.register(JWT);
  server.auth.strategy('jwt', 'jwt', {
    verify: async function (decoded, request) {
      try {
        const foundUser = await userService.findOne({ 'id': decoded.id });
        const token = request.headers.authorization;
        const tokenVerified = await jsonwebtoken.verify(token, foundUser.secret);

        if(!parseInt(tokenVerified.active)) {

          return { isValid: false, key: foundUser.secret };
        }

        if(tokenVerified.id) {

          request.auth.decoded = tokenVerified;
          return { isValid: true, credentials: foundUser.secret };
        }

        return { isValid: false, key: foundUser.secret };
      }
      catch (e) {

        return { isValid: false };
      }

    },
    verifyOptions: { algorithms: ['HS256'], issuer: true, ignoreExpiration: false },
    errorFunc: function (context) {
      context.message = 'Invalid Access Token';
      return context;
    }
  });

  server.auth.strategy('forgetPasswordJwt', 'jwt', {
    verify: async function (decoded, request) {
      try {

        const token = request.headers.authorization;
        const foundUserForgetToken = await models.userForgetPassword.findOne({ where: { userId: decoded.id, forgetToken: token } });

        if(_.isEmpty(foundUserForgetToken) || parseInt(foundUserForgetToken.revoked)) {

          return { isValid: false };
        }

        const foundUser = await models.users.findOne({ where: { id: decoded.id } });
        const tokenVerified = await jsonwebtoken.verify(token, foundUser.secret);
        if(tokenVerified.id) {

          request.auth.decoded = tokenVerified;
          return { isValid: true, credentials: foundUser.secret };
        }

        return { isValid: false };
      }
      catch (e) {
        console.log('error', e);
        return { isValid: false };
      }

    },
    verifyOptions: { algorithms: ['HS256'], issuer: true, ignoreExpiration: false },
    errorFunc: function (context) {
      context.message = 'Invalid Access Token';
      return context;
    }
  });
  server.auth.default('jwt');
  return server.register(plugins);
};
