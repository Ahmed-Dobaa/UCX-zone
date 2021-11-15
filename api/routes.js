'use strict';

const path = require('path');
const helperService = require('./services/helperService');

const registrationSchema = require('./schemas/registration.js');
const activationSchema = require('./schemas/activation.js');
const deactivationSchema = require('./schemas/deactive.js');
const loginSchema = require('./schemas/login.js');
const forgetpasswordSchema = require('./schemas/forgetpasswordSchema.js');
const changepasswordSchema = require('./schemas/changepasswordSchema.js');
const permissionSchema = require('./schemas/permissionSchema.js');
const rolesSchema = require('./schemas/rolesSchema.js');
const countrySchema = require('./schemas/country.js');
const sectorSchema = require('./schemas/sector');
const userUpdateSchema = require('./schemas/userUpdateSchema.js');
const investeeSchema = require('./schemas/investeeSchema.js');
const investeeCapitalSchema = require('./schemas/investeeCapital.js');
const investeeOwnershipSchema = require('./schemas/investeeOwnership.js');
const createBoardOfDirectorsPositionSchema = require('./schemas/boardOfDirectorsPositions/createBoardOfDirectorsPosition.js');
const updateBoardOfDirectorsPositionSchema = require('./schemas/boardOfDirectorsPositions/updateBoardOfDirectorsPosition.js');
const boardOfDirector = require('./schemas/boardOfDirector.js');
const subsidiarySchema = require('./schemas/subsidiary');
const investeeManagement = require('./schemas/investeeManagement.js');
const investeeAuditor = require('./schemas/investeeAuditor.js');
const investeeAttachmentsTypes = require('./schemas/investeeAttachmentsTypes.js');
const investeeBalance = require('./schemas/investeeBalance');
const investor = require('./schemas/investor');
const follow = require('./schemas/follow');
const interestSubmition = require('./schemas/interestSubmition');
const investeeInvestmentProposalsSchema = require('./schemas/investeeInvestmentProposalsSchema');
const investeeIncome = require('./schemas/investeeIncome');
const serviceProviderSchema = require('./schemas/serviceProvider.js');
const serviceRequestSchema = require('./schemas/serviceRequest.js');
const subUserSchema = require('./schemas/SubUser');
const investmentTypeSchema = require('./schemas/investmentTypeSchema');
const investorManagementSchema = require('./schemas/investorManagementSchema');
const authenticationController = require('./controllers/authenticationController');
const permissionController = require('./controllers/permissionController');
const rolesController = require('./controllers/rolesController');
const countriesController = require('./controllers/countriesController');
const sectorsController = require('./controllers/SectorsController');
const userController = require('./controllers/userController');
const companyController = require('./controllers/CompanyController');
const lookupMaster = require('./controllers/lookup_master');
const lookupDetails = require('./controllers/lookup_details');
const investeeController = require('./controllers/InvesteeController');
const investeeCapitalController = require('./controllers/InvesteeCapitalController');
const investeeOwnershipController = require('./controllers/InvesteeOwnershipController');
const boardOfDirectorsPositionsController = require('./controllers/BoardOfDirectorsPositionsController');
const investeeBoardOfDirectorsController = require('./controllers/InvesteeBoardOfDirectorsController');
const investeeManagementsController = require('./controllers/investeeManagementsController');
const investeeAuditorsController = require('./controllers/investeeAuditorsController');
const investeeAttachmentsTypesController = require('./controllers/investeeAttachmentsTypesController');
const investeeAttachmentsController = require('./controllers/investeeAttachmentsController');
const investeeBalanceController = require('./controllers/investeeBalanceController');
const subsidiariesCompanyController = require('./controllers/SubsidiariesController');
const investorController = require('./controllers/InvestorController');
const investorInterestsSubmits = require('./controllers/investorInterestsSubmitsController');
const investeeInvestmentProposalsController = require('./controllers/investeeInvestmentProposalsController');
const investeeIncomeController = require('./controllers/InvesteeIncomeController');
const serviceProviderController = require('./controllers/ServiceProviderController');
const serviceRequestController = require('./controllers/ServiceRequestController');
const subUserController = require('./controllers/SubUserController');
const investmentTypeController = require('./controllers/investmentTypeController');
const investorManagementController = require('./controllers/investorManagementController');
const userInvestorController = require('./controllers/usersInvestorController');

const Joi = require('joi');
const CurrencyController = require('./controllers/CurrencyController');
const city = require('./controllers/CitiesController');

