'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('investeeIncomeTranslation', {
    id: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    investeeIncomeId: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    languageId: {
      type: Sequelize.INTEGER(11).UNSIGNED,
      allowNull: false,
    },
    year: {
      type: Sequelize.INTEGER(4),
      allowNull: false
    },
    Sales: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    COGS: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    GeneralAndAdministrativeExpense: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    SellingExpense: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    Interest: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    Tax: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    depreciation: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    otherExpenses: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    otherRevenues: {
      type: Sequelize.INTEGER(11),
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

  down: (queryInterface, Sequelize) => queryInterface.dropTable('investeeIncomeTranslation')
};
