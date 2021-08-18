'use strict';

module.exports = function (sequelize, DataTypes) {
  const investeeBalances = sequelize.define('investeeBalances', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    investeeId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    createdBy: {
      type: DataTypes.INTEGER(11),
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
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  }, {
    tableName: 'investeeBalances',
    paranoid: true
  });

  investeeBalances.associate = function (models) {
    investeeBalances.hasOne(models.investeeBalanceTranslation, { as: 'balanceTranslation', foreignKey: 'investeeBalanceId' });

  };

  return investeeBalances;
};
