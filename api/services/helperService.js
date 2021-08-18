'use strict';

const _ = require('lodash');
const path = require('path');
const Boom = require('boom');

const models = require(path.join(__dirname, '../', 'models/index'));

module.exports = {
  getLanguageId: async function (req, res) {
    const language = _.get(req, 'headers.accept-language', 'en');
    const languageInstance = await models.language.findOne({ where: { code: language } });

    if(_.isEmpty(languageInstance)) {
      return res
        .response('Don\'t Support This Language')
        .takeover()
        .code(406);
    }

    return languageInstance.id;
  },
  authorizeUser: async function (req, res) {
    const { allowedPermission } = req.route.settings.app;
    const { role: userRole } = req.auth.decoded;
    const role = await models.roles.findOne({ where: { id: userRole }, include: [{ association: 'permissions' }] });

    if(_.isEmpty(role)) {
      return Boom.forbidden('You Do Not Have Permission To Do This Action');
    }

    const permission = _.find(role.permissions, function (permission) {
      return (permission.action === allowedPermission.action) && (permission.resource === allowedPermission.resource);
    });

    if(_.isEmpty(permission)) {
      return Boom.forbidden('You Do Not Have Permission To Do This Action');
    }

    return true;
  }
};
