/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const investeeManagement = sequelize.define('investeeManagement', {
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
    positionId: {
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
  }, { tableName: 'investeeManagement', paranoid: true });

  investeeManagement.associate = (models) => {

    investeeManagement.belongsTo(models.board_of_directors_positions, { as: 'position', foreignKey: 'positionId', targetKey: 'id' });
    investeeManagement.belongsTo(models.investee, { as: 'investee', foreignKey: 'investeeId', targetKey: 'id' });
    investeeManagement.hasOne(models.investeeManagementTranslation, { as: 'managementTranslation', foreignKey: 'investeeManagementId' });
  };

  return investeeManagement;
};
