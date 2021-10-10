/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
  const investeeCompanyCapital = sequelize.define('investeeCapital', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    investeeId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    languageId: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
    },
    capitalCurrencyId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    issuedCapital: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    paidInCapital: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    shareholder_equity: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    share_par_value: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    estimated_company_value: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    share_market_value: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    currentTotalShares: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    bookValue: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    authorizedCapital: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.INTEGER(11),
      allowNull: false
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
  }, { tableName: 'investeeCapital', paranoid: true });

  investeeCompanyCapital.associate = (models) => {
    investeeCompanyCapital.belongsTo(models.investee, { as: 'investee', foreignKey: 'investeeId' });
  };

  return investeeCompanyCapital;
};
