'use strict';

const generator = require('generate-password');
const path = require('path');
const randomize = require('randomatic');

const models = require(path.join(__dirname, '../models/index'));
module.exports = {
  generateActivationToken: () => {
    const options = {
      length: 6,
      numbers: true,
      symbols: false,
      excludeSimilarCharacters: true,
      exclude: '",./\\',
      strict: true
    };

    return generator.generate(options);
  },
  generateTwoFactorAuthenticationCode: function () {
    return randomize('0', '6', undefined);
  },
  saveUser: async function (userObject, options) {
    return await models.users.create(userObject, options);
  } ,
  findUser: (emailString) => models.users.findOne({ where: { email: emailString } }),
  findOne: async function (criteria, options = {}) {
    return models.users.findOne({
      where: criteria,
      attributes: ['id', 'name', 'email', 'password', 'generalRole', 'active', 'secret', 'twoFactorAuthentication', 'twoFactorAuthenticationCode']
    }, options);
  },
  saveAccessToken: function (userId, accessToken, refereshToken, deviceName) {
    return models.user_device_token.create({
      userId: userId,
      access_token: accessToken,
      refresh_token: refereshToken,
      device_name: deviceName
    });
  },
  logout: function (accessToken) {
    return models.user_device_token.delete({ where: { accessToken: accessToken } });
  },
  activateUser: async (activationCode) => models.users.findOne({ where: { activationToken: activationCode } })
};
