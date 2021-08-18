'use strict';

module.exports = function (sequelize, DataTypes) {
  const companyTurnoverRanges = sequelize.define('companyTurnoverRanges', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    min: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    max: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      default: sequelize.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  }, { tableName: 'companyTurnoverRanges', paranoid: true });
  companyTurnoverRanges.associate = function (models) {
    companyTurnoverRanges.hasMany(models.investor, { as: 'investor', foreignKey: 'turnoverRangeId', sourceKey: 'id' });
  };
  return companyTurnoverRanges;
};
