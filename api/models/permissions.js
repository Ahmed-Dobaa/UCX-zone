/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const permission = sequelize.define('permissions', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    resource: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    action: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    allowedAttributes: {
      type: DataTypes.JSON,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
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
  }, { tableName: 'permissions', paranoid: true });

  permission.associate = function (models) {
    permission.belongsToMany(models.roles, { as: 'roles', through: 'rolesPermissions', foreignKey: 'roleId', otherKey: 'permissionId' });
  };

  return permission;
};
