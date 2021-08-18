'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('investeeInvestmentProposals', {
    id: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    investmentTypeId: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    investeeId: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    currencyId: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    createdBy: {
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

  down: (queryInterface, Sequelize) => queryInterface.dropTable('investeeInvestmentProposals')
};
