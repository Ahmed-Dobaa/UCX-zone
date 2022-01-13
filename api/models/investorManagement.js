/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const investorManagement = sequelize.define('investorManagement', {
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
    createdBy: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
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
  }, { tableName: 'investorManagement', paranoid: true });

  investorManagement.associate = (models) => {

    // investorManagement.belongsTo(models.board_of_directors_positions, { as: 'position', foreignKey: 'positionId', targetKey: 'id' });
    investorManagement.belongsTo(models.investor, { as: 'investor', foreignKey: 'investorId', targetKey: 'id' });
    investorManagement.hasOne(models.investorManagementTranslation, { as: 'managementTranslation', foreignKey: 'investorManagementId' });
  };

  return investorManagement;
};
