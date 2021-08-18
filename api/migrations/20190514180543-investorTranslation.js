'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('investorTranslation', {
      id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      investorId: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      languageId: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
      },
      phoneNumbers: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      investmentStrategy: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      investmentVolume: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      minTicketSize: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      maxTicketSize: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      financialInvestment: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      significantInvestment: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      servicesInvestment: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      }
    },{
      charset: 'utf8',
      collate: 'utf8_general_ci'
    });

    return queryInterface.addConstraint('investorTranslation', ['investorId', 'languageId'], {
      type: 'unique',
      name: 'investorIdWithLanguageId'
    });
  },

  down: (queryInterface, Sequelize) => queryInterface.dropTable('investorTranslation')
};
