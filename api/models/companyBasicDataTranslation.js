/* jshint indent: 2 */
const isEmpty = require('lodash/isEmpty');
module.exports = function (sequelize, DataTypes) {
  const companiesBasicDataTranslation = sequelize.define('companiesBasicDataTranslation', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    companyBasicDataId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
    },
    languageId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    name_ar: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    registrationIdNo: {
      type: DataTypes.STRING(45),
      unique: true,
      allowNull: true
    },
    registrationOffice: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    companyPurpose: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    companyPurpose_ar: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    productsOrServices: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    productsOrServices_ar: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    // address: {
    //   type: DataTypes.JSON,
    //   allowNull: false
    // },

    country: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    country_ar: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    phoneNumbers: {
      type: DataTypes.STRING(12),
      allowNull: false
    },
    main_address: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    main_address_ar: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    city_ar: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    img: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    website: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    otherAddresses: {
      type: DataTypes.JSON,
      allowNull: true,
      default: '[]'
    },
    YearOfEstablishment: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    relationToCompany: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    relationToCompany_ar: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  }, { tableName: 'companiesBasicDataTranslation', paranoid: true });

  companiesBasicDataTranslation.addHook('afterFind', (companyData, options) => {
    if(!isEmpty(companyData)) {
      if(companyData.isConfidential) {
        companyData.name = 'confidential';
      }
    }
  });

  return companiesBasicDataTranslation;
};
