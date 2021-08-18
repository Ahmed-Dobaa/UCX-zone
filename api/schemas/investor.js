const Joi = require('joi');

const address = Joi.object({
  streetNumber: Joi.string().allow(null, '').example('102'),
  streetName: Joi.string().allow(null, '').example('Abu El-Ella main road'),
  governorate: Joi.string().allow(null, '').example('El-Zamalek'),
  city: Joi.string().allow(null, '').example('Cairo'),
  country: Joi.string().required().example('Egypt')
});

module.exports = {
  createSchema: {
    params: { userId: Joi.number().positive().required().example('17') },
    payload: {
      type: Joi.string().required().valid(['C', 'I']),
      companyBasicData: Joi.object().keys({
        isConfidential: Joi.boolean().default(false).label('is confidential'),
        companiesBasicDataTranslation: {
          name: Joi.string().required(),
          // registrationIdNo: Joi.string().required().label('registration id number'),
          // registrationOffice: Joi.string().required().label('registration office'),
          // sector: Joi.string().required(),
          // subSector: Joi.string().allow(['', null]).required().label('sub sector'),
          companyPurpose: Joi.string().allow(null, '').label('Description'),
          // productsOrServices: Joi.string().required().label('products or services'),
          // legalForm: Joi.string().required().label('legal form'),
          address: address,
          otherAddresses: Joi.array().items(address).min(0).label('other address'),
          // YearOfEstablishment: Joi.string().required().label('Year Of Establishment'),
        },
      }).when('type', {
        is: 'C',
        then: Joi.required()
      }),
      investor: {
        turnoverRangeId: Joi.number().positive().label('Turnover Range'),
        investorTranslation: Joi.object().keys({
          phoneNumbers: Joi.string().required().label('Phone Number'),
          investmentStrategy: Joi.string().allow(null, '').label('Investment Criteria'),
          // investmentVolume: Joi.number().positive().required().label('investment volume'),
          // investmentTicketSize: Joi.number().positive().required().label('Investment Ticket Size'),
          minTicketSize: Joi.number().positive().description('minimum The Ticket Size'),
          maxTicketSize: Joi.number().positive().description('maximum The Ticket Size'),
          targetedSectorsIds: Joi.array().items(Joi.number().positive()).min(1).unique().required().label('Targeted Sectors'),
          targetedCountriesIds: Joi.array().items(Joi.number().positive()).min(1).unique().required().label('Targeted Countries'),
          // financialInvestment: Joi.string().allow(null, '').optional().label('financial investment'),
          // significantInvestment: Joi.string().allow(null, '').optional().label('significant investment').example('lorum ipsum lorum ipsom'),
          // servicesInvestment: Joi.string().allow(null, '').optional().label('services investment').example('lorum ipsum lorum ipsom')
        }),
        website: Joi.string().uri().allow(['', null]),
        // .or('financialInvestment', 'significantInvestment', 'servicesInvestment').required()
      }
    }
  },
  translateSchema: {
    payload: {
      companiesBasicDataTranslation: Joi.object().keys({
        companyBasicDataId: Joi.number().positive().required().label('company basic data id'),
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
      }).required(),
      investorTranslation: Joi.object().keys({
        phoneNumbers: Joi.string().required().label('phone number').example('01155467899'),
        investmentStrategy: Joi.string().required().label('investment strategy').example('lorum ipsum lorum ipsom'),
        investmentVolume: Joi.number().positive().required().label('investment volume').example(100000),
        investmentTicketSize: Joi.number().positive().required().label('investment ticket size').example(10000),
        targetedSectorsIds: Joi.array().min(1).unique().required().items(Joi.number().positive().example(1)).label('targeted sectors'),
        targetedCountriesIds: Joi.array().min(1).unique().required().items(Joi.number().positive().example(1)).label('targeted countries'),
        financialInvestment: Joi.string().min(1).max(1).valid(['0', '1']).label('financial investment').example('0'),
        significantInvestment: Joi.string().min(20).max(100).label('significant investment').example('lorum ipsum lorum ipsom'),
        servicesInvestment: Joi.string().min(20).max(100).label('services investment').example('lorum ipsum lorum ipsom')
      }).or('financialInvestment', 'significantInvestment', 'servicesInvestment').required()
    }
  },
  updateSchema: {
    params: {
      userId: Joi.number().positive().required().example('16').description('the id of the user'),
      id: Joi.string().required().example('16').description('the id of investee company')
    },
    payload: {
      type: Joi.string().required().valid(['C', 'I']),
      companyBasicData: Joi.object().keys({
        id: Joi.number().example('16').description('id of the company').when('type', {
          is: 'C',
          then: Joi.required()
        }),
        isConfidential: Joi.boolean().default(false).label('should company name be confidential'),
        companiesBasicDataTranslation: {
          name: Joi.string(),
          // registrationIdNo: Joi.string().required().label('registration id number'),
          // registrationOffice: Joi.string().label('registration office'),
          // sector: Joi.string(),
          // subSector: Joi.string().allow(['', null]).label('sub sector'),
          companyPurpose: Joi.string().label('Description'),
          // productsOrServices: Joi.string().label('products or services'),
          // legalForm: Joi.string().label('legal form').example('Mobile Software'),
          address: address,
          otherAddresses: Joi.array().items(address).min(0).label('other address'),
          // YearOfEstablishment: Joi.string().required().label('Year Of Establishment'),
        }
      }).when('type', {
        is: 'C',
        then: Joi.required()
      }),
      investor: {
        // turnoverRangeId: Joi.number().positive().description('the id of company preferred turnover range'),
        investorTranslation: Joi.object().keys({
          phoneNumbers: Joi.string().label('phone number'),
          investmentStrategy: Joi.string().label('investment Criteria'),
          // investmentVolume: Joi.number().positive().label('investment volume'),
          // investmentTicketSize: Joi.number().positive().label('investment ticket size'),
          minTicketSize: Joi.number().positive().description('minimum The Ticket Size'),
          maxTicketSize: Joi.number().positive().description('maximum The Ticket Size'),
          targetedSectorsIds: Joi.array().items(Joi.number().positive()).min(1).unique().label('targeted sectors'),
          targetedCountriesIds: Joi.array().items(Joi.number().positive()).min(1).unique().label('targeted countries'),
          // financialInvestment: Joi.string().allow(null, '').label('financial investment'),
          // significantInvestment: Joi.string().allow(null, '').label('significant investment'),
          // servicesInvestment: Joi.string().allow(null, '').label('services investment')
        })
        // .or('financialInvestment', 'significantInvestment', 'servicesInvestment')
      }
    }
  }
};
