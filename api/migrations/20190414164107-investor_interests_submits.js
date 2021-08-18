'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('investor_interests_submits',{
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
    investeeId: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    proposalId: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    minTicketSize: {
      type: Sequelize.DECIMAL,
      allowNull: true
    },
    maxTicketSize: {
      type: Sequelize.DECIMAL,
      allowNull: true
    },
    servicesValue: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    significantValue: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    clarifications: {
      type: Sequelize.TEXT,
      allowNull: true
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

  down: (queryInterface, Sequelize) => queryInterface.dropTable('investor_interests_submits')
};
