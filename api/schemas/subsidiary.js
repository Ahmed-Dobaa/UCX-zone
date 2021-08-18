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
      registration_id_no: Joi.string().required().label('registration id number').example('4235158542531'),
      registration_office: Joi.string().required().label('registration office').example('Cairo office'),
      sector: Joi.string().required().example('Technology'),
      sub_sector: Joi.string().required().label('sub sector').example('Mobiles'),
      company_purpose: Joi.string().required().label('company purpose').example('Money Laundry'),
      products_or_services: Joi.string().required().label('products or services').example('Mobile Software'),
      legal_form: Joi.string().required().label('legal form').example('Mobile Software'),
      country: Joi.string().required().example('Egypt'),
      city: Joi.string().required().example('Cairo'),
      address: address,
      other_addresses: Joi.array().items(address).required().label('other address'),
      phone_numbers: Joi.string().required().label('phone number').example('01155467899'),
      relationToCompany: Joi.string().required().label('relation to company').example('Manager'),
      sharePercentage: Joi.number().required().label('percentage of shares for the parent company in this child company').example('20'),
      haveManagementRight: Joi.string().valid('0', '1').required().label('percentage of shares for the parent company in this child company').example('0')
    }
  },
  updateSchema: {
    params: {
      userId: Joi.number().positive().required().example('17').description('current user active logged in user'),
      companyId: Joi.number().positive().required().example('17').description('parent company id'),
      id: Joi.number().positive().required().example('17').description('child company id')
    },
    payload: {
      sharePercentage: Joi.number().label('percentage of shares for the parent company in this child company').example('20'),
      haveManagementRight: Joi.string().valid('0', '1').required().label('percentage of shares for the parent company in this child company').example('0')
    }
  }
};
