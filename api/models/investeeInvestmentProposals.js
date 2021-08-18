/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const investeeInvestmentProposals = sequelize.define('investeeInvestmentProposals', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    investmentTypeId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    investeeId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    currencyId: {
      type: DataTypes.INTEGER(10).UNSIGNED,
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
  }, { tableName: 'investeeInvestmentProposals', paranoid: true });

  investeeInvestmentProposals.associate = function (models) {

    investeeInvestmentProposals.hasOne(models.investeeInvestmentProposalTranslation, { as: 'investeeInvestmentProposalTranslation', foreignKey: 'investeeInvestmentProposalId' });
    investeeInvestmentProposals.belongsTo(models.investmentTypes, { as: 'investmentProposalType', foreignKey: 'investmentTypeId' });
    investeeInvestmentProposals.belongsTo(models.investee, { as: 'investee', foreignKey: 'investeeId' });
    investeeInvestmentProposals.belongsTo(models.currencies, { as: 'currency', foreignKey: 'currencyId' });
  };

  return investeeInvestmentProposals;
};
