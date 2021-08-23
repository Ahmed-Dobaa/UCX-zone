const Joi = require('joi');

const address = Joi.object({
  // streetNumber: Joi.string().example('102'),
  // streetName: Joi.string().example('Abu El-Ella main road'),
  // governorate: Joi.string().example('El-Zamalek'),
  city: Joi.string().example('Cairo'),
  country: Joi.string().example('Egypt')
});

module.exports = {
  createSchema: {
    params: { userId: Joi.string().required().example('17') },
    payload: {
      isConfidential: Joi.boolean().default(false).label('is confidential'),
      companyBasicData: {
        name: Joi.string().required().example('test company'),
        registrationIdNo: Joi.string().required().label('registration id number').example('4235158542531'),
        registrationOffice: Joi.string().required().label('registration office').example('Cairo office'),
        sector: Joi.string().required().example('Technology'),
        subSector: Joi.string().required().label('sub sector').example('Mobiles'),
        companyPurpose: Joi.string().required().label('company purpose').example('Money Laundry'),
        productsOrServices: Joi.string().required().label('products or services').example('Mobile Software'),
        legalForm: Joi.string().required().label('legal form').example('Mobile Software'),
        address: address,
        otherAddresses: Joi.array().items(address).required().label('other address'),
        phoneNumbers: Joi.string().required().label('phone number').example('01155467899'),
        languageId: Joi.number().required().label('language'),
        yearOfEstablishment: Joi.string(),
        relationToCompany: Joi.string().required().label('relation to company').example('Manager')
      }
    }
  },
  updateSchema: {}

};
