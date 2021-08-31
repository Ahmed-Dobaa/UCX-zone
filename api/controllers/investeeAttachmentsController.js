'user strict';

const _ = require('lodash');
const Boom = require('boom');
const path = require('path');
const moment = require('moment');
const fs = require('fs');
const fsPromises = require('fs').promises;

const models = require(path.join(__dirname, '../','models/index'));

module.exports = {
  findAll: async function (request, reply) {
    try {

      const foundInvesteeAttachments = await models.investeeAttachments.findAll({ raw: true });
      return reply.response(foundInvesteeAttachments).code(200);
    }
    catch (e) {
      console.log('error', e);
      return Boom.badImplementation('An internal server error occurred');
    }
  },
  findOne: async function (request, reply) {
    try {

      const foundInvesteeAttachment = await models.investeeAttachments.findOne({ where: { id: request.params.id }, raw: true });
      return reply.response(foundInvesteeAttachment || {}).code(200);
    }
    catch (e) {
      console.log('error', e);
      return Boom.badImplementation('An internal server error occurred');
    }
  },
  create: async function (request, reply) {

    const uploadImageExtension = path.extname(request.payload.file.hapi.filename);
    const relativePath = `uploads/investee/${request.params.companyId}/`;
    const fileName = `${request.payload.attachmentTypeId}-${moment().valueOf()}-${uploadImageExtension}`;
    const fullPath = path.join(__dirname, '../', relativePath);
      console.log("here")
    try {

      const allowedExtensions = ['.tif', '.png', '.svg', '.jpg', '.gif',
        '.7z', '.arj', '.rar', '.tar.gz', '.z', '.zip',
        '.ods', '.xlr', '.xls', '.xlsx',
        '.doc', '.odt', '.pdf', '.wpd'
      ];

      if(!_.includes(allowedExtensions, uploadImageExtension.toLowerCase())) {

        return Boom.badRequest(`allowed file extension are  ${allowedExtensions.join(' , ')}`);
      }

      const foundInvesteeAttachmentType = await models.investeeAttachmentsTypes.findOne({ where: { id: request.payload.attachmentTypeId } });

      if(_.isEmpty(foundInvesteeAttachmentType)) {

        return Boom.badRequest('This Attachment Type Not Supported In Investee Company');
      }

      await fsPromises.mkdir(fullPath, { recursive: true });
      await fsPromises.access(fullPath, fs.constants.W_OK);
      await request.payload.file.pipe(fs.createWriteStream(`${fullPath}${fileName}`));
      request.payload.createdBy = request.params.userId; //request.auth.decoded.id;
      request.payload.companyId = request.params.companyId;
      request.payload.attachmentPath = `${relativePath}${fileName}`;
      const createdInvesteeAttachmentsType = await models.investeeAttachments.create(request.payload);
      return reply.response(createdInvesteeAttachmentsType).code(201);
    }
    catch (e) {
      console.log('error', e);
      fs.unlinkSync(path.join(__dirname, '../', fullPath, fileName));
      return Boom.badImplementation('An internal server error occurred');
    }
  },
  update: async function (request, reply) {

    const uploadImageExtension = path.extname(request.payload.file.hapi.filename);
    const relativePath = `uploads/investee/${request.params.companyId}/`;
    const fileName = `${request.payload.attachmentTypeId}-${moment().valueOf()}-${uploadImageExtension}`;
    const fullPath = path.join(__dirname, '../', relativePath);
    try {

      const allowedExtensions = ['.tif', '.png', '.svg', '.jpg', '.gif',
        '.7z', '.arj', '.rar', '.tar.gz', '.z', '.zip',
        '.ods', '.xlr', '.xls', '.xlsx',
        '.doc', '.odt', '.pdf', '.wpd'
      ];

      if(!_.includes(allowedExtensions, uploadImageExtension.toLowerCase())) {

        return Boom.badRequest(`allowed file extension are  ${allowedExtensions.join(' , ')}`);
      }

      const foundInvesteeAttachmentsType = await models.investeeAttachments.findOne({ where: { id: request.params.id }, raw: true });

      if(_.isEmpty(foundInvesteeAttachmentsType)) {

        return Boom.notFound('Attachment Type You Try To Update does Not Exist');
      }

      await fsPromises.access(fullPath, fs.constants.W_OK);
      await request.payload.file.pipe(fs.createWriteStream(`${fullPath}${fileName}`));
      await models.investeeAttachments.update({ attachmentPath: `${relativePath}${fileName}` }, { where: { id: request.params.id } });
      await fsPromises.unlink(path.join(__dirname, '../', foundInvesteeAttachmentsType.attachmentPath));

      return reply.response().code(200);
    }
    catch (e) {
      console.log('error', e);
      await fsPromises.unlink(path.join(__dirname, '../', fullPath));
      return Boom.badImplementation('An internal server error occurred');
    }
  },
  delete: async function (request, reply) {
    try {
      const foundInvesteeAttachmentsType = await models.investeeAttachments.findOne({ where: { id: request.params.id }, raw: true });

      if(!_.isEmpty(foundInvesteeAttachmentsType)) {

        await models.investeeAttachments.destroy({ where: { id: request.params.id } });
        await fsPromises.unlink(path.join(__dirname, '../', foundInvesteeAttachmentsType.attachmentPath));
      }

      return reply.response().code(204);
    }
    catch (e) {
      console.log('error', e);
      return Boom.badImplementation('An internal server error occurred');
    }
  },
  download: async function (request, reply) {
    try {

      const foundInvesteeAttachmentsType = await models.investeeAttachments.findOne({ where: { id: request.params.id }, raw: true });
      if(!_.isEmpty(foundInvesteeAttachmentsType.attachmentPath)) {

        const attachmentFullPath = path.join(__dirname, '../', foundInvesteeAttachmentsType.attachmentPath);
        return reply.file(attachmentFullPath);
      }

      return reply.response().code(404);
    }
    catch (e) {
      console.log('error', e);
      return Boom.badImplementation('An internal server error occurred');
    }
  }
};
