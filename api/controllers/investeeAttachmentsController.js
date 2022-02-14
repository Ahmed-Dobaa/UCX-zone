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
      for(let i = 0; i < foundInvesteeAttachments.length; i++){
        let foundInvesteeAttachmentsType = await models.investeeAttachmentsTypes.findOne({ where: { id: foundInvesteeAttachments[i].attachmentTypeId }, raw: true });
        foundInvesteeAttachments[i]["type_name"] = foundInvesteeAttachmentsType.name;
      }
      return reply.response(foundInvesteeAttachments).code(200);
    }
    catch (e) {
      console.log('error', e);
      return Boom.badImplementation('An internal server error occurred');
    }
  },
  companyAttachments: async function (request, reply) {
    try {

      const foundInvesteeAttachments = await models.investeeAttachments.findAll({ where: {companyId: request.params.company_id} });
      for(let i = 0; i < foundInvesteeAttachments.length; i++){
        let foundInvesteeAttachmentsType = await models.investeeAttachmentsTypes.findOne({ where: { id: foundInvesteeAttachments[i].attachmentTypeId }, raw: true });
        if(foundInvesteeAttachmentsType != null){
          foundInvesteeAttachments[i].dataValues["type_name"] = foundInvesteeAttachmentsType.name;
        }
        foundInvesteeAttachments[i].dataValues["type_name"] = '';
      }
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
    let createdInvesteeAttachmentsType;
    let transaction = await models.sequelize.transaction();
      const uploadImageExtension = path.extname(request.payload.file.hapi.filename);
      const uploadIDExtension = path.extname(request.payload.idFile.hapi.filename);

      const relativePath = `./../../platform.ucx.zone/attachments/${request.payload.attachmentTypeId}-${moment().valueOf()}-${uploadImageExtension}`;
        //${request.params.companyId}
      // const fileName = ``;
      const path_url = `https://platform.ucx.zone/attachments/${request.payload.attachmentTypeId}-${moment().valueOf()}-${uploadImageExtension}`
      const id_path_url = `https://platform.ucx.zone/attachments/${request.payload.attachmentTypeId}-${moment().valueOf() + 1}-${uploadIDExtension}`
      const idRelativePath = `./../../platform.ucx.zone/attachments/${request.payload.attachmentTypeId}-${moment().valueOf() + 1}-${uploadIDExtension}`;

      const fullPath = relativePath;
      try {
      await models.investeeAttachmentsTypes.findOne({ where: { id: request.payload.attachmentTypeId } });

        // if(!_.includes(allowedExtensions, uploadImageExtension.toLowerCase())) {

        //   return Boom.badRequest(`allowed file extension are  ${allowedExtensions.join(' , ')}`);
        // }


        // if(_.isEmpty(foundInvesteeAttachmentType)) {

        //   return Boom.badRequest('This Attachment Type Not Supported In Investee Company');
        // }

        // await fsPromises.mkdir(fullPath, { recursive: true });
        // await fsPromises.access(fullPath, fs.constants.W_OK);
        // await request.payload.file.pipe(fs.createWriteStream(fullPath));
        await request.payload.file.pipe(fs.createWriteStream(fullPath));
        await request.payload.idFile.pipe(fs.createWriteStream(idRelativePath));
        request.payload.createdBy = request.params.userId; //request.auth.decoded.id;
        request.payload.companyId = request.params.companyId;
        // request.payload.file[i].attachmentTypeId = request.payload.attachmentTypeId[i];
        request.payload.attachmentPath = path_url;
        request.payload.id_img_path = id_path_url;
        request.payload.relation = request.payload.relationToCompany;
        // request.payload.file[i].description = request.payload.description[i];

        createdInvesteeAttachmentsType = await models.investeeAttachments.create(request.payload);
        await transaction.commit();
      }
      catch (e) {
        console.log('error', e);
        if(transaction){
          await transaction.rollback();
        }
        // fs.unlinkSync(path.join(__dirname, '../', fullPath));
        return Boom.badImplementation('An internal server error occurred');
      }

    return reply.response(createdInvesteeAttachmentsType).code(201);
  },
  update: async function (request, reply) {
    let transaction = await models.sequelize.transaction();
    const uploadImageExtension = path.extname(request.payload.file.hapi.filename);
    const uploadIDExtension = path.extname(request.payload.idFile.hapi.filename);
    const path_url = `https://platform.ucx.zone/attachments/${request.payload.attachmentTypeId}-${moment().valueOf()}-${uploadImageExtension}`
    const relativePath = `./../../platform.ucx.zone/attachments/${request.payload.attachmentTypeId}-${moment().valueOf()}-${uploadImageExtension}`;
    // const relativePath = `uploads/investee/${request.params.companyId}/`;
    // const fileName = `${request.payload.attachmentTypeId}-${moment().valueOf()}-${uploadImageExtension}`;
    const id_path_url = `https://platform.ucx.zone/attachments/${request.payload.attachmentTypeId}-${moment().valueOf() + 1}-${uploadIDExtension}`
    const idRelativePath = `./../../platform.ucx.zone/attachments/${request.payload.attachmentTypeId}-${moment().valueOf() + 1}-${uploadIDExtension}`;
    const fullPath = relativePath;
    try {

      // const allowedExtensions = ['.tif', '.png', '.svg', '.jpg', '.gif',
      //   '.7z', '.arj', '.rar', '.tar.gz', '.z', '.zip',
      //   '.ods', '.xlr', '.xls', '.xlsx',
      //   '.doc', '.odt', '.pdf', '.wpd'
      // ];

      // if(!_.includes(allowedExtensions, uploadImageExtension.toLowerCase())) {

      //   return Boom.badRequest(`allowed file extension are  ${allowedExtensions.join(' , ')}`);
      // }

      // const foundInvesteeAttachmentsType = await models.investeeAttachments.findOne({ where: { id: request.params.id }, raw: true });

      // if(_.isEmpty(foundInvesteeAttachmentsType)) {

      //   return Boom.notFound('Attachment Type You Try To Update does Not Exist');
      // }

      // await fsPromises.access(fullPath, fs.constants.W_OK);
      await request.payload.file.pipe(fs.createWriteStream(fullPath));
      await request.payload.idFile.pipe(fs.createWriteStream(idRelativePath));
      request.payload.attachmentPath = path_url;
      request.payload.id_img_path = id_path_url;
      request.payload.relation = request.payload.relationToCompany;
      await models.investeeAttachments.update( request.payload, { where: { id: request.params.id } });
      // await fsPromises.unlink(path.join(__dirname, '../', foundInvesteeAttachmentsType.attachmentPath));

      return reply.response({ status: 200, message: "Updated successfully"}).code(200);
      await transaction.commit();
    }
    catch (e) {
      if(transaction){
        await transaction.rollback();
      }
      console.log('error', e);
      // await fsPromises.unlink(path.join(__dirname, '../', fullPath));
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
