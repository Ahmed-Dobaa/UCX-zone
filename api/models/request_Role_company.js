/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const requestRoleCompany = sequelize.define('request_Role_company', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    companyId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    requestedRole: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    approved: {
      type: DataTypes.ENUM('0','1'),
      allowNull: true,
      defaultValue: '0'
    },
    approvedBy: {
      type: DataTypes.INTEGER(11),
      allowNull: true
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
  }, { tableName: 'request_Role_company', paranoid: true });

  requestRoleCompany.associate = function (models) {
    requestRoleCompany.belongsTo(models.users, { foreignKey: 'userId', targetKey: 'id', as: 'user' });
  };

  return requestRoleCompany;
};
