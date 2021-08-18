'use strict';

module.exports = function (sequelize, DataTypes) {
  const roles = sequelize.define('rolesPermissions', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    roleId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    permissionId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, { tableName: 'rolesPermissions' });

  return roles;
};