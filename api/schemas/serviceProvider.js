const Joi = require('joi');

const address = Joi.object({
  streetNumber: Joi.string().label('street number').example('102'),
  streetName: Joi.string().required().label('street name').example('Abu El-Ella main road'),
  governorate: Joi.string().required().example('El-Zamalek'),
  city: Joi.string().required().example('Cairo'),
  country: Joi.string().required().example('Egypt')
}).required();

const addressForUpdate = Joi.object({
  streetNumber: Joi.string().label('street number').example('102'),
  streetName: Joi.string().required().label('street name').example('Abu El-Ella main road'),
  governorate: Joi.string().required().example('El-Zamalek'),
  city: Joi.string().required().example('Cairo'),
  country: Joi.string().required().example('Egypt')
});

module.exports = {
  createSchema: {
    params: { userId: Joi.string().required().example('17') },
    payload: {
      companyBasicData: {
        isConfidential: Joi.boolean().default(false).label('is confidential'),
        companiesBasicDataTranslation: {
          name: Joi.string().required().example('test company'),
          registrationIdNo: Joi.string().required().label('registration id number').example('4235158542531'),
          registrationOffice: Joi.string().required().label('registration office').example('Cairo office'),
          sector: Joi.string().required().example('Technology'),
          subSector: Joi.string().allow(['', null]).required().label('sub sector').example('Mobiles'),
          companyPurpose: Joi.string().required().label('company purpose').example('Money Laundry'),
          productsOrServices: Joi.string().required().label('products or services').example('Mobile Software'),
          legalForm: Joi.string().required().label('legal form').example('Mobile Software'),
          address: address,
          otherAddresses: Joi.array().items(address).min(0).label('other address')
        }
      },
      serviceProvidersTranslation: { phoneNumbers: Joi.string().required().label('phone number').example('01155467899'), },
      // relationToCompany: Joi.string().required().label('relation to company').example('Manager')
    }
  },
  translateSchema: {
    payload: {
      companiesBasicDataTranslation: {
        name: Joi.string().required().example('test company'),
        registrationIdNo: Joi.string().required().label('registration id number').example('4235158542531'),
        registrationOffice: Joi.string().required().label('registration office').example('Cairo office'),
        sector: Joi.string().required().example('Technology'),
        subSector: Joi.string().allow(['', null]).required().label('sub sector').example('Mobiles'),
        companyPurpose: Joi.string().required().label('company purpose').example('Money Laundry'),
        productsOrServices: Joi.string().required().label('products or services').example('Mobile Software'),
        legalForm: Joi.string().required().label('legal form').example('Mobile Software'),
        address: address,
        otherAddresses: Joi.array().items(address).min(0).label('other address')
      },
      serviceProvidersTranslation: { phoneNumbers: Joi.string().required().label('phone number').example('01155467899'), }
    }
  },
  updateSchema: {
    params: {
      userId: Joi.string().required().example('16').description('the id of the user'),
      id: Joi.string().required().example('16').description('the id of service provider company')
    },
    payload: {
      companyBasicData: { isConfidential: Joi.boolean().default(false).label('is confidential') },
      companiesBasicDataTranslation: {
        name: Joi.string().example('test company'),
        registrationIdNo: Joi.string().label('registration id number').example('4235158542531'),
        registrationOffice: Joi.string().label('registration office').example('Cairo office'),
        sector: Joi.string().example('Technology'),
        subSector: Joi.string().allow(['', null]).label('sub sector').example('Mobiles'),
        companyPurpose: Joi.string().label('company purpose').example('Money Laundry'),
        productsOrServices: Joi.string().label('products or services').example('Mobile Software'),
        legalForm: Joi.string().label('legal form').example('Mobile Software'),
        address: addressForUpdate,
        otherAddresses: Joi.array().items(addressForUpdate).min(0).label('other address')
      },
      serviceProvidersTranslation: { phoneNumbers: Joi.string().label('phone number').example('01155467899') },
      // relationToCompany: Joi.string().label('relation to company').example('Manager')
    }
  }

};
