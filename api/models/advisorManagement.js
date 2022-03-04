/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const advisorManagement = sequelize.define('advisorManagement', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    advisorId: {
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
  }, { tableName: 'advisorManagement', paranoid: true });

  advisorManagement.associate = (models) => {

  advisorManagement.hasOne(models.advisorManagementTranslation, { as: 'managementTranslation', foreignKey: 'advisorManagementId' });
};
  return advisorManagement;
};
