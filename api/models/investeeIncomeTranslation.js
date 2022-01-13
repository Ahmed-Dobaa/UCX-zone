/* jshint indent: 2 */

const { truncate } = require('lodash');

module.exports = function (sequelize, DataTypes) {
  const investeeIncomeTranslation = sequelize.define('investeeIncomeTranslation', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    investeeIncomeId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    languageId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
    },
    grossProfit: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
    },
    netProfit: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
    },
    netProfitAfterTax: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
    },
    operatingProfit: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    Sales: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    COGS: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    GeneralAndAdministrativeExpense: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    SellingExpense: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    Interest: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    Tax: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    depreciation: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    otherExpenses: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    otherRevenues: {
      type: DataTypes.INTEGER(11),
      allowNull: true
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
  }, { tableName: 'investeeIncomeTranslation', paranoid: true });

  return investeeIncomeTranslation;
};
