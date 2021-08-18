'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('rolesPermissions',{
    id: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    roleId: {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    permissionId: {
      type: Sequelize.INTEGER(10).UNSIGNED,
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
    }
  },{
    charset: 'utf8',
    collate: 'utf8_general_ci'
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('rolesPermissions')
};
