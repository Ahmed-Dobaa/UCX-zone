'use strict';

module.exports = function (sequelize, DataTypes) {
  const investeeIncomes = sequelize.define('investeeIncomes', {
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
    tableName: 'investeeIncomes',
    paranoid: true
  });

  investeeIncomes.associate = function (models) {
    investeeIncomes.hasOne(models.investeeIncomeTranslation, {
      as: 'incomeTranslation',
      foreignKey: 'investeeIncomeId'
    });

  };

  return investeeIncomes;
};
