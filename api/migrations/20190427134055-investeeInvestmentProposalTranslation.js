'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('investeeInvestmentProposalTranslation', {
    id: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    investeeInvestmentProposalId: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    languageId: {
      type: Sequelize.INTEGER(11).UNSIGNED,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    minInvestment: {
      type: Sequelize.DECIMAL,
      allowNull: false
    },
    currentValueOfCompany: {
      type: Sequelize.DECIMAL,
      allowNull: false
    },
    valueOfTheInvestmentRequired: {
      type: Sequelize.DECIMAL,
      allowNull: false
    },
    PurposeOfTheRequiredInvestment: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    attachmentPath: {
      type: Sequelize.STRING(255),
      allowNull: true,
      default: null
    },
    validTill: {
      type: Sequelize.DATE,
      allowNull: false
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
  },{
    charset: 'utf8',
    collate: 'utf8_general_ci'
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('investeeInvestmentProposalTranslation')
};
