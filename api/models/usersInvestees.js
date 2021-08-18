'use strict';

module.exports = function (sequelize, DataTypes) {
  const usersInvestees = sequelize.define('usersInvestees', {
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
    investeeId: {
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
  }, { tableName: 'usersInvestees' });

  return usersInvestees;
};
