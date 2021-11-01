/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const investorTranslation = sequelize.define('investorTranslation', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    investorId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    institutional_investor_type:{
      type: DataTypes.STRING(100),
      allowNull: true
    },
    institutional_investor_type_ar:{
      type: DataTypes.STRING(100),
      allowNull: true
    },
    languageId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
    },
    phoneNumbers: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    investmentStrategy: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    investmentVolume: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    minTicketSize: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    maxTicketSize: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    financialInvestment: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    significantInvestment: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    servicesInvestment: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  }, { tableName: 'investorTranslation', paranoid: true });

  return investorTranslation;
};
