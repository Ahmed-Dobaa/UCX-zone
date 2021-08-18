/* jshint indent: 2 */

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
      allowNull: false
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
      allowNull: false
    },
    depreciation: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    otherExpenses: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    otherRevenues: {
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
  }, { tableName: 'investeeIncomeTranslation', paranoid: true });

  return investeeIncomeTranslation;
};
