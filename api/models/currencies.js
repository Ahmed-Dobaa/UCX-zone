'use strict';

module.exports = function (sequelize, DataTypes) {
  const currencies = sequelize.define('currencies', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false ,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  }, { tableName: 'currencies' });

  return currencies;
};
