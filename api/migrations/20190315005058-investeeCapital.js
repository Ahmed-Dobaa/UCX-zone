'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('investeeCapital', {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    investeeId: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
    },
    languageId: {
      type: Sequelize.INTEGER(11).UNSIGNED,
      allowNull: false,
    },
    capitalCurrencyId: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
    },
    issuedCapital: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    paidInCapital: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    currentTotalShares: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    bookValue: {
      type: Sequelize.DECIMAL,
      allowNull: false,
    },
    authorizedCapital: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
    createdBy: {
      type: Sequelize.INTEGER(11),
      allowNull: false
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
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('investeeCapital')
};
