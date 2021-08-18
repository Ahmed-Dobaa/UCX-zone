'use strict';

module.exports = function (sequelize, DataTypes) {
  const usersServiceProviders = sequelize.define('usersServiceProviders', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    serviceProviderId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    roleId: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  }, { tableName: 'usersServiceProviders' });

  return usersServiceProviders;
};
