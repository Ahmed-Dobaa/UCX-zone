const Joi = require('joi');

const address = Joi.object({
  streetNumber: Joi.string().label('street number').example('102'),
  streetName: Joi.string().required().label('street name').example('Abu El-Ella main road'),
  governorate: Joi.string().required().example('El-Zamalek'),
  city: Joi.string().required().example('Cairo'),
  country: Joi.string().required().example('Egypt')
});

module.exports = {
  createSchema: {
    params: { userId: Joi.number().required().example('17') },
    payload: {
      companyBasicData: {
        isConfidential: Joi.boolean().default(false).label('is confidential'),
        sector: Joi.string().required(),
        subSector: Joi.string().allow(null).label('sub sector'),
        legalForm: Joi.string().label('legal form'),
        companiesBasicDataTranslation: {
          name: Joi.string().required().example('test company'),
          registrationIdNo: Joi.string().allow(null, '').label('registration id number').example('4235158542531'),
          registrationOffice: Joi.string().allow(null, '').label('registration office').example('Cairo office'),
          companyPurpose: Joi.string().label('company purpose').example('Money Laundry'),
          productsOrServices: Joi.string().allow(null, '').label('products or services').example('Mobile Software'),
          address: Joi.object({
            streetNumber: Joi.string().allow(null, '').label('street number').example('102'),
            streetName: Joi.string().allow(null, '').label('street name').example('Abu El-Ella main road'),
            governorate: Joi.string().allow(null, '').example('El-Zamalek'),
            city: Joi.string().allow(null, '').example('Cairo'),
            country: Joi.string().required().example('Egypt')
          }).required(),
          otherAddresses: Joi.string().optional().label('other address'), // .array()
          YearOfEstablishment: Joi.string().allow(null, '').label('Year Of Establishment'),
        }
      },
      investeeTranslation: { phoneNumbers: Joi.string().allow(null, '').label('phone number').example('01155467899'), },
      avatar: Joi.any().allow(['', null]),
      website: Joi.string().allow(['', null]), // .uri()
      // relationToCompany: Joi.string().required().label('relation to company').example('Manager')
    }
  },
  translateSchema: {
    payload: {
      companiesBasicDataTranslation: {
        name: Joi.string().required().example('test company'),
        registrationIdNo: Joi.string().required().label('registration id number').example('4235158542531'),
        registrationOffice: Joi.string().required().label('registration office').example('Cairo office'),
        companyPurpose: Joi.string().required().label('company purpose').example('Money Laundry'),
        productsOrServices: Joi.string().required().label('products or services').example('Mobile Software'),
        address: Joi.object({
          streetNumber: Joi.string().label('street number').example('102'),
          streetName: Joi.string().required().label('street name').example('Abu El-Ella main road'),
          governorate: Joi.string().required().example('El-Zamalek'),
          city: Joi.string().required().example('Cairo'),
          country: Joi.string().required().example('Egypt')
        }).required(),
        otherAddresses: Joi.array().items(address).min(0).label('other address'),
        YearOfEstablishment: Joi.string().required().label('Year Of Establishment'),
      },
      investeeTranslation: { phoneNumbers: Joi.string().required().label('phone number').example('01155467899'), }
    }
  },
  updateSchema: {
    params: {
      userId: Joi.number().required().example('16').description('the id of the user'),
      id: Joi.number().required().example('16').description('the id of investee company')
    },
    payload: {
      companyBasicData: {
        isConfidential: Joi.boolean().default(false).label('is confidential'),
        sector: Joi.string(),
        subSector: Joi.string().allow(null).label('sub sector'),
        legalForm: Joi.string().label('legal form'),
        companiesBasicDataTranslation: {
          name: Joi.string().example('test company'),
          // registrationIdNo: Joi.string().label('registration id number').example('4235158542531'),
          // registrationOffice: Joi.string().label('registration office').example('Cairo office'),
          companyPurpose: Joi.string().label('company purpose').example('Money Laundry'),
          productsOrServices: Joi.string().label('products or services').example('Mobile Software'),
          address: Joi.object({
            streetNumber: Joi.string().label('street number').example('102'),
            streetName: Joi.string().label('street name').example('Abu El-Ella main road'),
            governorate: Joi.string().example('El-Zamalek'),
            city: Joi.string().example('Cairo'),
            country: Joi.string().example('Egypt')
          }).required(),
          // otherAddresses: Joi.array().items(address).min(0).label('other address'),
          YearOfEstablishment: Joi.string().label('Year Of Establishment'),
          // relationToCompany: Joi.string().required().label('relation to company').example('Manager')
        }
      },
      investeeTranslation: { phoneNumbers: Joi.string().label('phone number').example('01155467899') },
      avatar: Joi.any().allow(['', null]),
      website: Joi.string().allow(['', null]), //.uri()
    }
  },
};
