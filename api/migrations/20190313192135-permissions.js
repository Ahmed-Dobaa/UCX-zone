'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('permissions', {
    id: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    resource: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    action: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    allowedAttributes: {
      type: Sequelize.STRING(1000), // JSON,
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

  down: (queryInterface, Sequelize) => queryInterface.dropTable('permissions')
};
