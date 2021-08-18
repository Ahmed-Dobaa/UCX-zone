/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const investeeInvestmentProposalTranslation = sequelize.define('investeeInvestmentProposalTranslation', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    investeeInvestmentProposalId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    languageId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    minInvestment: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    currentValueOfCompany: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    valueOfTheInvestmentRequired: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    PurposeOfTheRequiredInvestment: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    attachmentPath: {
      type: DataTypes.STRING(255),
      allowNull: true,
      default: null
    },
    validTill: {
      type: DataTypes.DATE,
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
  }, { tableName: 'investeeInvestmentProposalTranslation', paranoid: true });

  investeeInvestmentProposalTranslation.associate = function (models) {
  };

  return investeeInvestmentProposalTranslation;
};
