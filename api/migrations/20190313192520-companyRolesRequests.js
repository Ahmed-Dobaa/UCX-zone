'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('request_Role_company', {
    id: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    companyId: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    requestedRole: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    approved: {
      type: Sequelize.ENUM('0','1'),
      allowNull: true,
      defaultValue: '0'
    },
    approvedBy: {
      type: Sequelize.INTEGER(11),
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

  down: (queryInterface, Sequelize) => queryInterface.dropTable('request_Role_company')
};
