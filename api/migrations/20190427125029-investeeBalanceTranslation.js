'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('investeeBalanceTranslation', {
    id: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    investeeBalanceId: {
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
    fixedAssets: {
      type: Sequelize.INTEGER(4),
      allowNull: false
    },
    currentAssets: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    currentLiabilities: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    longTermLiabilities: {
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

  down: (queryInterface, Sequelize) => queryInterface.dropTable('investeeBalanceTranslation')
};