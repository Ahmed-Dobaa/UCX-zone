/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('investeeBalanceTranslation', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    investeeBalanceId: {
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
    fixedAssets: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    currentAssets: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    currentLiabilities: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    longTermLiabilities: {
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
  }, { tableName: 'investeeBalanceTranslation', paranoid: true });
};
