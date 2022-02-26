const Joi = require('joi');

const address = Joi.object({
  streetNumber: Joi.string().example('102'),
  streetName: Joi.string().example('Abu El-Ella main road'),
  governorate: Joi.string().example('El-Zamalek'),
  city: Joi.string().example('Cairo'),
  country: Joi.string().example('Egypt')
});

module.exports = {
  params: {
    userId: Joi.number().required().description('the id of the user'),
    id: Joi.string().required().example('17')
  },
  payload: {
    name: Joi.string().required().example('test company'),
    registration_id_no: Joi.string().required().label('registration id number').example('4235158542531'),
    registration_office: Joi.string().required().label('registration office').example('Cairo office'),
    sector: Joi.string().required().example('Technology'),
    sub_sector: Joi.string().required().label('sub sector').example('Mobiles'),
    company_purpose: Joi.string().required().label('company purpose').example('Money Laundry'),
    products_or_services: Joi.string().required().label('products or services').example('Mobile Software'),
    legal_form: Joi.number().required().label('legal form').example('Mobile Software'),
    address: address,
    other_addresses: Joi.array().items(address).required().label('other address'),
    phone_numbers: Joi.string().required().label('phone number').example('01155467899'),
    relationToCompany: Joi.string().required().label('relation to company').example('Manager'),
    isConfidential: Joi.number().positive().valid(0,1).label('should company name be confidential')
  }
};
