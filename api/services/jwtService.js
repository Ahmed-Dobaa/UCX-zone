'use strict';
const config = require('config');
const JWT = require('jsonwebtoken');

module.exports = {
  generateUserAccessToken: function (userData = {}, secretKey ,stayloggedIn = false, userAgent) {
    const options = {
      expiresIn: stayloggedIn ? config.jwt.stayLoggedInTokenTtl : config.jwt.TokenTtl,
      // issuer: JSON.stringify(userAgent)
    };

    return JWT.sign(userData, secretKey, options);
  },
  verifyResetPasswordToken: function (token) {
    return JWT.verify(token, config.jwt.authKey);
  }
};
