/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const investeeAuditor = sequelize.define('investeeAuditor', {
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
  }, { tableName: 'investeeAuditor', paranoid: true });

  investeeAuditor.associate = function (models) {
    investeeAuditor.hasOne(models.investeeAuditorTranslation, { as: 'auditorTranslation', foreignKey: 'investeeAuditorId' });

  };

  return investeeAuditor;
};
