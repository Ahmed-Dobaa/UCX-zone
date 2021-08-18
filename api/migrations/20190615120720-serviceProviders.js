'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('serviceProviders', {
    id: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    companyId: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      unique: true
    },
    createdBy: {
      type: Sequelize.INTEGER(11),
      allowNull: false
    },
    verifiedAt: {
      type: Sequelize.DATE,
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
  },{
    charset: 'utf8',
    collate: 'utf8_general_ci'
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('serviceProviders')
};
