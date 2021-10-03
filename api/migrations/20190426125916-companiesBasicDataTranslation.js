'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('companiesBasicDataTranslation', {
      id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      companyBasicDataId: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false
      },
      languageId: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      registrationIdNo: {
        type: Sequelize.STRING(45),
        allowNull: true
      },
      registrationOffice: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      phoneNumbers: {
        type: Sequelize.STRING(12),
        allowNull: false
      },
      main_address: {
        type: Sequelize.STRING(1000),
        allowNull: false
      },
      companyPurpose: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      productsOrServices: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      // address: {
      //   type: Sequelize.STRING(1000), //JSON,
      //   allowNull: false
      // },
      country: {
        type: Sequelize.STRING(1000), //JSON,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING(1000), //JSON,
        allowNull: false
      },
      otherAddresses: {
        type: Sequelize.STRING(1000), //JSON,
        allowNull: true,
        default: '[]'
      },
      YearOfEstablishment: {
        type: Sequelize.STRING(45),
        allowNull: true
      },
      relationToCompany: {
        type: Sequelize.STRING(45),
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci'
    });

  },


  down: (queryInterface, Sequelize) => queryInterface.dropTable('companiesBasicDataTranslation')
};