module.exports = [
  {
    method: 'GET',
    path: '/{param*}',
    options: {
      auth: false,
      handler: {
        directory: {
          path: path.join(__dirname, '../', 'public'),
          redirectToSlash: true,
          index: ['index.html']
        }
      }
    }
  },
  {
    path: '/register',
    method: 'POST',
    options: {
      payload: { allow: ['application/json'] },
      plugins: { 'hapi-geo-locate': { enabled: true, fakeIP: '41.46.64.133' } },
      description: 'Register',
      auth: false,
      validate: registrationSchema,
      handler: authenticationController.registerUser
    }
  },
  {
    path: '/activate',
    method: 'post',
    options: {
      description: 'Activate user account',
      auth: false,
      validate: activationSchema,
      handler: authenticationController.activateUser
    }
  },
  {
    path: '/resendActivationEmail',
    method: 'post',
    options: {
      description: 'resend Activate mail',
      auth: false,
      validate: { payload: { email: Joi.string().email().required().example('test@abc.com') } },
      handler: authenticationController.resentActivationMail
    }
  },
  {
    path: '/login',
    method: 'POST',
    options: {
      payload: { allow: ['application/json'], },
      description: 'Login',
      validate: loginSchema,
      auth: false,
      handler: authenticationController.login
    }
  },
  {
    path: '/password/recovery',
    method: 'POST',
    options: {
      payload: { allow: ['application/json'], },
      description: 'forget password',
      validate: forgetpasswordSchema,
      auth: false,
      handler: authenticationController.forgetPassword
    }
  },
  {
    path: '/password/reset',
    method: 'POST',
    options: {
      payload: { allow: ['application/json'], },
      description: 'change password',
      // validate: changepasswordSchema,
      auth: false,
      handler: authenticationController.resetPassword
    }
  },
  {
    path: '/password/set',
    method: 'POST',
    options: {
      payload: { allow: ['application/json'], },
      description: 'change password',
      validate: changepasswordSchema,
      auth: 'forgetPasswordJwt',
      handler: authenticationController.changePassword
    }
  },
  {
    path: '/logout',
    method: 'POST',
    options: {
      payload: { allow: ['application/json'], },
      description: 'logout user from the account',
      auth: 'jwt',
      handler: authenticationController.logout
    }
  },
  {
    path: '/permissions',
    method: 'get',
    options: {
      description: 'list all permissions',
      auth: 'jwt',
      // app: { allowedPermission: { resource: 'permissions', action: 'find' } },
      handler: permissionController.find
    }
  },
  {
    path: '/permissions/{id}',
    method: 'get',
    options: {
      description: 'get specific permissions by its id',
      auth: 'jwt',
      // app: { allowedPermission: { resource: 'permissions', action: 'findOne' } },
      handler: permissionController.findOne
    }
  },
  {
    path: '/permissions',
    method: 'POST',
    options: {
      payload: { allow: ['application/json'], },
      description: 'create new permissions',
      auth: 'jwt',
      app: { allowedPermission: { resource: 'permissions', action: 'create' } },
      // pre: [
      //   // { method: helperService.authorizeUser },
      //   // { method: helperService.getLanguageId, assign: 'languageId' }
      // ],
      validate: permissionSchema.createSchema,
      handler: permissionController.create
    }
  },
  {
    path: '/permissions/{id}',
    method: 'put',
    options: {
      payload: { allow: ['application/json'], },
      description: 'update specific permissions by its id',
      auth: 'jwt',
      app: { allowedPermission: { resource: 'permissions', action: 'update' } },
      // pre: [
      //   // { method: helperService.authorizeUser },
      //   // { method: helperService.getLanguageId, assign: 'languageId' }
      // ],
      validate: permissionSchema.updateSchema,
      handler: permissionController.update
    }
  },
  {
    path: '/permissions/{id}',
    method: 'delete',
    options: {
      description: 'delete specific permissions by its id',
      auth: 'jwt',
      app: { allowedPermission: { resource: 'permissions', action: 'delete' } },
      // pre: [
      //   // { method: helperService.authorizeUser },
      //   // { method: helperService.getLanguageId, assign: 'languageId' }
      // ],
      handler: permissionController.delete
    }
  },
  {
    path: '/roles',
    method: 'get',
    options: {
      description: 'list all roles and support pagination',
      auth: 'jwt',
      app: { allowedPermission: { resource: 'roles', action: 'find' } },
      // pre: [
      //   // { method: helperService.authorizeUser },
      //   // { method: helperService.getLanguageId, assign: 'languageId' }
      // ],
      handler: rolesController.find
    }
  },
  {
    path: '/roles/{id}',
    method: 'get',
    options: {
      description: 'get specific role by its id',
      auth: 'jwt',
      app: { allowedPermission: { resource: 'roles', action: 'findOne' } },
      // pre: [
      //   // { method: helperService.authorizeUser },
      //   // { method: helperService.getLanguageId, assign: 'languageId' }
      // ],
      validate: { params: { id: Joi.number().required().description('the id of functionality'), } },
      handler: rolesController.findOne
    }
  },
  {
    path: '/roles',
    method: 'post',
    options: {
      payload: { allow: ['application/json'], },
      description: 'create new role',
      auth: 'jwt',
      app: { allowedPermission: { resource: 'roles', action: 'create' } },
      // pre: [
      //   // { method: helperService.authorizeUser },
      //   // { method: helperService.getLanguageId, assign: 'languageId' }
      // ],
      validate: rolesSchema.createSchema,
      handler: rolesController.create
    }
  },
  {
    path: '/roles/{id}',
    method: 'put',
    options: {
      payload: { allow: ['application/json'], },
      description: 'update specific role by its id',
      auth: 'jwt',
      app: { allowedPermission: { resource: 'roles', action: 'update' } },
      // pre: [
      //   // { method: helperService.authorizeUser },
      //   // { method: helperService.getLanguageId, assign: 'languageId' }
      // ],
      validate: rolesSchema.updateSchema,
      handler: rolesController.update
    }
  },
  {
    path: '/roles/{id}',
    method: 'delete',
    options: {
      description: 'delete specific role by its id',
      auth: 'jwt',
      app: { allowedPermission: { resource: 'roles', action: 'delete' } },
      // pre: [
      //   // { method: helperService.authorizeUser },
      //   // { method: helperService.getLanguageId, assign: 'languageId' }
      // ],
      validate: { params: { id: Joi.number().required().description('the id of functionality'), } },
      handler: rolesController.delete
    }
  },
  {
    path: '/countries',
    method: 'get',
    options: {
      description: 'list all countries and support pagination',
      // app: { allowedPermission: { resource: 'countries', action: 'find' } },
      pre: [
        // // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }//
      ],
      auth: false,
      handler: countriesController.find
    }
  },
  {
    path: '/worldCountries',
    method: 'get',
    options: {
      description: 'list all countries and support pagination',
      // app: { allowedPermission: { resource: 'countries', action: 'find' } },
      pre: [
        // // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }//
      ],
      auth: false,
      handler: countriesController.getAllWorldCountries
    }
  },
  {
    path: '/countries/{id}',
    method: 'get',
    options: {
      description: 'get specific country by its id',
      // app: { allowedPermission: { resource: 'countries', action: 'findOne' } },
      pre: [
        // // { method: helperService.authorizeUser },
    //    { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      auth: 'jwt',
      validate: { params: countrySchema.updateSchema.params },
      handler: countriesController.findOne
    }
  },
  {
    path: '/countries/flags',
    method: 'get',
    options: {
      description: 'get specific country by its id',
      // app: { allowedPermission: { resource: 'countries', action: 'findOne' } },
      pre: [
        // // { method: helperService.authorizeUser },
    //    { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      auth: false,
      // validate: { params: countrySchema.updateSchema.params },
      handler: countriesController.updateFlag
    }
  },
  {
    path: '/countries/setTargetCountries',
    method: 'get',
    options: {
      description: 'get specific country by its id',
      // app: { allowedPermission: { resource: 'countries', action: 'findOne' } },
      pre: [
        // // { method: helperService.authorizeUser },
    //    { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      auth: false,
      // validate: { params: countrySchema.updateSchema.params },
      handler: countriesController.setTargetCountries
    }
  },
  {
    path: '/countries',
    method: 'post',
    options: {
      payload: { allow: ['application/json'], },
      description: 'create new country',
      app: { allowedPermission: { resource: 'countries', action: 'create' } },
      pre: [
        // { method: helperService.authorizeUser },
    //    { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      auth: 'jwt',
      validate: countrySchema.createSchema,
      handler: countriesController.create
    }
  },
  {
    path: '/countries/{id}/translate',
    method: 'post',
    options: {
      description: 'update specific country translation by its id',
      app: { allowedPermission: { resource: 'countries', action: 'translate' } },
      pre: [
        // { method: helperService.authorizeUser },
   //     { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      auth: 'jwt',
      validate: countrySchema.translateSchema,
      handler: countriesController.translate
    }
  },
  {
    path: '/countries/{id}',
    method: 'put',
    options: {
      description: 'update specific country by its id',
      auth: 'jwt',
      app: { allowedPermission: { resource: 'countries', action: 'update' } },
      pre: [
        // { method: helperService.authorizeUser },
  //     { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: countrySchema.updateSchema,
      handler: countriesController.update
    }
  },
  {
    path: '/countries/{id}',
    method: 'delete',
    options: {
      description: 'delete specific country by its id',
      app: { allowedPermission: { resource: 'countries', action: 'delete' } },
      pre: [
        // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      auth: 'jwt',
      validate: { params: countrySchema.updateSchema.params },
      handler: countriesController.delete
    }
  },
  {
    path: '/currencies',
    method: 'get',
    options: {
      auth: false,
      handler: CurrencyController.find
    }
  },
  {
    path: '/sectors',
    method: 'get',
    options: {
      auth: false,
      handler: sectorsController.find
    }
  },
  {
    path: '/sector',
    method: 'get',
    options: {
      auth: false,
      handler: sectorsController.sectors
    }
  },
  {
    path: '/sectors/{id}',
    method: 'get',
    options: {
      description: 'get specific sector by its id',
   //   pre: [{ method: helperService.getLanguageId, assign: 'languageId' }],
      // auth: 'jwt',
      validate: { params: sectorSchema.updateSchema.params },
      handler: sectorsController.findOne
    }
  },
  {
    path: '/sectors',
    method: 'post',
    options: {
      payload: { allow: ['application/json'], },
      description: 'create new sector',
      app: { allowedPermission: { resource: 'sectors', action: 'create' } },
      pre: [
        // { method: helperService.authorizeUser },
    //    { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      auth: 'jwt',
      validate: sectorSchema.createSchema,
      handler: sectorsController.create
    }
  },
  {
    path: '/sectors/{id}/translate',
    method: 'post',
    options: {
      description: 'update specific sector translation by its id',
      app: { allowedPermission: { resource: 'sectors', action: 'translate' } },
      pre: [// { method: helperService.authorizeUser },
    //    { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      auth: 'jwt',
      validate: countrySchema.updateScehema,
      handler: sectorsController.translate
    }
  },
  {
    path: '/sectors/{id}',
    method: 'put',
    options: {
      description: 'update specific sector by its id',
      app: { allowedPermission: { resource: 'sectors', action: 'update' } },
      pre: [
        // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      // auth: 'jwt',
      validate: sectorSchema.updateScehema,
      handler: sectorsController.update
    }
  },
  {
    path: '/sectors/{id}',
    method: 'delete',
    options: {
      description: 'delete specific sector by its id',
      app: { allowedPermission: { resource: 'sectors', action: 'delete' } },
      pre: [
        // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      auth: 'jwt',
      validate: { params: sectorSchema.updateSchema.params },
      handler: sectorsController.delete
    }
  },
  {
    path: '/users',
    method: 'GET',
    options: {
      auth: 'jwt',
      description: 'Get all registered users',
      app: { allowedPermission: { resource: 'users', action: 'findAll' } },
      // pre: [
      //   // { method: helperService.authorizeUser }
      // ],
      handler: userController.findAll
    }
  },
  {
    path: '/users/{id}',
    method: 'GET',
    options: {
      auth: 'jwt',
      description: 'Get current user details',
      // app: { allowedPermission: { resource: 'users', action: 'findOne' } },
      // pre: [// { method: helperService.authorizeUser }],
      handler: userController.findOne
    }
  },
  {
    path: '/users/{id}',
    method: 'put',
    options: {
      payload: { allow: ['application/json'] },
      auth: 'jwt',
      validate: userUpdateSchema,
      description: 'Get current user details',
      // app: { allowedPermission: { resource: 'users', action: 'update' } },
      handler: userController.update
    }
  },
  {
    path: '/users/{id}/deactivate',
    method: 'POST',
    options: {
      description: 'user deactivate his account',
      auth: 'jwt',
      validate: deactivationSchema,
      handler: authenticationController.deactivateUser
    }
  },
  {
    path: '/users/{id}/avatar',
    method: 'POST',
    options: {
      auth: 'jwt',
      payload: {
        maxBytes: 2097152, // maximum payload size in bytes (2M)
        output: 'stream', // The output controls whether you keep the file in memory, a temporary file or receive the file as a stream
        parse: true, // The parse property determines if the incoming payload gets parsed
        allow: ['multipart/form-data']
      },
      validate: {
        params: { id: Joi.number().required().description('the id of user to get its avatar') },
        payload: { avatar: Joi.any().required().description('Image File') }
      },
      description: 'user Change his current avatar',
      handler: userController.uploadAvatar
    }
  },
  {
    path: '/users/{id}/avatar',
    method: 'get',
    options: {
      auth: false,
      description: 'Get current user avatar',
      validate: { params: { id: Joi.number().required().description('the id of user to get its avatar'), } },
      handler: userController.getAvatar
    }
  },
  {
    path: '/users/{id}/password',
    method: 'put',
    options: {
      auth: 'jwt',
      description: 'user change his current password',
      validate: {
        params: { id: Joi.number().required().description('the id of user to get its avatar'), },
        payload: {
          currentPassword: Joi.number().required().description('the id of user to get its avatar'),
          password: Joi.number().required().description('the id of user to get its avatar'),
          confirmationPassword: Joi.number().required().description('the id of user to get its avatar'),
          logout: Joi.boolean().required()
        }
      },
      handler: userController.changePassword
    }
  },
  {
    path: '/users/{id}/devices',
    method: 'GET',
    options: {
      auth: 'jwt',
      description: 'Get all user logged in devices',
      validate: { params: { id: Joi.number().required().description('the id of user to get its logged in devices') } },
      handler: userController.getDevices
    }
  },
  {
    path: '/users/{id}/devices/{deviceId}',
    method: 'DELETE',
    options: {
      auth: 'jwt',
      description: 'logout user from specific device',
      validate: {
        params: {
          id: Joi.number().required().description('the id of user to get its logged in devices'),
          deviceId: Joi.number().required().description('the id of device user need to logout from')
        }
      },
      handler: userController.logoutDevice
    }
  },
  {
    path: '/company',
    method: 'GET',
    options: {
      auth: false, //'jwt',
      description: 'Get all companies in the system',
      app: { allowedPermission: { resource: 'companies', action: 'findAll' } },
      // pre: [
      //   // { method: helperService.authorizeUser }
      // ],
      handler: companyController.findAll
    }
  },
  {
    path: '/count',
    method: 'GET',
    options: {
      auth: false, //'jwt',
      description: 'Get all companies in the system',
      app: { allowedPermission: { resource: 'companies', action: 'count' } },
      // pre: [
      //   // { method: helperService.authorizeUser }
      // ],
      handler: companyController.count
    }
  },

  {
    path: '/user/{userId}/company',
    method: 'GET',
    options: {
      auth: false, //'jwt',
      description: 'Get all companies in the system',
      app: { allowedPermission: { resource: 'companies', action: 'findAll' } },
      // pre: [
      //   // { method: helperService.authorizeUser }
      // ],
      handler: companyController.findAllUserCompanies
    }
  },
  {
    path: '/lookupMaster',
    method: 'GET',
    options: {
      auth: false, //'jwt',
      description: 'Get all companies in the system',
      app: { allowedPermission: { resource: 'lookup_master', action: 'findAll' } },
      // pre: [
      //   // { method: helperService.authorizeUser }
      // ],
      handler: lookupMaster.getAllLookup
    }
  },
  {
    path: '/lookupDetails/{masterId}',
    method: 'GET',
    options: {
      auth: false, //'jwt',
      description: 'Get all companies in the system',
      app: { allowedPermission: { resource: 'lookup_details', action: 'findAll' } },
      // pre: [
      //   // { method: helperService.authorizeUser }
      // ],
      handler: lookupDetails.getLookupDetailBasedMaster
    }
  },
  {
    path: '/cities/{countryId}',
    method: 'GET',
    options: {
      auth: false, //'jwt',
      description: 'Get all companies in the system',
      app: { allowedPermission: { resource: 'cities', action: 'findAll' } },
      // pre: [
      //   // { method: helperService.authorizeUser }
      // ],
      handler: city.getCitiesBasedCountry
    }
  },
  {
    path: '/company/{companyId}',
    method: 'GET',
    options: {
      description: 'Get a specific company by its id',
      // app: { allowedPermission: { resource: 'companies', action: 'findOne' } },
      auth: 'jwt',
      validate: { params: { companyId: Joi.number().required().description('the id of the company') } },
      handler: companyController.findOne
    }
  },
  {
    path: '/company',
    method: 'POST',
    options: {
      auth: 'jwt',
      description: 'Create Company',
      app: { allowedPermission: { resource: 'companies', action: 'create' } },
      // pre: [
      //   // { method: helperService.authorizeUser }
      // ],
      validate: { payload: investeeSchema.createSchema.payload },
      handler: companyController.create
    }
  },
  {
    path: '/company/{companyId}',
    method: 'PUT',
    options: {
      description: 'update specific company by its id',
      app: { allowedPermission: { resource: 'companies', action: 'update' } },
      // pre: [
      //   // { method: helperService.authorizeUser }
      // ],
      auth: 'jwt',
      validate: investeeSchema.createSchema,
      handler: companyController.update
    }
  },
  {
    path: '/company/translation/{companyId}/{investeeId}',
    method: 'PUT',
    options: {
      description: 'update specific company by its id',
      app: { allowedPermission: { resource: 'companies', action: 'update' } },
      // pre: [
      //   // { method: helperService.authorizeUser }
      // ],
      auth: false,
      // validate: investeeSchema.createSchema,
      handler: companyController.translation
    }
  },
  {
    path: '/cities',
    method: 'GET',
    options: {
      description: 'update specific company by its id',
      app: { allowedPermission: { resource: 'cities', action: 'update' } },
      // pre: [
      //   // { method: helperService.authorizeUser }
      // ],
      auth: false,
      // validate: investeeSchema.createSchema,
      handler: city.createCitiesBasedCountry
    }
  },
  {
    path: '/company/{companyId}',
    method: 'DELETE',
    options: {
      description: 'delete specific company by its id',
      app: { allowedPermission: { resource: 'companies', action: 'delete' } },
      // pre: [
      //   // { method: helperService.authorizeUser }
      // ],
      auth: false, //'jwt',
      validate: { params: { companyId: Joi.number().required().description('the id of the company') } },
      handler: companyController.delete
    }
  },
  {
    path: '/users/{id}/2fa',
    method: 'PUT',
    options: {
      auth: 'jwt',
      description: 'Enable/ Disable 2fa for specific user.',
      validate: {
        params: { id: Joi.number().required().description('the id of user to get its logged in devices'), },
        payload: { enable: Joi.boolean().required() }
      },
      handler: userController.update2fa
    }
  },
  {
    path: '/users/{id}/2fa',
    method: 'post',
    options: {
      auth: 'jwt',
      description: 'generate and send 2fa by mail for specific user.',
      validate: {
        params: { id: Joi.number().required().description('the id of user to get its logged in devices'), },
        payload: { email: Joi.string().email().required().example('test@abc.com') }
      },
      handler: userController.regenerate2fa
    }
  },
  {
    path: '/users/{userId}/investees',
    method: 'POST',
    options: {
      auth: false,
      description: 'Create investee Company',
      // payload: {
      //   maxBytes: 2097152, // maximum payload size in bytes (2M)
      //   output: 'stream', // The output controls whether you keep the file in memory, a temporary file or receive the file as a stream
      //   parse: true, // The parse property determines if the incoming payload gets parsed
      //   allow: ['multipart/form-data']
      // },
      // app: { allowedPermission: { resource: 'investees', action: 'create' } },
      validate: investeeSchema.createSchema,
      handler: investeeController.create
    }
  },
  // {
  //   path: '/users/{id}/avatar',
  //   method: 'POST',
  //   options: {
  //     auth: 'jwt',
  //     payload: {
  //       maxBytes: 2097152, // maximum payload size in bytes (2M)
  //       output: 'stream', // The output controls whether you keep the file in memory, a temporary file or receive the file as a stream
  //       parse: true, // The parse property determines if the incoming payload gets parsed
  //       allow: ['multipart/form-data']
  //     },
  //     validate: {
  //       params: { id: Joi.number().required().description('the id of user to get its avatar') },
  //       payload: { avatar: Joi.any().required().description('Image File') }
  //     },
  //     description: 'user Change his current avatar',
  //     handler: investeeController.uploadAvatar
  //   }
  // },
  {
    path: '/users/{userId}/investees/{id}/translate',
    method: 'POST',
    options: {
      auth: 'jwt',
      description: 'translate investee Company',
      app: { allowedPermission: { resource: 'investees', action: 'translate' } },
      pre: [
        // { method: helperService.authorizeUser },
        { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: investeeSchema.translateSchema,
      handler: investeeController.translate
    }
  },
  {
    path: '/users/{userId}/investees',
    method: 'GET',
    options: {
      auth: false, //'jwt',
      description: 'Get all investee companies for that user',
      // app: { allowedPermission: { resource: 'investees', action: 'findAll' } },
      pre: [
        // // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: { params: { userId: Joi.string().required().example('16').description('the id of the user') } },
      handler: investeeController.findAll
    }
  },
  {
    path: '/investees',
    method: 'GET',
    options: {
      auth: 'jwt',
      description: 'Get all investee companies for logged in user',
      // app: { allowedPermission: { resource: 'investees', action: 'findAll' } },
      pre: [
        // // { method: helperService.authorizeUser },
     //   { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      handler: investeeController.findAllForLoggedInUser
    }
  },
  {
    path: '/users/{userId}/investees/{id}',
    method: 'GET',
    options: {
      auth: false, //'jwt',
      description: 'Get specific investee companies for that user by its it',
      // app: { allowedPermission: { resource: 'investees', action: 'findOne' } },
      pre: [
        // // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: {
        params: {
          userId: Joi.string().required().example('16').description('the id of the user'),
          id: Joi.string().required().example('16').description('the id of investee company')
        }
      },
      handler: investeeController.findOne
    }
  },
  {
    path: '/users/{userId}/investees/{id}',
    method: 'PUT',
    options: {
      description: 'update specific investee by its id for a specific user id',
      // payload: {
      //   maxBytes: 2097152, // maximum payload size in bytes (2M)
      //   output: 'stream', // The output controls whether you keep the file in memory, a temporary file or receive the file as a stream
      //   parse: true, // The parse property determines if the incoming payload gets parsed
      //   allow: ['multipart/form-data']
      // },
      auth: false, // 'jwt',
      app: { allowedPermission: { resource: 'investees', action: 'update' } },
      pre: [
        // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: investeeSchema.updateSchema,
      handler: investeeController.update
    }
  },
  {
    path: '/users/{userId}/investees/{id}',
    method: 'DELETE',
    options: {
      description: 'delete specific investee by its id for a specific user id',
      app: { allowedPermission: { resource: 'investees', action: 'delete' } },
      auth: 'jwt',
      pre: [
        // { method: helperService.authorizeUser },
     //   { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: {
        params: {
          userId: Joi.number().required().description('the id of the user'),
          id: Joi.number().required().description('the id of the company')
        }
      },
      handler: investeeController.delete
    }
  },
  {
    path: '/users/{userId}/investees/{investeeId}/capitals',
    method: 'GET',
    options: {
      auth: 'jwt',
      description: 'Find all investee capital',
      // app: { allowedPermission: { resource: 'investeeCapitals', action: 'find' } },
      pre: [
        // // { method: helperService.authorizeUser },
    //    { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: {
        params: {
          userId: Joi.number().required().description('the id of the user'),
          investeeId: Joi.number().required().description('the id of the company')
        }
      },
      handler: investeeCapitalController.find
    }
  },
  {
    path: '/users/{userId}/investees/{investeeId}/capitals',
    method: 'POST',
    options: {
      payload: { allow: ['application/json'] },
      auth: false, //'jwt',
      description: 'Create investee capital',
      app: { allowedPermission: { resource: 'investeeCapitals', action: 'create' } },
      pre: [
        // // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: investeeCapitalSchema.createSchema,
      handler: investeeCapitalController.create
    }
  },
  {
    path: '/users/{userId}/investees/{investeeId}/capitals/{id}/translate',
    method: 'POST',
    options: {
      payload: { allow: ['application/json'] },
      auth: 'jwt',
      description: 'translate investee capital',
      app: { allowedPermission: { resource: 'investeeCapitals', action: 'translate' } },
      pre: [
        // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: investeeCapitalSchema.translateSchema,
      handler: investeeCapitalController.translate
    }
  },
  {
    path: '/users/{userId}/investees/{investeeId}/capitals/{id}',
    method: 'GET',
    options: {
      auth: 'jwt',
      description: 'get specific investee capital',
      // app: { allowedPermission: { resource: 'investeeCapitals', action: 'findOne' } },
      pre: [
        // { method: helperService.authorizeUser },
     //   { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: {
        params: {
          userId: Joi.number().required().description('the id of the user'),
          investeeId: Joi.number().required().description('the id of the company'),
          id: Joi.number().required().description('the id of the company')
        }
      },
      handler: investeeCapitalController.findOne
    }
  },
  {
    path: '/users/{userId}/investees/{investeeId}/capitals/{id}',
    method: 'PUT',
    options: {
      payload: { allow: ['application/json'] },
      auth: false, // 'jwt',
      description: 'Update investee capital',
      app: { allowedPermission: { resource: 'investeeCapitals', action: 'update' } },
      pre: [
        // { method: helperService.authorizeUser },
    //    { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: investeeCapitalSchema.updateSchema,
      handler: investeeCapitalController.update
    }
  },
  {
    path: '/users/{userId}/investees/{investeeId}/capitals/{id}',
    method: 'DELETE',
    options: {
      auth: 'jwt',
      description: 'Delete investee capital',
      app: { allowedPermission: { resource: 'investeeCapitals', action: 'delete' } },
      pre: [
        // { method: helperService.authorizeUser },
    //    { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: {
        params: {
          investeeId: Joi.number().required().description('the id of the company'),
          userId: Joi.number().required().description('the id of the user'),
          id: Joi.number().required().description('the id of the capital')
        }
      },
      handler: investeeCapitalController.delete
    }
  },
  {
    path: '/users/{userId}/investees/{investeeId}/ownerships',
    method: 'GET',
    options: {
      auth: 'jwt',
      description: 'Find all investee ownership',
      // app: { allowedPermission: { resource: 'investeeOwnerships', action: 'find' } },
      pre: [
        // // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: {
        params: {
          userId: Joi.number().required().description('the id of the user'),
          investeeId: Joi.number().required().description('the id of the investee')
        }
      },
      handler: investeeOwnershipController.find
    }
  },
  {
    path: '/users/{userId}/investees/{investeeId}/ownerships',
    method: 'POST',
    options: {
      payload: { allow: ['application/json'] },
      auth: false, //'jwt',
      description: 'Create investee ownership',
      app: { allowedPermission: { resource: 'investeeOwnerships', action: 'create' } },
      pre: [
        // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: investeeOwnershipSchema.createSchema,
      handler: investeeOwnershipController.create
    }
  },
  {
    path: '/users/{userId}/investees/{investeeId}/ownerships/{id}/translate',
    method: 'POST',
    options: {
      payload: { allow: ['application/json'] },
      auth: 'jwt',
      description: 'Create investee ownership',
      app: { allowedPermission: { resource: 'investeeOwnerships', action: 'translate' } },
      pre: [
        // { method: helperService.authorizeUser },
       // { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: investeeOwnershipSchema.translateSchema,
      handler: investeeOwnershipController.translate
    }
  },
  {
    path: '/users/{userId}/investees/{investeeId}/ownerships/{id}',
    method: 'GET',
    options: {
      auth: 'jwt',
      description: 'get specific investee ownership',
      // app: { allowedPermission: { resource: 'investeeOwnerships', action: 'findOne' } },
      pre: [
        // // { method: helperService.authorizeUser },
     //   { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: {
        params: {
          userId: Joi.number().required().description('the id of the user'),
          investeeId: Joi.number().required().description('the id of the investee'),
          id: Joi.number().required().description('the id of the investee')
        }
      },
      handler: investeeOwnershipController.findOne
    }
  },
  {
    path: '/users/{userId}/investees/{investeeId}/ownerships/{id}',
    method: 'PUT',
    options: {
      payload: { allow: ['application/json'] },
      auth: false, // 'jwt',
      description: 'Update investee ownership',
      app: { allowedPermission: { resource: 'investeeOwnerships', action: 'update' } },
      pre: [
        // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: investeeOwnershipSchema.updateSchema,
      handler: investeeOwnershipController.update
    }
  },
  {
    path: '/users/{userId}/investees/{investeeId}/ownerships/{id}',
    method: 'DELETE',
    options: {
      auth: 'jwt',
      description: 'Delete investee ownership',
      app: { allowedPermission: { resource: 'investeeOwnerships', action: 'delete' } },
      pre: [
        // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: {
        params: {
          userId: Joi.number().required().description('the id of the user'),
          investeeId: Joi.number().required().description('the id of the investee'),
          id: Joi.number().required().description('the id of the investee')
        }
      },
      handler: investeeOwnershipController.delete
    }
  },
  {
    path: '/directorsPositions',
    method: 'GET',
    options: {
      description: 'list all Directors positions',
      auth: 'jwt',
      // app: { allowedPermission: { resource: 'directorsPositions', action: 'find' } },
      pre: [
        // // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      handler: boardOfDirectorsPositionsController.find
    }
  },
  {
    path: '/directorsPositions/{id}',
    method: 'GET',
    options: {
      description: 'get specific Directors position by its id',
      auth: 'jwt',
      // app: { allowedPermission: { resource: 'directorsPositions', action: 'findOne' } },
      pre: [
        // // { method: helperService.authorizeUser },
   //     { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: { params: { id: Joi.number().required().description('the id of the Director position') } },
      handler: boardOfDirectorsPositionsController.findOne
    }
  },
  {
    path: '/directorsPositions',
    method: 'POST',
    options: {
      payload: { allow: ['application/json'], },
      description: 'create new Directors Position',
      app: { allowedPermission: { resource: 'directorsPositions', action: 'create' } },
      pre: [
        // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      auth: false, //'jwt',
      validate: createBoardOfDirectorsPositionSchema,
      handler: boardOfDirectorsPositionsController.create
    }
  },
  {
    path: '/directorsPositions/{id}',
    method: 'PUT',
    options: {
      description: 'update specific Directors Position by its id',
      app: { allowedPermission: { resource: 'directorsPositions', action: 'update' } },
      pre: [
        // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      auth: 'jwt',
      validate: updateBoardOfDirectorsPositionSchema,
      handler: boardOfDirectorsPositionsController.update
    }
  },
  {
    path: '/directorsPositions/{id}',
    method: 'DELETE',
    options: {
      description: 'delete specific Directors Position by its id',
      app: { allowedPermission: { resource: 'directorsPositions', action: 'delete' } },
      pre: [
        // { method: helperService.authorizeUser },
        { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      auth: 'jwt',
      validate: { params: { id: Joi.number().required().description('the id of the Director position') } },
      handler: boardOfDirectorsPositionsController.delete
    }
  },
  {
    path: '/users/{userId}/investees/{investeeId}/directors',
    method: 'GET',
    options: {
      description: 'list all Directors',
      auth: 'jwt',
      // app: { allowedPermission: { resource: 'investeeDirectors', action: 'find' } },
      pre: [
        // // { method: helperService.authorizeUser },
       // { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: {
        params: {
          investeeId: Joi.number().required().description('the id of the investee'),
          userId: Joi.number().required().description('the id of the user')
        }
      },
      handler: investeeBoardOfDirectorsController.find
    }
  },
  {
    path: '/users/{userId}/investees/{investeeId}/directors/{id}',
    method: 'GET',
    options: {
      description: 'get specific Directors by its id',
      auth: 'jwt',
      // app: { allowedPermission: { resource: 'investeeDirectors', action: 'findOne' } },
      pre: [
        // // { method: helperService.authorizeUser },
     //   { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: {
        params: {
          investeeId: Joi.number().required().description('the id of the investee'),
          userId: Joi.number().required().description('the id of the user'),
          id: Joi.number().required().description('the id of the director')
        }
      },
      handler: investeeBoardOfDirectorsController.findOne
    }
  },
  {
    path: '/users/{userId}/investees/{investeeId}/directors',
    method: 'POST',
    options: {
      payload: { allow: ['application/json'] },
      description: 'create new Director',
      auth: false, //'jwt',
      app: { allowedPermission: { resource: 'investeeDirectors', action: 'create' } },
      pre: [
        // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      // validate: boardOfDirector.createSchema,
      handler: investeeBoardOfDirectorsController.create
    }
  },
  {
    path: '/users/{userId}/investees/{investeeId}/directors/{id}/translate',
    method: 'POST',
    options: {
      payload: { allow: ['application/json'] },
      description: 'translate Director',
      auth: 'jwt',
      app: { allowedPermission: { resource: 'investeeDirectors', action: 'translate' } },
      pre: [
        // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: boardOfDirector.translateSchema,
      handler: investeeBoardOfDirectorsController.translate
    }
  },
  {
    path: '/users/{userId}/investees/{investeeId}/directors/{id}',
    method: 'PUT',
    options: {
      payload: { allow: ['application/json'] },
      description: 'update specific Director by its id',
      auth: false, //'jwt',
      app: { allowedPermission: { resource: 'investeeDirectors', action: 'update' } },
      pre: [
        // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: boardOfDirector.updateSchema,
      handler: investeeBoardOfDirectorsController.update
    }
  },
  {
    path: '/users/{userId}/investees/{investeeId}/directors/{id}',
    method: 'DELETE',
    options: {
      description: 'delete specific Director by its id',
      auth: 'jwt',
      app: { allowedPermission: { resource: 'investeeDirectors', action: 'delete' } },
      pre: [
        // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: {
        params: {
          investeeId: Joi.number().required().description('the id of the investee'),
          userId: Joi.number().required().description('the id of the user'),
          id: Joi.number().required().description('the id of the Director')
        }
      },
      handler: investeeBoardOfDirectorsController.delete
    }
  },
  {
    path: '/users/{userId}/investees/{companyId}/managements',
    method: 'get',
    options: {
      auth: 'jwt',
      description: 'get all investee Company managements',
      // app: { allowedPermission: { resource: 'investeeManagements', action: 'findAll' } },
      pre: [
        // // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: {
        params: {
          userId: Joi.number().required().description('the id of the user'),
          companyId: Joi.number().required().description('the id of the company')
        }
      },
      handler: investeeManagementsController.findAll
    }
  },
  {
    path: '/users/{userId}/investees/{companyId}/managements',
    method: 'post',
    options: {
      payload: { allow: ['application/json'] },
      auth: 'jwt',
      description: 'create new investee management',
      app: { allowedPermission: { resource: 'investeeManagements', action: 'create' } },
      pre: [
        // // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: investeeManagement.createSchema ,
      handler: investeeManagementsController.create
    }
  },
  {
    path: '/users/{userId}/investees/{companyId}/managements/{id}/translate',
    method: 'post',
    options: {
      payload: { allow: ['application/json'] },
      auth: 'jwt',
      description: 'translate investee management',
      app: { allowedPermission: { resource: 'investeeManagements', action: 'translate' } },
      pre: [
        // { method: helperService.authorizeUser },
       // { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: investeeManagement.translateSchema ,
      handler: investeeManagementsController.translate
    }
  },
  {
    path: '/users/{userId}/investees/{companyId}/managements/{managementId}',
    method: 'get',
    options: {
      description: 'get specific investee management by its id',
      auth: 'jwt',
      // app: { allowedPermission: { resource: 'investeeManagements', action: 'findOne' } },
      pre: [
        // // { method: helperService.authorizeUser },
     //   { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: { params: investeeManagement.params },
      handler: investeeManagementsController.findOne
    }
  },
  {
    path: '/users/{userId}/investees/{companyId}/managements/{managementId}',
    method: 'put',
    options: {
      payload: { allow: ['application/json'] },
      description: 'update specific investee management by its id',
      auth: 'jwt',
      app: { allowedPermission: { resource: 'investeeManagements', action: 'update' } },
      pre: [
        // // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: investeeManagement.updateSchema,
      handler: investeeManagementsController.update
    }
  },
  {
    path: '/users/{userId}/investees/{companyId}/managements/{managementId}',
    method: 'delete',
    options: {
      description: 'get specific investee management by its id',
      auth: 'jwt',
      app: { allowedPermission: { resource: 'investeeManagements', action: 'delete' } },
      pre: [
        // // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: { params: investeeManagement.params },
      handler: investeeManagementsController.delete
    }
  },
  {
    path: '/users/{userId}/investees/{companyId}/auditors',
    method: 'get',
    options: {
      auth: 'jwt',
      description: 'get all investee Company auditors',
      // app: { allowedPermission: { resource: 'investeeAuditors', action: 'findAll' } },
      pre: [
        // // { method: helperService.authorizeUser },
       // { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: {
        params: {
          userId: Joi.number().required().description('the id of the user'),
          companyId: Joi.number().required().description('the id of the company')
        }
      },
      handler: investeeAuditorsController.findAll
    }
  },
  {
    path: '/users/{userId}/investees/{investeeId}/auditors',
    method: 'post',
    options: {
      payload: { allow: ['application/json'] },
      auth: false, //'jwt',
      description: 'create new investee auditor',
      app: { allowedPermission: { resource: 'investeeAuditors', action: 'create' } },
      pre: [
        // // { method: helperService.authorizeUser },
       // { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: investeeAuditor.createSchema,
      handler: investeeAuditorsController.create
    }
  },
  {
    path: '/users/{userId}/investees/{companyId}/auditors/{id}/translate',
    method: 'post',
    options: {
      payload: { allow: ['application/json'] },
      auth: 'jwt',
      description: 'translate investee auditor',
      app: { allowedPermission: { resource: 'investeeAuditors', action: 'translate' } },
      pre: [
        // // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: investeeAuditor.translateSchema,
      handler: investeeAuditorsController.translate
    }
  },
  {
    path: '/users/{userId}/investees/{companyId}/auditors/{auditorId}',
    method: 'get',
    options: {
      description: 'get specific investee auditor by its id',
      auth: 'jwt',
      // app: { allowedPermission: { resource: 'investeeAuditors', action: 'findOne' } },
      pre: [
        // // // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: { params: investeeAuditor.params },
      handler: investeeAuditorsController.findOne
    }
  },
  {                                  // companyId
    path: '/users/{userId}/investees/{investeeId}/auditors/{auditorId}/{auditorTranslationId}',
    method: 'put',
    options: {
      payload: { allow: ['application/json'] },
      description: 'get specific investee auditor by its id',
      auth: false, //'jwt',
      app: { allowedPermission: { resource: 'investeeAuditors', action: 'update' } },
      pre: [
        // // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: investeeAuditor.updateSchema,
      handler: investeeAuditorsController.update
    }
  },
  {
    path: '/users/{userId}/investees/{companyId}/auditors/{auditorId}',
    method: 'delete',
    options: {
      description: 'get specific investee auditor by its id',
      auth: 'jwt',
      app: { allowedPermission: { resource: 'investeeAuditors', action: 'delete' } },
      pre: [
        // // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: { params: investeeAuditor.params },
      handler: investeeAuditorsController.delete
    }
  },
  {
    path: '/investeeAttachmentsTypes',
    method: 'get',
    options: {
      auth: false, //'jwt',
      description: 'get all investee attachments types',
      // app: { allowedPermission: { resource: 'investeeAttachmentsTypes', action: 'findAll' } },
      // pre: [
      //   // // { method: helperService.authorizeUser },
      //   { method: helperService.getLanguageId, assign: 'languageId' }
      // ],
      handler: investeeAttachmentsTypesController.findAll
    }
  },
  {
    path: '/investeeAttachmentsTypes',
    method: 'post',
    options: {
      payload: { allow: ['application/json'] },
      auth: 'jwt',
      description: 'create new investee attachment type',
      app: { allowedPermission: { resource: 'investeeAttachmentsTypes', action: 'create' } },
      pre: [
        // // { method: helperService.authorizeUser },
     //   { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: investeeAttachmentsTypes.create,
      handler: investeeAttachmentsTypesController.create
    }
  },
  {
    path: '/investeeAttachmentsTypes/{id}',
    method: 'get',
    options: {
      description: 'get specific investee attachment type by its id',
      auth: 'jwt',
      // app: { allowedPermission: { resource: 'investeeAttachmentsTypes', action: 'findAll' } },
      // pre: [
      //   // // { method: helperService.authorizeUser },
      //   { method: helperService.getLanguageId, assign: 'languageId' }
      // ],
      validate: { params: { id: Joi.number().required().description('the id of the user') } },
      handler: investeeAttachmentsTypesController.findOne
    }
  },
  {
    path: '/investeeAttachmentsTypes/{id}',
    method: 'put',
    options: {
      payload: { allow: ['application/json'] },
      description: 'update specific investee attachment type by its id',
      auth: 'jwt',
      app: { allowedPermission: { resource: 'investeeAttachmentsTypes', action: 'update' } },
      pre: [
        // // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: investeeAttachmentsTypes.update,
      handler: investeeAttachmentsTypesController.update
    }
  },
  {
    path: '/investeeAttachmentsTypes/{id}',
    method: 'delete',
    options: {
      description: 'delete specific investee attachment type by its id',
      auth: 'jwt',
      app: { allowedPermission: { resource: 'investeeAttachmentsTypes', action: 'delete' } },
      pre: [
        // // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: { params: { id: Joi.number().required().description('the id of the type') } },
      handler: investeeAttachmentsTypesController.delete
    }
  },
  {
    path: '/users/{userId}/investees/{companyId}/attachments',
    method: 'get',
    options: {
      auth: 'jwt',
      description: 'get all investee attachments',
      // app: { allowedPermission: { resource: 'investeeAttachments', action: 'findAll' } },
      pre: [
        // // // { method: helperService.authorizeUser },
       // { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: {
        params: {
          userId: Joi.number().required().description('the id of the attachment'),
          companyId: Joi.number().required().description('the id of the attachment')
        }
      },
      handler: investeeAttachmentsController.findAll
    }
  },
  {
    path: '/users/{userId}/investees/{companyId}/attachments',
    method: 'post',
    options: {
      payload: {
        maxBytes: 2097152, // maximum payload size in bytes (2M)
        output: 'stream', // The output controls whether you keep the file in memory, a temporary file or receive the file as a stream
        parse: true, // The parse property determines if the incoming payload gets parsed
        allow: ['multipart/form-data']
      },
      auth: false, // 'jwt',
      description: 'create new investee attachment',
      app: { allowedPermission: { resource: 'investeeAttachments', action: 'create' } },
      pre: [
        // // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: {
        params: {
          userId: Joi.number().required().description('the id of the attachment'),
          companyId: Joi.number().required().description('the id of the attachment')
        },
        payload: {
          file: Joi.any().required().description('file'),
          attachmentTypeId: Joi.string().required().description('file type')
        }
      },
      handler: investeeAttachmentsController.create
    }
  },
  {
    path: '/users/{userId}/investees/{companyId}/attachments/{id}',
    method: 'get',
    options: {
      description: 'get specific investee attachment by its id',
      auth: 'jwt',
      // app: { allowedPermission: { resource: 'investeeAttachments', action: 'findOne' } },
      pre: [
        // // // { method: helperService.authorizeUser },
       // { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: {
        params: {
          userId: Joi.number().required().description('the id of the attachment'),
          companyId: Joi.number().required().description('the id of the attachment'),
          id: Joi.number().required().description('the id of the attachment')
        }
      },
      handler: investeeAttachmentsController.findOne
    }
  },
  {
    path: '/users/{userId}/investees/{companyId}/attachments/{id}',
    method: 'put',
    options: {
      payload: {
        maxBytes: 2097152, // maximum payload size in bytes (2M)
        output: 'stream', // The output controls whether you keep the file in memory, a temporary file or receive the file as a stream
        parse: true, // The parse property determines if the incoming payload gets parsed
        allow: ['multipart/form-data']
      },
      description: 'update specific investee attachment by its id',
      auth: false, //'jwt',
      app: { allowedPermission: { resource: 'investeeAttachments', action: 'update' } },
      pre: [
        // // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: {
        params: {
          userId: Joi.number().required().description('the id of the attachment'),
          companyId: Joi.number().required().description('the id of the attachment'),
          id: Joi.number().required().description('the id of the attachment')
        },
        payload: { file: Joi.any().required().description('file') }
      },
      handler: investeeAttachmentsController.update
    }
  },
  {
    path: '/users/{userId}/investees/{companyId}/attachments/{id}',
    method: 'delete',
    options: {
      description: 'delete specific investee attachment by its id',
      auth: 'jwt',
      app: { allowedPermission: { resource: 'investeeAttachments', action: 'delete' } },
      pre: [
        // // { method: helperService.authorizeUser },
     //   { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: {
        params: {
          userId: Joi.number().required().description('the id of the attachment'),
          companyId: Joi.number().required().description('the id of the attachment'),
          id: Joi.number().required().description('the id of the attachment')
        }
      },
      handler: investeeAttachmentsController.delete
    }
  },
  {
    path: '/users/{userId}/investees/{companyId}/attachments/{id}/download',
    method: 'get',
    options: {
      description: 'download specific investee attachment by its id',
      auth: 'jwt',
      validate: {
        params: {
          userId: Joi.number().required().description('the id of the attachment'),
          companyId: Joi.number().required().description('the id of the attachment'),
          id: Joi.number().required().description('the id of the attachment')
        }
      },
      app: { allowedPermission: { resource: 'investeeAttachments', action: 'download' } },
      pre: [
        // // { method: helperService.authorizeUser },
     //   { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      handler: investeeAttachmentsController.download
    }
  },
  {
    path: '/users/{userId}/investees/{investeeId}/balancestatements',
    method: 'get',
    options: {
      auth: 'jwt',
      description: 'get all investee Company balance statements',
      // app: { allowedPermission: { resource: 'investeeBalances', action: 'findAll' } },
      pre: [
        // // // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: { params: investeeBalance.createSchema.params },
      handler: investeeBalanceController.findAll
    }
  },
  {
    path: '/users/{userId}/investees/{investeeId}/balancestatements',
    method: 'post',
    options: {
      payload: { allow: ['application/json'] },
      auth: false, //'jwt',
      description: 'create new investee balance statement',
      app: { allowedPermission: { resource: 'investeeBalances', action: 'create' } },
      pre: [
        // // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      // validate: investeeBalance.createSchema,
      handler: investeeBalanceController.create
    }
  },
  {
    path: '/users/{userId}/investees/{investeeId}/balancestatements/{id}',
    method: 'get',
    options: {
      description: 'get specific investee balance statement by its id',
      auth: 'jwt',
      // app: { allowedPermission: { resource: 'investeeBalances', action: 'findOne' } },
      pre: [
        // // // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: { params: investeeBalance.updateSchema.params },
      handler: investeeBalanceController.findOne
    }
  },
  {
    path: '/users/{userId}/investees/{investeeId}/balancestatements/{id}',
    method: 'post',
    options: {
      payload: { allow: ['application/json'] },
      description: 'translate specific investee balance statement by its id',
      auth: 'jwt',
      app: { allowedPermission: { resource: 'investeeBalances', action: 'translate' } },
      pre: [
        // // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: investeeBalance.translateSchema,
      handler: investeeBalanceController.translate
    }
  },
  {
    path: '/users/{userId}/investees/{investeeId}/balancestatements/{id}',
    method: 'put',
    options: {
      payload: { allow: ['application/json'] },
      description: 'update specific investee balance statement by its id',
      auth: false, //'jwt',
      app: { allowedPermission: { resource: 'investeeBalances', action: 'update' } },
      pre: [
        // // { method: helperService.authorizeUser },
       // { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      // validate: investeeBalance.updateSchema,
      handler: investeeBalanceController.update
    }
  },
  {
    path: '/users/{userId}/investees/{investeeId}/balancestatements/{id}',
    method: 'delete',
    options: {
      description: 'get specific investee balance statement by its id',
      auth: 'jwt',
      app: { allowedPermission: { resource: 'investeeBalances', action: 'delete' } },
      pre: [
        // // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: { params: investeeBalance.updateSchema.params },
      handler: investeeBalanceController.delete
    }
  },
  {
    path: '/users/{userId}/company/{companyId}/subsidiaries',
    method: 'POST',
    options: {
      auth: false, //'jwt',
      description: 'Create subsidiary Company',
      app: { allowedPermission: { resource: 'companySubsidiaries', action: 'create' } },
      // pre: [
      //   // { method: helperService.authorizeUser }
      // ],
    //  pre: [{ method: helperService.getLanguageId, assign: 'languageId' }],
      validate: subsidiarySchema.createSchema,
      handler: subsidiariesCompanyController.create
    }
  },
  {
    path: '/users/{userId}/company/{companyId}/subsidiaries',
    method: 'GET',
    options: {
      auth: 'jwt',
      description: 'Get all subsidiaries companies for that user',
      // app: { allowedPermission: { resource: 'companySubsidiaries', action: 'findAll' } },
      // pre: [
      // // { method: helperService.authorizeUser }
      // ],
      validate: { params: subsidiarySchema.findAll.params },
      handler: subsidiariesCompanyController.findAll
    }
  },
  {
    path: '/users/{userId}/company/{companyId}/subsidiaries/{id}',
    method: 'GET',
    options: {
      auth: 'jwt',
      description: 'Get specific subsidiary companies for that user by its it',
      // app: { allowedPermission: { resource: 'companySubsidiaries', action: 'findOne' } },
      // pre: [// // { method: helperService.authorizeUser }],
      validate: { params: subsidiarySchema.updateSchema.params },
      handler: subsidiariesCompanyController.findOne
    }
  },
  {
    path: '/users/{userId}/company/{companyId}/subsidiaries/{id}',
    method: 'PUT',
    options: {
      description: 'update specific subsidiary by its id for a specific user id',
      auth: false, //'jwt',
      app: { allowedPermission: { resource: 'companySubsidiaries', action: 'update' } },
      // pre: [
      //   // { method: helperService.authorizeUser }
      // ],
      validate: subsidiarySchema.updateSchema,
      handler: subsidiariesCompanyController.update
    }
  },
  {
    path: '/users/{userId}/company/{companyId}/subsidiaries/{id}',
    method: 'DELETE',
    options: {
      description: 'delete specific subsidiary by its id for a specific user id',
      auth: 'jwt',
      app: { allowedPermission: { resource: 'companySubsidiaries', action: 'delete' } },
      // pre: [
      //   // { method: helperService.authorizeUser }
      // ],
      validate: { params: subsidiarySchema.updateSchema.params },
      handler: subsidiariesCompanyController.delete
    }
  },
  {
    path: '/users/{userId}/investees/{investeeId}/investmentproposals',
    method: 'GET',
    options: {
      auth: 'jwt',
      description: 'Get all investment proposals for investee',
      //
      //  { allowedPermission: { resource: 'investeeInvestmentProposals', action: 'findAll' } },
      pre: [
        // { method: helperService.authorizeUser },
       // { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: { params: investeeInvestmentProposalsSchema.createSchema.params },
      handler: investeeInvestmentProposalsController.findAllForSpecificInvestee
    }
  },
  {
    path: '/users/{userId}/investees/{investeeId}/investmentproposals',
    method: 'POST',
    options: {
      // payload: {
      //   maxBytes: 2097152, // maximum payload size in bytes (2M)
      //   output: 'stream', // The output controls whether you keep the file in memory, a temporary file or receive the file as a stream
      //   parse: true, // The parse property determines if the incoming payload gets parsed
      //   allow: ['multipart/form-data']
      // },
      auth: false, //'jwt',
      description: 'Create investment proposal for investee',
      app: { allowedPermission: { resource: 'investeeInvestmentProposals', action: 'create' } },
      pre: [
        // // // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: investeeInvestmentProposalsSchema.createSchema,
      handler: investeeInvestmentProposalsController.create
    }
  },
  {
    path: '/users/{userId}/investees/{investeeId}/investmentproposals/{id}/translate',
    method: 'POST',
    options: {
      payload: {
        maxBytes: 2097152, // maximum payload size in bytes (2M)
        output: 'stream', // The output controls whether you keep the file in memory, a temporary file or receive the file as a stream
        parse: true, // The parse property determines if the incoming payload gets parsed
        allow: ['multipart/form-data']
      },
      auth: 'jwt',
      description: 'translate investment proposal for investee',
      app: { allowedPermission: { resource: 'investeeInvestmentProposals', action: 'translate' } },
      pre: [
        // // { method: helperService.authorizeUser },
       // { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: investeeInvestmentProposalsSchema.translateSchema,
      handler: investeeInvestmentProposalsController.translate
    }
  },
  {
    path: '/users/{userId}/investees/{investeeId}/investmentproposals/{id}',
    method: 'GET',
    options: {
      auth: 'jwt',
      description: 'Get specific investment proposal for investee by its it',
      // app: { allowedPermission: { resource: 'investeeInvestmentProposals', action: 'findOne' } },
      pre: [
        // // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: { params: investeeInvestmentProposalsSchema.updateSchema.params },
      handler: investeeInvestmentProposalsController.findOne
    }
  },
  {
    path: '/users/{userId}/investees/{investeeId}/investmentproposals/{id}/{transId}',
    method: 'PUT',
    options: {
      // payload: {
      //   maxBytes: 2097152, // maximum payload size in bytes (2M)
      //   output: 'stream', // The output controls whether you keep the file in memory, a temporary file or receive the file as a stream
      //   parse: true, // The parse property determines if the incoming payload gets parsed
      //   allow: ['multipart/form-data']
      // },
      description: 'update specific investment proposal by its id',
      auth: false, //'jwt',
      app: { allowedPermission: { resource: 'investeeInvestmentProposals', action: 'update' } },
      pre: [
        // // { method: helperService.authorizeUser },
       // { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: investeeInvestmentProposalsSchema.updateSchema,
      handler: investeeInvestmentProposalsController.update
    }
  },
  {
    path: '/users/{userId}/investees/{investeeId}/investmentproposals/{id}',
    method: 'DELETE',
    options: {
      description: 'delete specific investment proposal by its id',
      auth: 'jwt',
      app: { allowedPermission: { resource: 'investeeInvestmentProposals', action: 'delete' } },
      pre: [
        // // { method: helperService.authorizeUser },
       // { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: { params: investeeInvestmentProposalsSchema.updateSchema.params },
      handler: investeeInvestmentProposalsController.delete
    }
  },
  {
    path: '/users/{userId}/investees/{investeeId}/incomes',
    method: 'get',
    options: {
      auth: 'jwt',
      description: 'get all investee Company income data',
      // app: { allowedPermission: { resource: 'investeeIncomes', action: 'find' } },
      pre: [
        // // // { method: helperService.authorizeUser },
       // { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: { params: investeeIncome.createSchema.params },
      handler: investeeIncomeController.find
    }
  },
  {
    path: '/users/{userId}/investees/{investeeId}/incomes',
    method: 'post',
    options: {
      payload: { allow: ['application/json'] },
      auth: false, //'jwt',
      description: 'create new investee income',
      app: { allowedPermission: { resource: 'investeeIncomes', action: 'create' } },
      pre: [
        // // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      // validate: investeeIncome.createSchema,
      handler: investeeIncomeController.create
    }
  },
  {
    path: '/users/{userId}/investees/{investeeId}/incomes/{id}',
    method: 'get',
    options: {
      description: 'get specific investee income by its id',
      auth: 'jwt',
      // app: { allowedPermission: { resource: 'investeeIncomes', action: 'findOne' } },
      pre: [
        // // // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: { params: investeeIncome.updateSchema.params },
      handler: investeeIncomeController.findOne
    }
  },
  {
    path: '/users/{userId}/investees/{investeeId}/incomes/{id}',
    method: 'post',
    options: {
      payload: { allow: ['application/json'] },
      auth: 'jwt',
      description: 'create new investee income',
      app: { allowedPermission: { resource: 'investeeIncomes', action: 'translate' } },
      pre: [
        // // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: investeeIncome.translateSchema,
      handler: investeeIncomeController.translate
    }
  },
  {
    path: '/users/{userId}/investees/{investeeId}/incomes/{id}',
    method: 'put',
    options: {
      payload: { allow: ['application/json'] },
      description: 'update specific investee income by its id',
      auth: false, //'jwt',
      app: { allowedPermission: { resource: 'investeeIncomes', action: 'update' } },
      pre: [
        // // { method: helperService.authorizeUser },
       // { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: investeeIncome.updateScehema,
      handler: investeeIncomeController.update
    }
  },
  {
    path: '/users/{userId}/investees/{investeeId}/incomes/{id}',
    method: 'delete',
    options: {
      description: 'get specific investee income by its id',
      auth: 'jwt',
      app: { allowedPermission: { resource: 'investeeIncomes', action: 'delete' } },
      pre: [
        // // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: { params: investeeIncome.updateSchema.params },
      handler: investeeIncomeController.delete
    }
  },
  {
    path: '/users/{userId}/investor',
    method: 'POST',
    options: {
      auth: false,
      description: 'Create investor',
      // app: { allowedPermission: { resource: 'investor', action: 'create' } },
      pre: [
        // // // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      // validate: investor.createSchema,
      handler: investorController.create
    }
  },
  {
    path: '/investor/{id}/img',
    method: 'PUT',
    options: {
      auth: false,
      payload: {
        maxBytes: 2097152, // maximum payload size in bytes (2M)
        output: 'stream', // The output controls whether you keep the file in memory, a temporary file or receive the file as a stream
        parse: true, // The parse property determines if the incoming payload gets parsed
        allow: ['multipart/form-data']
      },
      validate: {
        params: { id: Joi.number().required().description('the id of investor') },
        payload: { img: Joi.any().required().description('Image File') }
      },
      description: 'user Change his current avatar',
      handler: investorController.uploadInvestorImg
    }
  },
  {
    path: '/investor/{id}/img',
    method: 'get',
    options: {
      auth: false,
      description: 'Get current investor img',
      validate: { params: { id: Joi.number().required().description('the id of investor to get its img'), } },
      handler: investorController.getInvestorImg
    }
  },
  {
    path: '/userInvestor/{userId}',
    method: 'get',
    options: {
      auth: false,
      description: 'Get current investor img',
      handler: userInvestorController.getUserInvestors
    }
  },
  {
    path: '/users/{userId}/investor/{id}/translate',
    method: 'POST',
    options: {
      auth: 'jwt',
      description: 'translate investor',
      app: { allowedPermission: { resource: 'investor', action: 'translate' } },
      pre: [
        // // { method: helperService.authorizeUser },
       // { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: investor.translateSchema,
      handler: investorController.translate
    }
  },
  {
    path: '/users/{userId}/investor',
    method: 'GET',
    options: {
      auth: 'jwt',
      description: 'Get all investors for that user',
      // app: { allowedPermission: { resource: 'investor', action: 'findAll' } },
      pre: [
        // // // { method: helperService.authorizeUser },
     //   { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: { params: investor.createSchema.params },
      handler: investorController.findAll
    }
  },
  {
    path: '/deleteInvestor/{investorId}',
    method: 'PUT',
    options: {
      auth: false,
      description: 'Get all investors for that user',
      // app: { allowedPermission: { resource: 'investor', action: 'findAll' } },
      pre: [
        // // // { method: helperService.authorizeUser },
     //   { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      // validate: { params: investor.createSchema.params },
      handler: investorController.deleteInvestor
    }
  },
  {
    path: '/investors',
    method: 'GET',
    options: {
      auth: false,
      description: 'Get all investors for that user',
      // app: { allowedPermission: { resource: 'investor', action: 'findAll' } },
      pre: [
        // // // { method: helperService.authorizeUser },
     //   { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      // validate: { params: investor.createSchema.params },
      handler: investorController.findAllInvestors
    }
  },
  {
    path: '/investor',
    method: 'GET',
    options: {
      auth: 'jwt',
      description: 'Get all investors For Logged In User',
      // app: { allowedPermission: { resource: 'investors', action: 'findAll' } },
      pre: [
        // // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      handler: investorController.findAllForLoggedInUser
    }
  },
  {
    path: '/users/{userId}/investor/{id}',
    method: 'GET',
    options: {
      auth: 'jwt',
      description: 'Get specific investors for that user by its it',
      // app: { allowedPermission: { resource: 'investor', action: 'findOne' } },
      pre: [
        // // // { method: helperService.authorizeUser },
       // { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: { params: investor.updateSchema.params },
      handler: investorController.findOne
    }
  },
  {
    path: '/users/{userId}/investor/{id}',
    method: 'PUT',
    options: {
      description: 'update specific investor by its id for a specific user id',
      app: { allowedPermission: { resource: 'investor', action: 'update' } },
      pre: [
        // { method: helperService.authorizeUser },
        { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      auth: 'jwt',
      validate: investor.updateSchema,
      handler: investorController.update
    }
  },
  {
    path: '/users/{userId}/investor/{id}',
    method: 'DELETE',
    options: {
      description: 'delete specific investor by its id for a specific user id',
      app: { allowedPermission: { resource: 'investor', action: 'delete' } },
      pre: [
        // { method: helperService.authorizeUser },
        { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      auth: 'jwt',
      validate: { params: investor.updateSchema.params },
      handler: investorController.delete
    }
  },
  {
    path: '/users/{userId}/investor/{investorId}/follow/{id}',
    method: 'POST',
    options: {
      auth: 'jwt',
      description: 'Follow investee',
      pre: [{ method: helperService.getLanguageId, assign: 'languageId' }],
      validate: { params: follow.params },
      handler: investorController.follow
    }
  },
  {
    path: '/users/{userId}/investor/{investorId}/unfollow/{id}',
    method: 'POST',
    options: {
      auth: 'jwt',
      description: 'Unfollow investee',
      pre: [{ method: helperService.getLanguageId, assign: 'languageId' }],
      validate: { params: follow.params },
      handler: investorController.unfollow
    }
  },
  {
    path: '/investor/{investorId}/investees/{investeeId}/submitinterest',
    method: 'POST',
    options: {
      auth: false,
      description: 'Create investor interest in investee proposal',
      app: { allowedPermission: { resource: 'investorSubmitInterest', action: 'create' } },
      // pre: [
      //   // { method: helperService.authorizeUser },
      //   { method: helperService.getLanguageId, assign: 'languageId' }
      // ],
      // validate: interestSubmition.createSchema,
      handler: investorInterestsSubmits.create
    }
  },
  {
    path: '/users/{userId}/investor/{investorId}/investees/{investeeId}/proposal/{id}/submitinterest',
    method: 'GET',
    options: {
      auth: 'jwt',
      description: 'Get all interests made by this investor',
      // app: { allowedPermission: { resource: 'investorSubmitInterest', action: 'findAll' } },
      pre: [
        // { method: helperService.authorizeUser },
        { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: { params: interestSubmition.createSchema.params },
      handler: investorInterestsSubmits.findAll
    }
  },
  {
    path: '/users/{userId}/investor/{investorId}/investee/{investeesId}/proposal/{proposalId}/submitinterest/{id}',
    method: 'GET',
    options: {
      auth: 'jwt',
      description: 'Get specific interests made by this investor',
      // app: { allowedPermission: { resource: 'investorSubmitInterest', action: 'findOne' } },
      pre: [
        // // { method: helperService.authorizeUser },
        { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: { params: interestSubmition.updateSchema.params },
      handler: investorInterestsSubmits.findOne
    }
  },
  {
    path: '/users/{userId}/investor/{investorId}/investees/{investeeId}/proposal/{proposalId}/submitinterest/{id}',
    method: 'PUT',
    options: {
      description: 'Update specific investor\'s  interest by its id for a specific investor id',
      app: { allowedPermission: { resource: 'investorSubmitInterest', action: 'update' } },
      pre: [
        // { method: helperService.authorizeUser },
        { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      auth: 'jwt',
      validate: interestSubmition.updateSchema,
      handler: investorInterestsSubmits.update
    }
  },
  {
    path: '/users/{userId}/investor/{investorId}/investees/{investeeId}/proposal/{proposalId}/submitinterest/{id}',
    method: 'DELETE',
    options: {
      description: 'Delete specific investor\'s interest by its id for a specific investor id',
      app: { allowedPermission: { resource: 'investorSubmitInterest', action: 'delete' } },
      pre: [
        // { method: helperService.authorizeUser },
        { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      auth: 'jwt',
      validate: { params: interestSubmition.updateSchema.params },
      handler: investorInterestsSubmits.delete
    }
  },
  {
    path: '/users/{userId}/serviceProvider',
    method: 'POST',
    options: {
      auth: 'jwt',
      description: 'Create serviceProvider Company',
      // app: { allowedPermission: { resource: 'serviceProvider', action: 'create' } },
      pre: [
        // // { method: helperService.authorizeUser },
        { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: serviceProviderSchema.createSchema,
      handler: serviceProviderController.create
    }
  },
  {
    path: '/users/{userId}/serviceProvider/{id}/translate',
    method: 'POST',
    options: {
      auth: 'jwt',
      description: 'translate serviceProvider Company',
      app: { allowedPermission: { resource: 'serviceProvider', action: 'translate' } },
      pre: [
        // { method: helperService.authorizeUser },
        { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: serviceProviderSchema.translateSchema,
      handler: serviceProviderController.translate
    }
  },
  {
    path: '/users/{userId}/serviceProvider',
    method: 'GET',
    options: {
      auth: 'jwt',
      description: 'Get all serviceProvider companies for that user',
      // app: { allowedPermission: { resource: 'serviceProvider', action: 'findAll' } },
      pre: [
        // // { method: helperService.authorizeUser },
        { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: { params: { userId: Joi.string().required().example('16').description('the id of the user') } },
      handler: serviceProviderController.findAll
    }
  },
  {
    path: '/users/{userId}/serviceProvider/{id}',
    method: 'GET',
    options: {
      auth: 'jwt',
      description: 'Get specific serviceProvider companies for that user by its id',
      // app: { allowedPermission: { resource: 'serviceProvider', action: 'findOne' } },
      pre: [
        // // { method: helperService.authorizeUser },
        { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: {
        params: {
          userId: Joi.string().required().example('16').description('the id of the user'),
          id: Joi.string().required().example('16').description('the id of investee company')
        }
      },
      handler: serviceProviderController.findOne
    }
  },
  {
    path: '/users/{userId}/serviceProvider/{id}',
    method: 'PUT',
    options: {
      description: 'update specific serviceProvider by its id for a specific user id',
      auth: 'jwt',
      app: { allowedPermission: { resource: 'serviceProvider', action: 'update' } },
      pre: [
        // { method: helperService.authorizeUser },
        { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: serviceProviderSchema.updateSchema,
      handler: serviceProviderController.update
    }
  },
  {
    path: '/users/{userId}/serviceProvider/{id}',
    method: 'DELETE',
    options: {
      description: 'delete specific serviceProvider by its id for a specific user id',
      auth: 'jwt',
      app: { allowedPermission: { resource: 'serviceProvider', action: 'delete' } },
      pre: [
        // { method: helperService.authorizeUser },
        { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: {
        params: {
          userId: Joi.number().required().description('the id of the user'),
          companyId: Joi.number().required().description('the id of the company')
        }
      },
      handler: serviceProviderController.delete
    }
  },
  {
    path: '/users/{userId}/investee/{id}/request-service',
    method: 'POST',
    options: {
      auth: 'jwt',
      description: 'Create investee request for service from a service provider',
      app: { allowedPermission: { resource: 'investeeRequestService', action: 'create' } },
      pre: [
        // { method: helperService.authorizeUser },
       // { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: serviceRequestSchema.createSchema,
      handler: serviceRequestController.create
    }
  },
  {
    path: '/users/{userId}/investee/{id}/request-service',
    method: 'GET',
    options: {
      auth: 'jwt',
      description: 'Get all service requests made by this investee',
      // app: { allowedPermission: { resource: 'investeeRequestService', action: 'findAll' } },
      // pre: [// { method: helperService.authorizeUser }],
      validate: { params: serviceRequestSchema.createSchema.params },
      handler: serviceRequestController.findAll
    }
  },
  {
    path: '/users/{userId}/investee/{investeeId}/request-service/{id}',
    method: 'GET',
    options: {
      auth: 'jwt',
      description: 'Get specific service request made by this investee',
      // app: { allowedPermission: { resource: 'investeeRequestService', action: 'findOne' } },
      // pre: [// { method: helperService.authorizeUser }],
      validate: { params: serviceRequestSchema.updateSchema.params },
      handler: serviceRequestController.findOne
    }
  },
  {
    path: '/users/{userId}/investee/{investeeId}/request-service/{id}',
    method: 'PUT',
    options: {
      description: 'Update specific service request by its id for a specific investee id',
      auth: 'jwt',
      app: { allowedPermission: { resource: 'investeeRequestService', action: 'update' } },
      // pre: [
      //   // { method: helperService.authorizeUser }
      // ],
      validate: serviceRequestSchema.updateSchema,
      handler: serviceRequestController.update
    }
  },
  {
    path: '/users/{userId}/investee/{investeeId}/request-service/{id}',
    method: 'DELETE',
    options: {
      description: 'Delete specific service request by its id for a specific investor id',
      auth: 'jwt',
      app: { allowedPermission: { resource: 'investeeRequestService', action: 'delete' } },
      // pre: [
      //   // { method: helperService.authorizeUser }
      // ],
      validate: { params: serviceRequestSchema.updateSchema.params },
      handler: serviceRequestController.delete
    }
  },
  {
    path: '/users/{id}/request-service',
    method: 'GET',
    options: {
      auth: 'jwt',
      description: 'Get all service requests made',
      // app: { allowedPermission: { resource: 'investeeRequestService', action: 'findAllServicesRequests' } },
      pre: [
        // // { method: helperService.authorizeUser },
       // { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: { params: { id: Joi.number().positive().min(1).required().example('16').description('the id of the user') } },
      handler: serviceRequestController.findAllServicesRequests
    }
  },
  {
    path: '/users/{id}/subusers',
    method: 'POST',
    options: {
      auth: 'jwt',
      description: 'Create subuser Company',
      app: { allowedPermission: { resource: 'subusers', action: 'create' } },
      // pre: [
      //   // { method: helperService.authorizeUser }
      // ],
      validate: subUserSchema.create,
      plugins: { 'hapi-geo-locate': { enabled: true, fakeIP: '41.46.64.133' } },
      handler: subUserController.create
    }
  },
  {
    path: '/users/{id}/subusers',
    method: 'GET',
    options: {
      auth: 'jwt',
      description: 'Get all subusers for that user',
      app: { allowedPermission: { resource: 'subusers', action: 'findAll' } },
      // pre: [
      //   // { method: helperService.authorizeUser }
      // ],
      validate: { params: { id: Joi.string().required().example('16').description('the id of the user') } },
      handler: subUserController.findAll
    }
  },
  {
    path: '/users/{userId}/subusers/{id}',
    method: 'GET',
    options: {
      auth: 'jwt',
      description: 'Get specific subuser  for that user by its id',
      app: { allowedPermission: { resource: 'subusers', action: 'findOne' } },
      // pre: [
      //   // { method: helperService.authorizeUser }
      // ],
      validate: {
        params: {
          userId: Joi.string().required().example('16').description('the id of the user'),
          id: Joi.string().required().example('16').description('the id of the sub user')
        }
      },
      handler: subUserController.findOne
    }
  },
  {
    path: '/users/{userId}/subusers/{id}',
    method: 'PUT',
    options: {
      description: 'update specific sub user by its id for a specific user id',
      app: { allowedPermission: { resource: 'subusers', action: 'update' } },
      // pre: [
      //   // { method: helperService.authorizeUser }
      // ],
      auth: 'jwt',
      validate: subUserSchema.update,
      handler: subUserController.update
    }
  },
  {
    path: '/users/{userId}/subusers/{id}',
    method: 'DELETE',
    options: {
      description: 'delete specific subuser by its id for a specific user id',
      app: { allowedPermission: { resource: 'subusers', action: 'delete' } },
      // pre: [
      //   // { method: helperService.authorizeUser }
      // ],
      auth: 'jwt',
      validate: {
        params: {
          userId: Joi.number().required().description('the id of the user'),
          id: Joi.number().required().description('the id of the sub user')
        }
      },
      handler: subUserController.delete
    }
  },
  {
    path: '/investmentTypes',
    method: 'POST',
    options: {
      auth: 'jwt',
      description: 'Create new Investment',
      app: { allowedPermission: { resource: 'investmentType', action: 'create' } },
      pre: [
        // // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: investmentTypeSchema.create,
      handler: investmentTypeController.create
    }
  },
  {
    path: '/investmentTypes',
    method: 'GET',
    options: {
      auth: 'jwt',
      description: 'Get all investment types',
      app: { allowedPermission: { resource: 'investmentTypes', action: 'findAll' } },
      pre: [
        // // { method: helperService.authorizeUser },
        { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      handler: investmentTypeController.findAll
    }
  },
  {
    path: '/investmentTypes/{id}',
    method: 'GET',
    options: {
      auth: 'jwt',
      description: 'Get specific investment Type using its id',
      app: { allowedPermission: { resource: 'investmentTypes', action: 'findOne' } },
      pre: [
        // // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: { params: { id: Joi.string().required().example('16').description('the id of the sub user') } },
      handler: investmentTypeController.findOne
    }
  },
  {
    path: '/investmentTypes/{id}',
    method: 'PUT',
    options: {
      description: 'update specific investment Type by its id',
      app: { allowedPermission: { resource: 'investmentTypes', action: 'update' } },
      pre: [
        // // { method: helperService.authorizeUser },
     //   { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      auth: 'jwt',
      validate: investmentTypeSchema.update,
      handler: investmentTypeController.update
    }
  },
  {
    path: '/investmentTypes/{id}',
    method: 'DELETE',
    options: {
      description: 'delete specific investment Types by its id',
      app: { allowedPermission: { resource: 'investmentTypes', action: 'delete' } },
      // pre: [
      //   // { method: helperService.authorizeUser }
      // ],
      auth: 'jwt',
      validate: { params: { id: Joi.number().required().description('the id of the sub user') } },
      handler: investmentTypeController.delete
    }
  },
  {
    path: '/investmentProposals',
    method: 'GET',
    options: {
      auth: 'jwt',
      description: 'Get all investment proposals',
      //
      //  { allowedPermission: { resource: 'investeeInvestmentProposals', action: 'findAll' } },
      pre: [
        // // { method: helperService.authorizeUser },
      //  { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      handler: investeeInvestmentProposalsController.findAll
    }
  },
  {
    path: '/users/mailCheck',
    method: 'get',
    options: {
      description: 'Check If Mail Is Used By another User Or Not',
      auth: false,
      validate: { query: { email: Joi.string().email().required() } },
      handler: userController.checkingMailUniqueness
    }
  },
  {
    path: '/investees/checkRegistrationId',
    method: 'get',
    options: {
      description: 'Check If Mail Is Investee Registration Number Used By Another Investee',
      auth: false,
      validate: { query: { registrationIdNo: Joi.string().required() } },
      handler: investeeController.checkingMailUniqueness
    }
  },
  {
    path: '/users/{userID}/roles',
    method: 'get',
    options: {
      description: 'GET The Role Of User And Its Permissions',
      auth: 'jwt',
      validate: { params: { userID: Joi.number().required() } },
      handler: rolesController.findRolesForLoggedInUser
    }
  },
  {
    path: '/users/{userId}/investors/{investorId}/managements',
    method: 'POST',
    options: {
      auth: 'jwt',
      description: 'Add New Investor Management',
      app: { allowedPermission: { resource: 'investorManagement', action: 'create' } },
      pre: [
        // // // { method: helperService.authorizeUser },
     //   { method: helperService.getLanguageId, assign: 'languageId' }
      ],
      validate: investorManagementSchema.createSchema,
      handler: investorManagementController.create
    }
  },
];
