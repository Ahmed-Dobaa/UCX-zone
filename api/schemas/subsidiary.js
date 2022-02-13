const Joi = require('joi');

const address = Joi.object({
  streetNumber: Joi.string().example('102'),
  streetName: Joi.string().example('Abu El-Ella main road'),
  governorate: Joi.string().example('El-Zamalek'),
  city: Joi.string().example('Cairo'),
  country: Joi.string().example('Egypt')
});

module.exports = {
  findAll: {
    params: {
      userId: Joi.number().positive().required().example('17').description('current user active logged in user id'),
      companyId: Joi.number().positive().required().example('17').description('parent company id')
    }
  },
  createSchema: {
    params: {
      userId: Joi.number().positive().required().example('17').description('current user active logged in user id'),
      companyId: Joi.number().positive().required().example('17').description('parent company id')
    },
    payload: {
      name: Joi.string().required().example('test company'),
      registrationIdNo: Joi.string().required().label('registration id number').example('4235158542531'),
      // registrationOffice: Joi.string().label('registration office').example('Cairo office'),
      sector: Joi.array().required().example('Technology'),
      subSector: Joi.array().required().label('sub sector').example('Mobiles'),
      // companyPurpose: Joi.string().optional().label('company purpose').example('Money Laundry'),
      // products_or_services: Joi.string().label('products or services').example('Mobile Software'),
      legalForm: Joi.string().required().label('legal form').example('Mobile Software'),
      // country: Joi.string().example('Egypt'),
      // city: Joi.string().example('Cairo'),
      main_address: Joi.string().required(), ////address.optional(),
      // other_addresses: Joi.array().items(address).label('other address'),
      phoneNumbers: Joi.string().required().label('phone number').example('01155467899'),
      // relationToCompany: Joi.string().label('relation to company').example('Manager'),
      sharePercentage: Joi.number().required().label('percentage of shares for the parent company in this child company'),
      haveManagementRight: Joi.number().required().label('Management right of shares for the parent company in this child company').example('0')
    }  //.valid('0', '1')
  },
  updateSchema: {
    params: {
      userId: Joi.number().positive().required().example('17').description('current user active logged in user'),
      companyId: Joi.number().positive().required().example('17').description('parent company id'),
      id: Joi.number().positive().required().example('17').description('child company id')
    },
    payload: {
      name: Joi.string().required().example('test company'),
      registrationIdNo: Joi.string().required().label('registration id number').example('4235158542531'),
      // registrationOffice: Joi.string().label('registration office').example('Cairo office'),
      sector: Joi.array().required().example('Technology'),
      subSector: Joi.array().required().label('sub sector').example('Mobiles'),
      // companyPurpose: Joi.string().optional().label('company purpose').example('Money Laundry'),
      // products_or_services: Joi.string().label('products or services').example('Mobile Software'),
      legalForm: Joi.string().required().label('legal form').example('Mobile Software'),
      // country: Joi.string().example('Egypt'),
      // city: Joi.string().example('Cairo'),
      main_address: Joi.string().required(), ////address.optional(),
      // other_addresses: Joi.array().items(address).label('other address'),
      phoneNumbers: Joi.string().required().label('phone number').example('01155467899'),
      // relationToCompany: Joi.string().label('relation to company').example('Manager'),
      sharePercentage: Joi.number().required().label('percentage of shares for the parent company in this child company'),
      haveManagementRight: Joi.number().required().label('Management right of shares for the parent company in this child company').example('0')
    }  //string()
  }
};
